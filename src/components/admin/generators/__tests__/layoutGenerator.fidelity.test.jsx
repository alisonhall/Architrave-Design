import fs from 'fs';
import path from 'path';
import React from 'react';
import { render } from '@testing-library/react';

import { seedDraft, LAYOUT_PAGE_CONFIGS } from '../../seedData';
import { generateLayoutPage } from '../layoutGenerator';
import RealNewHomes from '../../../../pages/portfolio/new-homes';

// Writes the generated page next to the real one so Jest's normal jsx transform picks
// it up, then requires and renders it — proving the generator's output isn't just
// "valid JSX" but renders byte-for-byte the same DOM as the hand-written page it was
// transcribed from.
const GENERATED_PATH = path.join(__dirname, '../../../../pages/portfolio/__generatedNewHomesForTest.jsx');

describe('generateLayoutPage fidelity (new-homes.jsx)', () => {
  afterAll(() => {
    if (fs.existsSync(GENERATED_PATH)) fs.unlinkSync(GENERATED_PATH);
  });

  it('renders identically to the real new-homes.jsx for the transcribed seed layout', () => {
    const text = generateLayoutPage(LAYOUT_PAGE_CONFIGS.newHomes, seedDraft.layouts.newHomes);
    fs.writeFileSync(GENERATED_PATH, text);

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const GeneratedNewHomes = require('../../../../pages/portfolio/__generatedNewHomesForTest').default;

    const location = { pathname: '/portfolio/new-homes/' };
    const real = render(<RealNewHomes location={location} />);
    const generated = render(<GeneratedNewHomes location={location} />);

    expect(generated.container.innerHTML).toBe(real.container.innerHTML);
  });
});
