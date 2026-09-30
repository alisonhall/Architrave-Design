/**
 * @description Generates a brand-new portfolio detail page's test file, matching the
 * snapshot-test pattern every migrated page already has (see
 * src/pages/portfolio/**\/__tests__/*.test.jsx) — `npm test -- -u` fills in the actual
 * snapshot the first time it runs against the new page.
 *
 * @param {Object} param
 * @param {string} param.slug - matches the project's fileName and the new page file's name
 * @param {string} param.folder - 'new-homes' or 'renovations-additions'
 */
export const generateTestScaffold = ({ slug, folder }) => `import React from 'react';
import { render } from '@testing-library/react';

import Page from '../${slug}';

describe('${slug} page', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Page location={{ pathname: '/portfolio/${folder}/${slug}/' }} />);

    expect(container).toMatchSnapshot();
  });
});
`;
