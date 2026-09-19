import { stripLayoutData } from '../layoutHelpers';
import { generateDataFileText } from './plainDataSerializer';

/**
 * @description Generates the full text of a page's static/layouts/<slug>.js data file
 * — the single source of truth both the real production page (via
 * listingPageLayout.jsx/detailPageLayout.jsx) and the admin tool read. Pure function of
 * its input; strips the draft's editor-only `id` fields first so the committed file
 * never carries them.
 *
 * @param {Object} layoutDraft - a hydrated layout draft (see layoutHelpers.js)
 */
export const generateLayoutData = (layoutDraft) => generateDataFileText('layout', stripLayoutData(layoutDraft));
