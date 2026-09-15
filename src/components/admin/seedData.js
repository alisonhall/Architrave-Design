import constants from '../../../static/app-constants';
import { hydrateLayoutData } from './layoutHelpers';

import indexLayoutData from '../../../static/layouts/index';
import newHomesLayoutData from '../../../static/layouts/new-homes';
import renovationsAdditionsLayoutData from '../../../static/layouts/renovations-additions';
import creditRiverManorLayoutData from '../../../static/layouts/credit-river-manor';
import hoggsHollowFrenchCountryLayoutData from '../../../static/layouts/hoggs-hollow-french-country';
import hoggsHollowFrenchLayoutData from '../../../static/layouts/hoggs-hollow-french';
import hoggsHollowTraditionalLayoutData from '../../../static/layouts/hoggs-hollow-traditional';
import kingswayGeorgianLayoutData from '../../../static/layouts/kingsway-georgian';
import kingswayTransitionalLayoutData from '../../../static/layouts/kingsway-transitional';
import oakvilleExecutiveHomeLayoutData from '../../../static/layouts/oakville-executive-home';
import traditionalKingswayParkLayoutData from '../../../static/layouts/traditional-kingsway-park';
import etobicokeArtsAndCraftsLayoutData from '../../../static/layouts/etobicoke-arts-and-crafts';
import lorneParkInteriorLayoutData from '../../../static/layouts/lorne-park-interior';
import lyttonParkManorLayoutData from '../../../static/layouts/lytton-park-manor';
import princessMargaretModernLayoutData from '../../../static/layouts/princess-margaret-modern';
import rosedaleEdwardianLayoutData from '../../../static/layouts/rosedale-edwardian';
import royalYorkFaceliftLayoutData from '../../../static/layouts/royal-york-facelift';
import upperCanadaFarmhouseLayoutData from '../../../static/layouts/upper-canada-farmhouse';
import princessMargaretClassicLayoutData from '../../../static/layouts/princess-margaret-classic';
import classicCentreHallLayoutData from '../../../static/layouts/classic-centre-hall';

const clone = (value) => JSON.parse(JSON.stringify(value));

// Bump this whenever seedDraft's shape changes (a section added/removed/restructured).
// draftContext.js refuses to restore a persisted draft stashed under an older version,
// so returning users don't get a shallow merge of new seed sections with a stale
// top-level value from before that section existed (e.g. an old empty `layouts: {}`
// silently winning over a newly-seeded `layouts.newHomes`).
export const SEED_VERSION = 9;

/**
 * @description The admin draft's starting state. `projects`/order arrays come
 * straight from static/app-constants.js, and every page's layout comes straight from
 * its static/layouts/<slug>.js — the same files the real pages render from (see
 * src/components/listingPageLayout.jsx / detailPageLayout.jsx). There's nothing
 * hand-transcribed or separately maintained for layouts any more: editing a page
 * in the admin and applying the generated output via GitHub keeps this in sync
 * automatically on the next build. `aboutContent`/`reviews` are still placeholders
 * pending the same treatment in a later phase.
 */
