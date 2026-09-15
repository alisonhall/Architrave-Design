import fs from 'fs';
import path from 'path';
import React from 'react';
import { render } from '@testing-library/react';

import { seedDraft, LAYOUT_PAGE_CONFIGS } from '../../seedData';
import { generateLayoutPage } from '../layoutGenerator';
import RealNewHomes from '../../../../pages/portfolio/new-homes';
import RealRenovationsAdditions from '../../../../pages/portfolio/renovations-additions';
import RealHoggsHollowFrenchCountry from '../../../../pages/portfolio/new-homes/hoggs-hollow-french-country';
import RealHoggsHollowFrench from '../../../../pages/portfolio/new-homes/hoggs-hollow-french';
import RealHoggsHollowTraditional from '../../../../pages/portfolio/new-homes/hoggs-hollow-traditional';
import RealKingswayGeorgian from '../../../../pages/portfolio/new-homes/kingsway-georgian';
import RealKingswayTransitional from '../../../../pages/portfolio/new-homes/kingsway-transitional';
import RealOakvilleExecutiveHome from '../../../../pages/portfolio/new-homes/oakville-executive-home';
import RealTraditionalKingswayPark from '../../../../pages/portfolio/new-homes/traditional-kingsway-park';
import RealEtobicokeArtsAndCrafts from '../../../../pages/portfolio/renovations-additions/etobicoke-arts-and-crafts';
import RealLorneParkInterior from '../../../../pages/portfolio/renovations-additions/lorne-park-interior';
import RealLyttonParkManor from '../../../../pages/portfolio/renovations-additions/lytton-park-manor';
import RealPrincessMargaretModern from '../../../../pages/portfolio/renovations-additions/princess-margaret-modern';
import RealRosedaleEdwardian from '../../../../pages/portfolio/renovations-additions/rosedale-edwardian';
import RealRoyalYorkFacelift from '../../../../pages/portfolio/renovations-additions/royal-york-facelift';
import RealUpperCanadaFarmhouse from '../../../../pages/portfolio/renovations-additions/upper-canada-farmhouse';

const detailCase = (folder, name, layoutKey, RealComponent, slug) => ({
  name: `${folder}/${slug}.jsx (a detail page)`,
  layoutKey,
  generatedPath: path.join(__dirname, `../../../../pages/portfolio/${folder}/__generated${name}ForTest.jsx`),
  requirePath: `../../../../pages/portfolio/${folder}/__generated${name}ForTest`,
  RealComponent,
  pathname: `/portfolio/${folder}/${slug}/`
});

const newHomesDetailCase = (name, layoutKey, RealComponent, slug) =>
  detailCase('new-homes', name, layoutKey, RealComponent, slug);

const renovationsDetailCase = (name, layoutKey, RealComponent, slug) =>
  detailCase('renovations-additions', name, layoutKey, RealComponent, slug);

// For each supported page still on the original JSX-generation mechanism (i.e. not yet
// migrated to the data-driven static/layouts/<slug>.js form — see
// layoutDataGenerator.fidelity.test.jsx for those), writes the generated text next to
// the real one so Jest's normal jsx transform picks it up, then requires and renders
// it — proving the generator's output isn't just "valid JSX" but renders byte-for-byte
// the same DOM as the hand-written page it was transcribed from.
const CASES = [
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
  },
  newHomesDetailCase(
    'HoggsHollowFrenchCountry',
    'hoggsHollowFrenchCountry',
    RealHoggsHollowFrenchCountry,
    'hoggs-hollow-french-country'
  ),
  newHomesDetailCase('HoggsHollowFrenchDetail', 'hoggsHollowFrenchDetail', RealHoggsHollowFrench, 'hoggs-hollow-french'),
  newHomesDetailCase(
    'HoggsHollowTraditionalDetail',
    'hoggsHollowTraditionalDetail',
    RealHoggsHollowTraditional,
    'hoggs-hollow-traditional'
  ),
  newHomesDetailCase('KingswayGeorgianDetail', 'kingswayGeorgianDetail', RealKingswayGeorgian, 'kingsway-georgian'),
  newHomesDetailCase(
    'KingswayTransitionalDetail',
    'kingswayTransitionalDetail',
    RealKingswayTransitional,
    'kingsway-transitional'
  ),
  newHomesDetailCase(
    'OakvilleExecutiveHomeDetail',
    'oakvilleExecutiveHomeDetail',
    RealOakvilleExecutiveHome,
    'oakville-executive-home'
  ),
  newHomesDetailCase(
    'TraditionalKingswayParkDetail',
    'traditionalKingswayParkDetail',
    RealTraditionalKingswayPark,
    'traditional-kingsway-park'
  ),
  renovationsDetailCase(
    'EtobicokeArtsAndCraftsDetail',
    'etobicokeArtsAndCraftsDetail',
    RealEtobicokeArtsAndCrafts,
    'etobicoke-arts-and-crafts'
  ),
  renovationsDetailCase('LorneParkInteriorDetail', 'lorneParkInteriorDetail', RealLorneParkInterior, 'lorne-park-interior'),
  renovationsDetailCase('LyttonParkManorDetail', 'lyttonParkManorDetail', RealLyttonParkManor, 'lytton-park-manor'),
  renovationsDetailCase(
    'PrincessMargaretModernDetail',
    'princessMargaretModernDetail',
    RealPrincessMargaretModern,
    'princess-margaret-modern'
  ),
  renovationsDetailCase('RosedaleEdwardianDetail', 'rosedaleEdwardianDetail', RealRosedaleEdwardian, 'rosedale-edwardian'),
  renovationsDetailCase('RoyalYorkFaceliftDetail', 'royalYorkFaceliftDetail', RealRoyalYorkFacelift, 'royal-york-facelift'),
  renovationsDetailCase(
    'UpperCanadaFarmhouseDetail',
    'upperCanadaFarmhouseDetail',
    RealUpperCanadaFarmhouse,
    'upper-canada-farmhouse'
  )
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
