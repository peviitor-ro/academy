# Academia peViitor

Tutoriale gratuite de programare, video și text, scrise de voluntari. Fără conturi, fără backend: site static Astro, în română (implicit) și engleză.

Live (preview): https://thetatu13.github.io/TechAcademy/

## Rulează local

Ai nevoie de Node 22 (`nvm use`) și Git.

```bash
npm ci
npm run dev       # http://localhost:4321
```

Căutarea (Pagefind) apare doar după build:

```bash
npm run build && npm run preview
```

## Comenzi

| Comandă | Ce face |
| --- | --- |
| `npm run dev` | Server de dezvoltare |
| `npm run check` | Verificare de tipuri (`astro check`) |
| `npm run build` | Build static + index de căutare |
| `npm run preview` | Servește build-ul local |

## Structura

- `src/content/tutorials/ro|en/<serie>/NN-lectie.md`: lecțiile (Markdown + frontmatter)
- `src/pages`: paginile (RO în rădăcină, EN sub `en/`)
- `src/components`: componente; `src/components/ui`: butoane, carduri, stiluri comune
- `src/i18n`: texte RO/EN și helpere de rute
- `src/data/mentors.ts`: lista de mentori (doar cu acordul persoanelor)
- `src/lib/links.ts`: linkuri externe folosite în mai multe pagini

## Cum adaugi o lecție

1. Creează `src/content/tutorials/ro/<serie>/NN-titlu.md`.
2. Completează frontmatter-ul (domeniu, nivel, serie, ordine, durată, video opțional); schema din `src/content.config.ts` îți arată erorile.
3. Rulează `npm run check` și `npm run build`, apoi deschide un pull request.

Detalii în [CONTRIBUTING.md](CONTRIBUTING.md).
