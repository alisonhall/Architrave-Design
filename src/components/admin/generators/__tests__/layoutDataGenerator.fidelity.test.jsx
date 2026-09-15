import fs from 'fs';
import path from 'path';

import { hydrateLayoutData } from '../../layoutHelpers';
import { generateLayoutData } from '../layoutGenerator';
import indexData from '../../../../../static/layouts/index';
import creditRiverManorData from '../../../../../static/layouts/credit-river-manor';

// For each page migrated to the data-driven form, proves that hydrating its
// static/layouts/<slug>.js data for editing and then generating it back produces text
// that, once required as a real module, deep-equals the original committed data
// exactly. This is the ongoing correctness guarantee for the data-driven pages,
// replacing the old JSX-fidelity test (which is no longer needed for these pages,
// since there is no more JSX being generated for them).
const CASES = [
  { name: 'index.js', data: indexData, slug: '__generatedIndexDataFidelity' },
  { name: 'credit-river-manor.js', data: creditRiverManorData, slug: '__generatedCreditRiverManorDataFidelity' }
];

describe('generateLayoutData fidelity against committed static/layouts files', () => {
  const paths = CASES.map(({ slug }) => path.join(__dirname, `../../../../../static/layouts/${slug}.js`));

  afterAll(() => {
    paths.forEach((p) => { if (fs.existsSync(p)) fs.unlinkSync(p); });
  });

  CASES.forEach(({ name, data, slug }, index) => {
    it(`round-trips static/layouts/${name} exactly`, () => {
      const text = generateLayoutData(hydrateLayoutData(data));
      fs.writeFileSync(paths[index], text);

      // eslint-disable-next-line global-require, import/no-dynamic-require
      const regenerated = require(`../../../../../static/layouts/${slug}`).default;
      expect(regenerated).toEqual(data);
    });
  });
});
