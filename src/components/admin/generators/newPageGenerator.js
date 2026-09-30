/**
 * @description Turns a kebab-case slug (a project's `fileName`) into the PascalCase
 * component name every migrated page's wrapper file uses, e.g. "lorne-park-interior" ->
 * "LorneParkInterior".
 */
export const toComponentName = (slug) => slug
  .split('-')
  .filter(Boolean)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');

/**
 * @description Generates the full text of a brand-new portfolio detail page's fixed
 * wrapper file — the same shape every migrated page already uses (see
 * static/layouts/<slug>.js architecture notes in the project plan), so a new page never
 * needs any hand-written JSX beyond this one-time scaffold.
 *
 * @param {Object} param
 * @param {string} param.slug - matches the project's fileName and the layout data file's name
 */
export const generateNewPageFile = ({ slug }) => {
  const componentName = toComponentName(slug);
  return `import React from 'react';

import layoutData from '../../../../static/layouts/${slug}';
import DetailPageLayout from '../../../components/detailPageLayout';

const ${componentName} = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default ${componentName};
`;
};
