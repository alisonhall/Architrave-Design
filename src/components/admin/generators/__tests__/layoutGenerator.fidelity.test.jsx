import fs from 'fs';
import path from 'path';
import React from 'react';
import { render } from '@testing-library/react';

import { seedDraft, LAYOUT_PAGE_CONFIGS } from '../../seedData';
import { generateLayoutPage } from '../layoutGenerator';
import RealIndexPage from '../../../../pages/index';
import RealNewHomes from '../../../../pages/portfolio/new-homes';
import RealRenovationsAdditions from '../../../../pages/portfolio/renovations-additions';

// For each supported page, writes the generated text next to the real one so Jest's
// normal jsx transform picks it up, then requires and renders it — proving the
// generator's output isn't just "valid JSX" but renders byte-for-byte the same DOM as
// the hand-written page it was transcribed from.
const CASES = [
  {
    name: 'index.jsx',
    layoutKey: 'index',
    generatedPath: path.join(__dirname, '../../../../pages/__generatedIndexForTest.jsx'),
    requirePath: '../../../../pages/__generatedIndexForTest',
    RealComponent: RealIndexPage,
    pathname: '/'
  },
  {
    name: 'new-homes.jsx',
    layoutKey: 'newHomes',
    generatedPath: path.join(__dirname, '../../../../pages/portfolio/__generatedNewHomesForTest.jsx'),
    requirePath: '../../../../pages/portfolio/__generatedNewHomesForTest',
    RealComponent: RealNewHomes,
    pathname: '/portfolio/new-homes/'
  },
  {
    name: 'renovations-additions.jsx',
    layoutKey: 'renovationsAdditions',
    generatedPath: path.join(__dirname, '../../../../pages/portfolio/__generatedRenovationsAdditionsForTest.jsx'),
    requirePath: '../../../../pages/portfolio/__generatedRenovationsAdditionsForTest',
    RealComponent: RealRenovationsAdditions,
    pathname: '/portfolio/renovations-additions/'
  }
];

describe('generateLayoutPage fidelity', () => {
  afterAll(() => {
    CASES.forEach(({ generatedPath }) => {
      if (fs.existsSync(generatedPath)) fs.unlinkSync(generatedPath);
    });
  });

  CASES.forEach(({ name, layoutKey, generatedPath, requirePath, RealComponent, pathname }) => {
    it(`renders identically to the real ${name} for its transcribed seed layout`, () => {
      const text = generateLayoutPage(LAYOUT_PAGE_CONFIGS[layoutKey], seedDraft.layouts[layoutKey]);
      fs.writeFileSync(generatedPath, text);

      // eslint-disable-next-line global-require, import/no-dynamic-require
      const GeneratedComponent = require(requirePath).default;

      const location = { pathname };
      const real = render(<RealComponent location={location} />);
      const generated = render(<GeneratedComponent location={location} />);

      expect(generated.container.innerHTML).toBe(real.container.innerHTML);
    });
  });
});