export const seedDraft = {
  projects: clone(constants.projects),
  newProjectsOrder: clone(constants.newProjectsOrder),
  renovationProjectsOrder: clone(constants.renovationProjectsOrder),
  upcomingProjectsOrder: clone(constants.upcomingProjectsOrder),
  unusedNewProjects: clone(constants.unusedNewProjects),
  unusedRenovationProjects: clone(constants.unusedRenovationProjects),
  unusedUpcomingProjects: clone(constants.unusedUpcomingProjects),
  defaultIntroductionText: constants.defaultIntroductionText,
  // Not edited through the admin UI, but needed to regenerate a complete
  // static/app-constants.js file.
  projectTypes: clone(constants.projectTypes),
  cloudinary: clone(constants.cloudinary),
  houzz: clone(constants.houzz),
  aboutContent: null,
  reviews: null,
  layouts: {
    index: clone(hydrateLayoutData(indexLayoutData)),
    newHomes: clone(hydrateLayoutData(newHomesLayoutData)),
    renovationsAdditions: clone(hydrateLayoutData(renovationsAdditionsLayoutData)),
    creditRiverManor: clone(hydrateLayoutData(creditRiverManorLayoutData)),
    hoggsHollowFrenchCountry: clone(hydrateLayoutData(hoggsHollowFrenchCountryLayoutData)),
    hoggsHollowFrenchDetail: clone(hydrateLayoutData(hoggsHollowFrenchLayoutData)),
    hoggsHollowTraditionalDetail: clone(hydrateLayoutData(hoggsHollowTraditionalLayoutData)),
    kingswayGeorgianDetail: clone(hydrateLayoutData(kingswayGeorgianLayoutData)),
    kingswayTransitionalDetail: clone(hydrateLayoutData(kingswayTransitionalLayoutData)),
    oakvilleExecutiveHomeDetail: clone(hydrateLayoutData(oakvilleExecutiveHomeLayoutData)),
    traditionalKingswayParkDetail: clone(hydrateLayoutData(traditionalKingswayParkLayoutData)),
    etobicokeArtsAndCraftsDetail: clone(hydrateLayoutData(etobicokeArtsAndCraftsLayoutData)),
    lorneParkInteriorDetail: clone(hydrateLayoutData(lorneParkInteriorLayoutData)),
    lyttonParkManorDetail: clone(hydrateLayoutData(lyttonParkManorLayoutData)),
    princessMargaretModernDetail: clone(hydrateLayoutData(princessMargaretModernLayoutData)),
    rosedaleEdwardianDetail: clone(hydrateLayoutData(rosedaleEdwardianLayoutData)),
    royalYorkFaceliftDetail: clone(hydrateLayoutData(royalYorkFaceliftLayoutData)),
    upperCanadaFarmhouseDetail: clone(hydrateLayoutData(upperCanadaFarmhouseLayoutData)),
    princessMargaretClassicDetail: clone(hydrateLayoutData(princessMargaretClassicLayoutData)),
    classicCentreHallDetail: clone(hydrateLayoutData(classicCentreHallLayoutData))
  },
  // Layout-page configs (see LAYOUT_PAGE_CONFIGS below) for pages created within the
  // admin session itself, keyed the same way — merged with LAYOUT_PAGE_CONFIGS by
  // layoutsEditor.jsx/outputSection.jsx so a brand-new page behaves identically to an
  // already-committed one for the rest of the session. Empty until "create a page" is
  // used; each entry also carries `folder`/`slug`/`isNew` so outputSection.jsx knows to
  // additionally generate the fixed wrapper page file and its test scaffold.
  newLayoutPages: {}
};

// Static, non-content configuration each supported page's layout generator needs —
// not part of the editable draft. Every page here is on the data-driven form
// (dataFile: true — see architecture notes in the project plan): its layout lives in
// static/layouts/<slug>.js, and generateLayoutData serializes edits straight back to
// that same file. `type` is 'detail' for a page bound to one project (tile kinds
// image/description) or 'listing' for one that shares projects broadly (tile kinds
// project/filler/text) — whether it has one tree or two is read from the data itself.
//
// upcoming.jsx is deliberately not here at all: unlike the other listing pages, it
// isn't a hand-tuned Row/Column/Item tree — it's already fully generated from
// upcomingProjectsOrder (a plain map over that array), so it's already covered by the
// Projects section's ordering controls and doesn't need a layout editor of its own.
//
const listingConfig = (key, label, slug) => ({ key, label, dataFile: true, dataFilePath: `static/layouts/${slug}.js`, type: 'listing' });
const detailConfig = (key, label, slug, projectKey) => ({
  key,
  label,
  dataFile: true,
  dataFilePath: `static/layouts/${slug}.js`,
  type: 'detail',
  projectKey
});

