# Architrave Design

The portfolio site for Architrave Design, Architect — a residential architecture firm in the Toronto area. Built with [Gatsby](https://www.gatsbyjs.com/) (React + static site generation), with project imagery served from Cloudinary.

## Requirements

- Node `>=18` and npm `>=9` (see `.nvmrc` / `package.json#engines`). If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the repo root.

## Getting started

```sh
npm install
npm run develop
```

The site runs at `http://localhost:8000` (Gatsby's GraphQL explorer is at `http://localhost:8000/___graphql`).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run develop` (alias `npm start`) | Runs the site locally with hot reload. |
| `npm run build` | Builds the static site into `public/`. |
| `npm run serve` | Serves a production build locally (used by the e2e tests, on port 9000). |
| `npm test` | Runs the Jest unit/snapshot test suite. |
| `npm run test:watch` | Runs Jest in watch mode. |
| `npm run test:e2e` | Runs the Playwright end-to-end suite against a production build (builds and serves the site automatically). |
| `npm run format` | Formats `src/**/*.{js,jsx}` with Prettier. |

## Project structure

```text
src/
  components/     Shared React components (layout, nav, header/footer, the tile/layout
                   system, seo, admin/ tooling)
  pages/          One file per route (Gatsby's filesystem-based routing) — see below
  scss/           Global styles and page-specific partials
  images/         Local images (most project photography instead lives on Cloudinary)
static/
  app-constants.js  The site's content data: every project, and which ones appear
                     (and in what order) on each portfolio listing page
  helpers.js        Shared helpers for building a project's tile from app-constants data
e2e/              Playwright end-to-end specs, run against a real production build
```

### Pages

- `src/pages/index.jsx`, `about.jsx`, `reviews.jsx`, `contact.jsx`, `sitemap.jsx`, `404.jsx` — top-level pages.
- `src/pages/portfolio/{new-homes,renovations-additions,upcoming}.jsx` — portfolio listing pages, each with two hand-tuned layout sections (`defaultLayout` and `wideLayout`, for narrow vs. wide screens).
- `src/pages/portfolio/{new-homes,renovations-additions}/*.jsx` — one detail page per project.

### The layout system

Pages are composed from three components in `src/components/`:

- `rowHOC.jsx` — a horizontal band (`height` or `imageHeight` in px).
- `columnHOC.jsx` — a column inside a row (`width` as a percentage).
- `item.jsx` — a tile inside a column: a project image+link, a plain image, a filler image, or a text blurb, depending on which props it's given.

Each page hand-assembles a tree of these to match the design — there's no CMS or drag-and-drop layout tool driving this (see **Admin tool** below for an in-progress exception).

### Content data

`static/app-constants.js` holds every project (`projects`), plus which project keys appear on each portfolio listing page and in what order (`newProjectsOrder`, `renovationProjectsOrder`, `upcomingProjectsOrder`), and which ones are defined but not currently shown (`unusedNewProjects`, etc.). Adding a project here doesn't create its detail page — that's a separate `.jsx` file under `src/pages/portfolio/<type>/`.

## Testing

- **Unit/snapshot tests** (Jest + React Testing Library): `npm test`. Snapshots live alongside each test in `__snapshots__/`; update them with `npm test -- -u` after an intentional markup change, and review the diff before committing.
- **End-to-end tests** (Playwright): `npm run test:e2e`. This builds the site and serves it on `http://localhost:9000`, then drives it in a real browser — use it to catch things a component-level snapshot can't, like navigation and cross-page links.

## Admin tool

`/admin` is an in-progress, password-gated content editor built directly into the site (see `src/components/admin/`). It's meant to let content changes (projects, layouts, page copy) be drafted visually in the browser and turned into ready-to-paste file text for GitHub's web UI, without needing a local dev setup — nothing it does writes to the filesystem, and its draft state lives only in `sessionStorage` for that browser session. The password check is a client-side deterrent only (the site has no backend), not real access control. It's not linked from the public site navigation.

## Deployment

`npm run build` produces a static site in `public/`; there's no deploy configuration checked into this repo, so hosting/CI is managed outside of it.

## License

MIT — see [LICENSE](LICENSE).
