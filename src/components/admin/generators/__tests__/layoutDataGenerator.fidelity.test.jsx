import fs from 'fs';
import path from 'path';

import { hydrateLayoutData } from '../../layoutHelpers';
import { generateLayoutData } from '../layoutGenerator';
import indexData from '../../../../../static/layouts/index';
import newHomesData from '../../../../../static/layouts/new-homes';
import renovationsAdditionsData from '../../../../../static/layouts/renovations-additions';
import creditRiverManorData from '../../../../../static/layouts/credit-river-manor';
import hoggsHollowFrenchCountryData from '../../../../../static/layouts/hoggs-hollow-french-country';
import hoggsHollowFrenchData from '../../../../../static/layouts/hoggs-hollow-french';
import hoggsHollowTraditionalData from '../../../../../static/layouts/hoggs-hollow-traditional';
import kingswayGeorgianData from '../../../../../static/layouts/kingsway-georgian';
import kingswayTransitionalData from '../../../../../static/layouts/kingsway-transitional';
import oakvilleExecutiveHomeData from '../../../../../static/layouts/oakville-executive-home';
import traditionalKingswayParkData from '../../../../../static/layouts/traditional-kingsway-park';
import etobicokeArtsAndCraftsData from '../../../../../static/layouts/etobicoke-arts-and-crafts';
import lorneParkInteriorData from '../../../../../static/layouts/lorne-park-interior';
import lyttonParkManorData from '../../../../../static/layouts/lytton-park-manor';
import princessMargaretModernData from '../../../../../static/layouts/princess-margaret-modern';
import rosedaleEdwardianData from '../../../../../static/layouts/rosedale-edwardian';
import royalYorkFaceliftData from '../../../../../static/layouts/royal-york-facelift';
import upperCanadaFarmhouseData from '../../../../../static/layouts/upper-canada-farmhouse';

// For each page migrated to the data-driven form, proves that hydrating its
// static/layouts/<slug>.js data for editing and then generating it back produces text
// that, once required as a real module, deep-equals the original committed data
// exactly. This is the ongoing correctness guarantee for the data-driven pages,
// replacing the old JSX-fidelity test (which is no longer needed for these pages,
// since there is no more JSX being generated for them).
const CASES = [
  { name: 'index.js', data: indexData, slug: '__generatedIndexDataFidelity' },
  { name: 'new-homes.js', data: newHomesData, slug: '__generatedNewHomesDataFidelity' },
  { name: 'renovations-additions.js', data: renovationsAdditionsData, slug: '__generatedRenovationsAdditionsDataFidelity' },
  { name: 'credit-river-manor.js', data: creditRiverManorData, slug: '__generatedCreditRiverManorDataFidelity' },
  {
    name: 'hoggs-hollow-french-country.js',
    data: hoggsHollowFrenchCountryData,
    slug: '__generatedHoggsHollowFrenchCountryDataFidelity'
  },
  { name: 'hoggs-hollow-french.js', data: hoggsHollowFrenchData, slug: '__generatedHoggsHollowFrenchDataFidelity' },
  {
    name: 'hoggs-hollow-traditional.js',
    data: hoggsHollowTraditionalData,
    slug: '__generatedHoggsHollowTraditionalDataFidelity'
  },
  { name: 'kingsway-georgian.js', data: kingswayGeorgianData, slug: '__generatedKingswayGeorgianDataFidelity' },
  { name: 'kingsway-transitional.js', data: kingswayTransitionalData, slug: '__generatedKingswayTransitionalDataFidelity' },
  { name: 'oakville-executive-home.js', data: oakvilleExecutiveHomeData, slug: '__generatedOakvilleExecutiveHomeDataFidelity' },
  {
    name: 'traditional-kingsway-park.js',
    data: traditionalKingswayParkData,
    slug: '__generatedTraditionalKingswayParkDataFidelity'
  },
  {
    name: 'etobicoke-arts-and-crafts.js',
    data: etobicokeArtsAndCraftsData,
    slug: '__generatedEtobicokeArtsAndCraftsDataFidelity'
  },
  { name: 'lorne-park-interior.js', data: lorneParkInteriorData, slug: '__generatedLorneParkInteriorDataFidelity' },
  { name: 'lytton-park-manor.js', data: lyttonParkManorData, slug: '__generatedLyttonParkManorDataFidelity' },
  { name: 'princess-margaret-modern.js', data: princessMargaretModernData, slug: '__generatedPrincessMargaretModernDataFidelity' },
  { name: 'rosedale-edwardian.js', data: rosedaleEdwardianData, slug: '__generatedRosedaleEdwardianDataFidelity' },
  { name: 'royal-york-facelift.js', data: royalYorkFaceliftData, slug: '__generatedRoyalYorkFaceliftDataFidelity' },
  { name: 'upper-canada-farmhouse.js', data: upperCanadaFarmhouseData, slug: '__generatedUpperCanadaFarmhouseDataFidelity' }
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
