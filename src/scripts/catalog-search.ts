/**
 * Cautare full-text cu Pagefind. Indexul se genereaza la `npm run build`
 * (`pagefind --site dist`), deci in `astro dev` cautarea ramane ascunsa.
 */
interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: { title?: string };
}
interface PagefindApi {
  init?(): Promise<void>;
  search(query: string): Promise<{
    results: Array<{ data(): Promise<PagefindResultData> }>;
  }>;
}

const wrapper = document.getElementById('catalog-search');
const input = document.getElementById('search-input') as HTMLInputElement | null;
const browse = document.getElementById('catalog-browse');
const resultsBox = document.getElementById('search-results');
const summary = document.getElementById('search-summary');
const list = document.getElementById('search-list');

async function loadPagefind(): Promise<PagefindApi | null> {
  try {
    const path = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/pagefind/pagefind.js`;
    return (await import(/* @vite-ignore */ path)) as PagefindApi;
  } catch {
    return null;
  }
}

// Citit inainte de orice `await`: scriptul filtrelor curata query-ul din URL la incarcare.
const initialQuery = new URLSearchParams(location.search).get('q')?.trim() ?? '';

async function init() {
  if (!wrapper || !input || !browse || !resultsBox || !summary || !list) return;
  const pagefind = await loadPagefind();
  if (!pagefind) return;

  wrapper.hidden = false;
  // Incarca indexul din timp, ca prima cautare sa nu astepte descarcarea lui.
  void pagefind.init?.();
  let timer: number | undefined;
  let latest = 0;

  const run = async () => {
    const query = input.value.trim();
    const requestId = ++latest;

    if (!query) {
      resultsBox.hidden = true;
      browse.hidden = false;
      return;
    }

    const search = await pagefind.search(query);
    const items = await Promise.all(search.results.slice(0, 10).map((result) => result.data()));
    // Ignoram raspunsurile vechi, daca utilizatorul a tastat intre timp.
    if (requestId !== latest) return;

    browse.hidden = true;
    resultsBox.hidden = false;
    list.replaceChildren();

    summary.textContent =
      items.length === 0
        ? `${input.dataset.labelNone ?? ''} „${query}”`
        : `${search.results.length} ${(search.results.length === 1 ? input.dataset.labelResult : input.dataset.labelResults) ?? ''} „${query}”`;

    for (const item of items) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.className =
        'block rounded-xl border border-beige-700 bg-beige-300 p-4 hover:border-green-500 dark:border-dark-400 dark:bg-dark-600 dark:hover:border-pastel-blue-500';

      const title = document.createElement('strong');
      title.className = 'block text-lg';
      title.textContent = item.meta.title ?? item.url;

      // Pagefind genereaza excerptul din continutul nostru si marcheaza potrivirile cu <mark>.
      const excerpt = document.createElement('p');
      excerpt.className = 'mt-1 text-sm';
      excerpt.innerHTML = item.excerpt;

      link.append(title, excerpt);
      li.append(link);
      list.append(li);
    }
  };

  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 60);
  });

  // Cautarea din pagina de start trimite termenul in `?q=`.
  if (initialQuery) {
    input.value = initialQuery;
    run();
  }
}

init();
