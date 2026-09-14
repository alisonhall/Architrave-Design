import constants from '../../../static/app-constants';
import { newHomesLayout, newHomesPageConfig } from './seedLayouts/newHomes';
import { indexPageLayout, indexPageConfig } from './seedLayouts/indexPage';
import { renovationsAdditionsLayout, renovationsAdditionsPageConfig } from './seedLayouts/renovationsAdditions';
import { creditRiverManorLayout, creditRiverManorPageConfig } from './seedLayouts/creditRiverManor';

const clone = (value) => JSON.parse(JSON.stringify(value));

// Bump this whenever seedDraft's shape changes (a section added/removed/restructured).
// draftContext.js refuses to restore a persisted draft stashed under an older version,
// so returning users don't get a shallow merge of new seed sections with a stale
// top-level value from before that section existed (e.g. an old empty `layouts: {}`
// silently winning over a newly-seeded `layouts.newHomes`).
export const SEED_VERSION = 4;

/**
 * @description The admin draft's starting state. `projects` and the ordering/unused
 * arrays already live as plain data in static/app-constants.js, so they're cloned
 * directly rather than transcribed. `aboutContent`, `reviews`, and the page `layouts`
 * are currently hardcoded JSX on their respective pages — those get filled in with a
 * hand-transcribed snapshot of the live markup as their editor phases land.
 */
export const seedDraft = {
  projects: clone(constants.projects),
  newProjectsOrder: clone(constants.newProjectsOrder),
  renovationProjectsOrder: clone(constants.renovationProjectsOrder),
  upcomingProjectsOrder: clone(constants.upcomingProjectsOrder),
  unusedNewProjects: clone(constants.unusedNewProjects),
  unusedRenovationProjects: clone(constants.unusedRenovationProjects),
  unusedUpcomingProjects: clone(constants.unusedUpcomingProjects),
  defaultIntroductionText: constants.defaultIntroductionText,
  // Not edited through the admin UI, but needed to regenerate a complete
  // static/app-constants.js file.
  projectTypes: clone(constants.projectTypes),
  cloudinary: clone(constants.cloudinary),
  houzz: clone(constants.houzz),
  aboutContent: null,
  reviews: null,
  layouts: {
    index: clone(indexPageLayout),
    newHomes: clone(newHomesLayout),
    renovationsAdditions: clone(renovationsAdditionsLayout),
    creditRiverManor: clone(creditRiverManorLayout)
  }
};

// Static, non-content configuration (import paths, class names) each supported page's
// layout generator needs — not part of the editable draft.
//
// upcoming.jsx is deliberately not here: unlike the other listing pages, it isn't a
// hand-tuned Row/Column/Item tree at all — it's already fully generated from
// upcomingProjectsOrder (a plain map over that array), so it's already covered by the
// Projects section's ordering controls and doesn't need a layout editor of its own.
//
// creditRiverManor is the first of the ~16 project detail pages to get this treatment
// (type: 'detail' — a single tree bound to one project, rather than a listing page's
// paired default/wide trees over many). The rest follow the same pattern.
export const LAYOUT_PAGE_CONFIGS = {
  index: indexPageConfig,
  newHomes: newHomesPageConfig,
  renovationsAdditions: renovationsAdditionsPageConfig,
  creditRiverManor: creditRiverManorPageConfig
};