export const LAYOUT_PAGE_CONFIGS = {
  index: listingConfig('index', 'Home (index)', 'index'),
  newHomes: listingConfig('newHomes', 'New Homes (portfolio listing)', 'new-homes'),
  renovationsAdditions: listingConfig(
    'renovationsAdditions',
    'Renovations & Additions (portfolio listing)',
    'renovations-additions'
  ),
  creditRiverManor: detailConfig(
    'creditRiverManor',
    'Credit River Manor (New Homes detail page)',
    'credit-river-manor',
    'creditRiverManor'
  ),
  hoggsHollowFrenchCountry: detailConfig(
    'hoggsHollowFrenchCountry',
    'Hoggs Hollow French Country (New Homes detail page)',
    'hoggs-hollow-french-country',
    'hoggsHollowFrenchCountry'
  ),
  hoggsHollowFrenchDetail: detailConfig(
    'hoggsHollowFrenchDetail',
    'Hoggs Hollow French (New Homes detail page)',
    'hoggs-hollow-french',
    'hoggsHollowFrench'
  ),
  hoggsHollowTraditionalDetail: detailConfig(
    'hoggsHollowTraditionalDetail',
    'Hoggs Hollow Traditional (New Homes detail page)',
    'hoggs-hollow-traditional',
    'hoggsHollowTraditional'
  ),
  kingswayGeorgianDetail: detailConfig(
    'kingswayGeorgianDetail',
    'Kingsway Georgian (New Homes detail page)',
    'kingsway-georgian',
    'kingswayGeorgian'
  ),
  kingswayTransitionalDetail: detailConfig(
    'kingswayTransitionalDetail',
    'Kingsway Transitional (New Homes detail page)',
    'kingsway-transitional',
    'kingswayTransitional'
  ),
  oakvilleExecutiveHomeDetail: detailConfig(
    'oakvilleExecutiveHomeDetail',
    'Oakville Executive Home (New Homes detail page)',
    'oakville-executive-home',
    'oakvilleExecutiveHome'
  ),
  traditionalKingswayParkDetail: detailConfig(
    'traditionalKingswayParkDetail',
    'Traditional Kingsway Park (New Homes detail page)',
    'traditional-kingsway-park',
    'traditionalKingswayPark'
  ),
  etobicokeArtsAndCraftsDetail: detailConfig(
    'etobicokeArtsAndCraftsDetail',
    'Etobicoke Arts and Crafts (Renovations detail page)',
    'etobicoke-arts-and-crafts',
    'etobicokeArtsAndCrafts'
  ),
  lorneParkInteriorDetail: detailConfig(
    'lorneParkInteriorDetail',
    'Lorne Park Interior (Renovations detail page)',
    'lorne-park-interior',
    'lorneParkInterior'
  ),
  lyttonParkManorDetail: detailConfig(
    'lyttonParkManorDetail',
    'Lytton Park Manor (Renovations detail page)',
    'lytton-park-manor',
    'lyttonParkManor'
  ),
  princessMargaretModernDetail: detailConfig(
    'princessMargaretModernDetail',
    'Princess Margaret Modern (Renovations detail page)',
    'princess-margaret-modern',
    'princessMargaretModern'
  ),
  rosedaleEdwardianDetail: detailConfig(
    'rosedaleEdwardianDetail',
    'Rosedale Edwardian (Renovations detail page)',
    'rosedale-edwardian',
    'rosedaleEdwardian'
  ),
  royalYorkFaceliftDetail: detailConfig(
    'royalYorkFaceliftDetail',
    'Royal York Facelift (Renovations detail page)',
    'royal-york-facelift',
    'royalYorkFacelift'
  ),
  upperCanadaFarmhouseDetail: detailConfig(
    'upperCanadaFarmhouseDetail',
    'Upper Canada Farmhouse (Renovations detail page)',
    'upper-canada-farmhouse',
    'upperCanadaFarmhouse'
  ),
  princessMargaretClassicDetail: detailConfig(
    'princessMargaretClassicDetail',
    'Princess Margaret Classic (New Homes detail page)',
    'princess-margaret-classic',
    'princessMargaretClassic'
  ),
  classicCentreHallDetail: detailConfig(
    'classicCentreHallDetail',
    'Classic Centre Hall (New Homes detail page)',
    'classic-centre-hall',
    'classicCentreHall'
  )
};
