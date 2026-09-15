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
  components/     Shared React components: layout/nav/header/footer, seo, the Row/
                   Column/Item tile system, the shared page-layout renderers
                   (listingPageLayout.jsx, detailPageLayout.jsx, aboutPageLayout.jsx,
                   reviewsPageLayout.jsx, layoutTreeRenderer.jsx), and admin/ tooling
  pages/          One file per route (Gatsby's filesystem-based routing) — see below
  scss/           Global styles and page-specific partials
  images/         Local images (most project photography instead lives on Cloudinary)
static/
  app-constants.js  The site's project data: every project, which ones appear (and in
                     what order) on each portfolio listing page, plus Cloudinary/Houzz
                     config
  about.js          The About page's content (intro/bio/approach text)
  reviews.js        The Reviews page's content (the review list)
  layouts/          One file per portfolio page, holding its Row/Column/tile tree(s) —
                     see "The layout system" below
  helpers.js        Shared helpers for building a project's tile from app-constants data
e2e/              Playwright end-to-end specs, run against a real production build
```

### Pages

- `src/pages/index.jsx`, `about.jsx`, `reviews.jsx`, `contact.jsx`, `sitemap.jsx`, `404.jsx` — top-level pages.
- `src/pages/portfolio/{new-homes,renovations-additions}.jsx` — portfolio listing pages.
- `src/pages/portfolio/upcoming.jsx` — the upcoming-projects listing; generated directly from `upcomingProjectsOrder` rather than a hand-tuned layout, so it has no entry under `static/layouts/`.
- `src/pages/portfolio/{new-homes,renovations-additions}/*.jsx` — one detail page per project.

Every page above except `upcoming.jsx` is a fixed, one-line wrapper — e.g.:

```jsx
import layoutData from '../../../../static/layouts/lorne-park-interior';
import DetailPageLayout from '../../../components/detailPageLayout';

const LorneParkInterior = (props) => <DetailPageLayout {...layoutData} location={props.location} />;
```

Its actual layout lives entirely in the matching `static/layouts/<slug>.js` file, so once a page's wrapper exists, that wrapper file itself never needs to change again — every future edit happens in its data file instead (by hand, or via the Admin tool — see below).

### The layout system

Each portfolio page's layout is plain data (a page's `static/layouts/<slug>.js`) describing a tree of rows, columns, and tiles, resolved at render time by `src/components/layoutTreeRenderer.jsx` using three lower-level components:

- `rowHOC.jsx` — a horizontal band (`height` or `imageHeight` in px).
- `columnHOC.jsx` — a column inside a row (`width` as a percentage).
- `item.jsx` — a tile inside a column: a project image+link, a plain image, a filler image, a text blurb, or a raw embed (an iframe's HTML pasted verbatim), depending on which props it's given.

A listing page (`index`/`new-homes`/`renovations-additions`) has two trees, `defaultLayout` and `wideLayout` (narrow vs. wide screens); a detail page has either that same two-tree shape or a single `layout` tree — read from the data itself, not fixed by page type. `layoutTreeRenderer.jsx`'s `renderLayoutTree` is the single rendering implementation shared by the real pages (via `listingPageLayout.jsx`/`detailPageLayout.jsx`) and the Admin tool's live preview, so the two can never drift apart.

### Content data

- `static/app-constants.js` holds every project (`projects`), which project keys appear on each portfolio listing page and in what order (`newProjectsOrder`, `renovationProjectsOrder`, `upcomingProjectsOrder`), and which ones are defined but not currently shown (`unusedNewProjects`, etc.).
- `static/layouts/<slug>.js` holds one portfolio page's layout (see above).
- `static/about.js` / `static/reviews.js` hold the About and Reviews pages' text content.

All of the above are plain data files with no JSX in them — editing one and redeploying is the entire update, whether done by hand or through the Admin tool.

## Testing

- **Unit/component tests** (Jest + React Testing Library): `npm test`. Full-page renders use `toMatchSnapshot()` (snapshots live alongside each test in `__snapshots__/`; update with `npm test -- -u` after an intentional markup change, and review the diff before committing); everything else (generators, editors, interactive components) asserts on specific behavior/output.
- **End-to-end tests** (Playwright, `e2e/`): `npm run test:e2e`. This builds the site and serves it on `http://localhost:9000`, then drives it in a real browser.
  - `e2e/site.spec.js` — the public site: navigation, portfolio listing/detail pages, sitemap, 404.
  - `e2e/admin.spec.js` — the Admin tool: the passphrase gate, and each editor's end-to-end flows (see below).

## Admin tool

`/admin` is a password-gated content editor built directly into the site (`src/components/admin/`). It lets every piece of editable content — projects, portfolio page layouts, and the About/Reviews page text — be drafted visually in the browser, live-previewed with the site's own rendering components, and turned into ready-to-paste file text for GitHub's web UI. Nothing it does writes to the filesystem; its draft state lives only in `sessionStorage` for that browser session, and it's not linked from the public site navigation. The password check is a client-side deterrent only (the site has no backend), not real access control — see the comment in `passwordGate.jsx` for how to change the default passphrase before deploying.

Because every page's content already lives in a plain `static/*.js` data file (see above), the Admin tool and the real site always read the exact same source — there's nothing to hand-transcribe into or out of the tool, and an edit made directly on GitHub shows up in the Admin tool on its next load, with no separate sync step.

Sections, each in `src/components/admin/`:

- **Projects** (`projectsEditor.jsx`) — add/edit/delete/reorder/hide projects and each portfolio section's shared introduction text.
- **Layouts** (`layoutsEditor.jsx`) — manage a page's tile library (add/edit/delete/rename — renaming a tile updates every placement referencing it across the page's layout tree(s)) and edit its row/column tree(s) with a live preview; also where a brand-new portfolio page gets created (a project with no page yet can be started from a blank layout, generating its data file, its fixed wrapper page file, and a test scaffold).
- **About** (`aboutEditor.jsx`) — edit the About page's three text sections.
- **Reviews** (`reviewsEditor.jsx`) — add/edit/delete/reorder the review list.
- **Review Changes** (`outputSection.jsx`/`outputPanel.jsx`) — every changed file's full text, ready to copy into GitHub.

## Deployment

`npm run build` produces a static site in `public/`; there's no deploy configuration checked into this repo, so hosting/CI is managed outside of it.

## License

MIT — see [LICENSE](LICENSE).
