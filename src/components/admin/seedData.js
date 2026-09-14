import constants from '../../../static/app-constants';

const clone = (value) => JSON.parse(JSON.stringify(value));

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
  aboutContent: null,
  reviews: null,
  layouts: {}
};
