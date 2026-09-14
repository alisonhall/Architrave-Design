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
