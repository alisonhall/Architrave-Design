import { pageConfigsFor } from './seedData';
import { countTilePlacements, removeTileKeyFromLayoutData } from './layoutHelpers';

/**
 * @description The three project types the site groups portfolio projects into, and
 * which draft sections (see seedData.js) hold their "shown" order and "unused" list.
 * `value` matches the slug stored on each project's `type` field (static/app-constants.js
 * projectTypes).
 */
export const PROJECT_TYPES = [
  { value: 'new-homes', label: 'New Homes', orderKey: 'newProjectsOrder', unusedKey: 'unusedNewProjects' },
  {
    value: 'renovations-additions',
    label: 'Renovations & Additions',
    orderKey: 'renovationProjectsOrder',
    unusedKey: 'unusedRenovationProjects'
  },
  { value: 'upcoming', label: 'Upcoming', orderKey: 'upcomingProjectsOrder', unusedKey: 'unusedUpcomingProjects' }
];

export const getProjectTypeConfig = (typeValue) =>
  PROJECT_TYPES.find((projectType) => projectType.value === typeValue);

/**
 * @description Turns free text into a kebab-case slug, e.g. for a project's fileName.
 */
export const slugify = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * @description Turns free text into a camelCase identifier, e.g. for a project's key.
 */
export const camelCase = (text) => {
  const words = text
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return '';

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
};

/**
 * @description Builds a project key from its name that doesn't collide with any
 * existing key, appending a numeric suffix (2, 3, …) if needed.
 *
 * @param {string} projectName
 * @param {Object} existingProjects
 */
export const makeUniqueProjectKey = (projectName, existingProjects) => {
  const base = camelCase(projectName) || 'newProject';
  if (!existingProjects[base]) return base;

  let suffix = 2;
  while (existingProjects[`${base}${suffix}`]) suffix += 1;
  return `${base}${suffix}`;
};

// Tile kinds that point at a project by `projectKey`.
const PROJECT_TILE_KINDS = ['project', 'filler'];

// The committed files behind a detail page: its layout data, its fixed wrapper page,
// and that page's test and snapshot.
const detailPageFiles = (config, folder) => {
  const slug = config.dataFilePath.replace(/^static\/layouts\//, '').replace(/\.js$/, '');
  return [
    config.dataFilePath,
    `src/pages/portfolio/${folder}/${slug}.jsx`,
    `src/pages/portfolio/${folder}/__tests__/${slug}.test.jsx`,
    `src/pages/portfolio/${folder}/__tests__/__snapshots__/${slug}.test.jsx.snap`
  ];
};

/**
 * @description Everything deleting a project has to change so nothing is left pointing
 * at it — the live site renders a tile whose project is gone as nothing at all, and a
 * detail page whose project is gone fails the build:
 *
 * - it's removed from `projects` and from its type's shown/hidden lists;
 * - every project/filler tile pointing at it, on every page, is removed along with each
 *   spot it's placed in;
 * - its own detail page is dropped: one created this session simply disappears; an
 *   already-committed one is recorded in `deletedPages`, so Review Changes lists its
 *   files for deletion in GitHub.
 *
 * @param {Object} draft - the whole admin draft
 * @param {string} projectKey
 * @returns {{ updates: Object, affectedPages: Array, removedPages: Array }} `updates` is
 * ready for useDraftUpdate; the other two describe the change for the confirmation
 */
export const planProjectDeletion = (draft, projectKey) => {
  const project = draft.projects[projectKey];
  const typeConfig = getProjectTypeConfig(project.type);
  const pageConfigs = pageConfigsFor(draft.newLayoutPages, draft.deletedPages);

  const projects = { ...draft.projects };
  delete projects[projectKey];
  const layouts = { ...draft.layouts };
  const newLayoutPages = { ...draft.newLayoutPages };
  const deletedPages = { ...draft.deletedPages };
  const affectedPages = [];
  const removedPages = [];

  Object.entries(pageConfigs).forEach(([pageKey, config]) => {
    const layout = draft.layouts[pageKey];
    if (!layout) return;

    if (config.projectKey === projectKey) {
      delete layouts[pageKey];
      if (config.isNew) delete newLayoutPages[pageKey];
      else deletedPages[pageKey] = { label: config.label, files: detailPageFiles(config, project.type) };
      removedPages.push({ key: pageKey, label: config.label, isNew: Boolean(config.isNew) });
      return;
    }

    const tileKeys = Object.keys(layout.tiles).filter((key) => (
      PROJECT_TILE_KINDS.includes(layout.tiles[key].kind) && layout.tiles[key].projectKey === projectKey
    ));
    if (tileKeys.length === 0) return;

    let next = { ...layout, tiles: { ...layout.tiles } };
    let placements = 0;
    tileKeys.forEach((tileKey) => {
      placements += countTilePlacements(next, tileKey);
      delete next.tiles[tileKey];
      next = { ...next, ...removeTileKeyFromLayoutData(next, tileKey) };
    });
    layouts[pageKey] = next;
    affectedPages.push({ key: pageKey, label: config.label, tiles: tileKeys.length, placements });
  });

  const updates = { projects, layouts, newLayoutPages, deletedPages };
  if (typeConfig) {
    updates[typeConfig.orderKey] = draft[typeConfig.orderKey].filter((key) => key !== projectKey);
    updates[typeConfig.unusedKey] = draft[typeConfig.unusedKey].filter((key) => key !== projectKey);
  }
  return { updates, affectedPages, removedPages };
};

/**
 * @description The confirmation shown before deleting a project, spelling out what
 * else goes with it (see planProjectDeletion).
 */
export const deleteProjectConfirmMessage = (projectName, { affectedPages, removedPages }) => {
  const lines = [`Delete "${projectName}"?`];
  if (affectedPages.length > 0 || removedPages.length > 0) {
    lines.push('', 'This will also:');
    affectedPages.forEach(({ label, placements }) => {
      lines.push(`• remove its tile from ${label}${placements === 1 ? ' (1 spot)' : ` (${placements} spots)`}`);
    });
    removedPages.forEach(({ label, isNew }) => {
      lines.push(isNew
        ? `• discard its new page, ${label}`
        : `• remove its page, ${label} — Review Changes will list that page's files to delete in GitHub`);
    });
  }
  return lines.join('\n');
};
