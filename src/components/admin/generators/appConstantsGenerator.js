const INDENT = '    ';
const indent = (level) => INDENT.repeat(level);

// Matches the file's existing convention: single quotes, except for strings that
// themselves contain an apostrophe (e.g. "Hogg's Hollow Traditional").
const quote = (value) => (value.includes("'") ? `"${value}"` : `'${value}'`);

const PROJECT_FIELDS = [
  'key',
  'fileName',
  'type',
  'projectName',
  'projectDescription',
  'completion',
  'mainImageUrl',
  'beforeImageUrl'
];

const generateFlatObject = (name, obj, level = 0) => {
  const entries = Object.keys(obj).map((field) => `${indent(level + 1)}${field}: ${quote(obj[field])}`);
  return `${indent(level)}${name}: {\n${entries.join(',\n')}\n${indent(level)}}`;
};

const generateTopLevelConst = (name, obj) => {
  const entries = Object.keys(obj).map((field) => `${indent(1)}${field}: ${quote(obj[field])}`);
  return `const ${name} = {\n${entries.join(',\n')}\n}`;
};

const generateProjectBlock = (project, level) =>
  PROJECT_FIELDS.filter((field) => project[field] !== undefined && project[field] !== '')
    .map((field) => `${indent(level)}${field}: ${quote(String(project[field]))}`)
    .join(',\n');

const generateProjectsObject = (projects) => {
  const keys = Object.keys(projects);
  const entries = keys.map(
    (key) => `${indent(1)}${key}: {\n${generateProjectBlock(projects[key], 2)}\n${indent(1)}}`
  );
  return `const projects = {\n${entries.join(',\n')}\n}`;
};

const generateKeyList = (name, keys, level = 1) => {
  if (keys.length === 0) return `${indent(level)}${name}: []`;
  const body = keys.map((key) => `${indent(level + 1)}projects.${key}.key`).join(',\n');
  return `${indent(level)}${name}: [\n${body}\n${indent(level)}]`;
};

const PROJECTS_JSDOC = `/**
 * Options for project constants
 *
 * @param {Object} projectKeyName
 * @param {string} projectKeyName.key - the projectKeyName
 * @param {string} projectKeyName.fileName - the filename of the page
 * @param {string} projectKeyName.type - the type of project it is (one of the options from the projectTypes constant object)
 * @param {string} projectKeyName.projectName - the title related to the project; used as text within the site
 * @param {string} projectKeyName.projectDescription - the description of the project; used on the project details page
 * @param {string} projectKeyName.completion - the future completion date, if applicable
 * @param {string} projectKeyName.mainImageUrl - the name of the main thumbnail image of the project within Cloudinary
 * @param {string} projectKeyName.beforeImageUrl - the name of the 'before' image of the project within Cloudinary
 */`;

/**
 * @description Generates the full text of static/app-constants.js from the admin
 * draft's projects data. Pure function of its input — the same draft always produces
 * the same file text, and this is the single source of truth the live preview and the
 * output panel both build on.
 *
 * @param {Object} draft
 */
export const generateAppConstants = (draft) => {
  const {
    projects,
    newProjectsOrder,
    renovationProjectsOrder,
    upcomingProjectsOrder,
    unusedNewProjects,
    unusedRenovationProjects,
    unusedUpcomingProjects,
    projectTypes,
    cloudinary,
    houzz,
    defaultIntroductionText
  } = draft;

  return `${generateTopLevelConst('projectTypes', projectTypes)}

${PROJECTS_JSDOC}

${generateProjectsObject(projects)}

const constants = {
${indent(1)}portfolio: 'portfolio',
${indent(1)}projectTypes,
${indent(1)}projects,
${generateKeyList('newProjectsOrder', newProjectsOrder)},
${generateKeyList('renovationProjectsOrder', renovationProjectsOrder)},
${generateKeyList('upcomingProjectsOrder', upcomingProjectsOrder)},
${generateKeyList('unusedNewProjects', unusedNewProjects)},
${generateKeyList('unusedRenovationProjects', unusedRenovationProjects)},
${generateKeyList('unusedUpcomingProjects', unusedUpcomingProjects)},
${generateFlatObject('cloudinary', cloudinary, 1)},
${indent(1)}defaultIntroductionText: ${quote(defaultIntroductionText)},
${generateFlatObject('houzz', houzz, 1)}
}

export default constants;
`;
};
