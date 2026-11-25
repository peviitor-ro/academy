import { getCollection, type CollectionEntry } from 'astro:content';

export type Tutorial = CollectionEntry<'tutorials'>;
export type Lang = 'ro' | 'en';

/** Limba se deduce din primul folder al id-ului: `ro/serie/01-lectie`. */
export function getTutorialLang(entry: Tutorial): Lang {
  return entry.id.split('/')[0] as Lang;
}

/** Slug-ul din URL, fara prefixul de limba: `serie/01-lectie`. */
export function getTutorialSlug(entry: Tutorial): string {
  return entry.id.split('/').slice(1).join('/');
}

/** Toate tutorialele dintr-o limba, ordonate dupa serie si ordinea lectiei. Schitele apar doar in dev. */
export async function getTutorials(lang: Lang): Promise<Tutorial[]> {
  const all = await getCollection('tutorials', ({ data }) => import.meta.env.DEV || !data.draft);
  return all
    .filter((entry) => getTutorialLang(entry) === lang)
    .sort(
      (a, b) =>
        a.data.series.localeCompare(b.data.series, lang) || a.data.order - b.data.order,
    );
}

/** Slug-ul seriei = numele folderului: `ro/<serie>/01-lectie`. */
export function getSeriesSlug(entry: Tutorial): string {
  return entry.id.split('/')[1];
}

export interface Series {
  slug: string;
  name: string;
  lessons: Tutorial[];
  project?: Tutorial;
}

/** Grupeaza tutorialele pe serii. Lectia cu `isProject` ajunge in `project`, nu in `lessons`. */
export function getSeries(all: Tutorial[]): Series[] {
  const map = new Map<string, Series>();
  for (const entry of all) {
    const slug = getSeriesSlug(entry);
    const series = map.get(slug) ?? { slug, name: entry.data.series, lessons: [] };
    if (entry.data.isProject) series.project = entry;
    else series.lessons.push(entry);
    map.set(slug, series);
  }
  for (const series of map.values()) {
    series.lessons.sort((a, b) => a.data.order - b.data.order);
  }
  return [...map.values()];
}

/** Lectiile din aceeasi serie si vecinii lectiei curente. */
export function getSeriesNav(entry: Tutorial, all: Tutorial[]) {
  const lessons = all
    .filter((other) => other.data.series === entry.data.series)
    .sort((a, b) => a.data.order - b.data.order);
  const index = lessons.findIndex((lesson) => lesson.id === entry.id);
  return {
    lessons,
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}

/** Extrage ID-ul unui video YouTube din link-uri watch, youtu.be, embed sau shorts. */
export function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    let id: string | null = null;
    if (host === 'youtu.be') {
      id = parsed.pathname.slice(1);
    } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/watch') {
        id = parsed.searchParams.get('v');
      } else {
        const match = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
        id = match ? match[1] : null;
      }
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
