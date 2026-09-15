import { stripLayoutData } from '../layoutHelpers';

const INDENT = '  ';
const indent = (level) => INDENT.repeat(level);
// Picks whichever quote char needs fewer escapes, then escapes backslashes, that quote
// char, and literal newlines — needed once embed tiles let arbitrary multi-line, mixed-
// quote HTML markup (see tile.html) flow into a plain string literal.
const quote = (value) => {
  const quoteChar = value.includes("'") ? '"' : "'";
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(new RegExp(quoteChar, 'g'), `\\${quoteChar}`)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  return `${quoteChar}${escaped}${quoteChar}`;
};
const isValidIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);

// Plain-value serializer for static/layouts/<slug>.js — every page's canonical layout
// source (see layoutHelpers.js hydrateLayoutData/stripLayoutData). No JSX involved:
// placements are just `{ nodeType: 'tileRef', tileKey }` etc., resolved at render time
// by layoutTreeRenderer.jsx, so there's no dot-vs-bracket-notation concern the way
// there would be generating real JSX text — this is just a plain object literal.
const serializeValue = (value, level) => {
  if (typeof value === 'string') return quote(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => `${indent(level + 1)}${serializeValue(item, level + 1)}`).join(',\n');
    return `[\n${items}\n${indent(level)}]`;
  }

  const keys = Object.keys(value).filter((key) => value[key] !== undefined);
  if (keys.length === 0) return '{}';
  const entries = keys.map(
    (key) => `${indent(level + 1)}${isValidIdentifier(key) ? key : quote(key)}: ${serializeValue(value[key], level + 1)}`
  );
  return `{\n${entries.join(',\n')}\n${indent(level)}}`;
};

/**
 * @description Generates the full text of a page's static/layouts/<slug>.js data file
 * — the single source of truth both the real production page (via
 * listingPageLayout.jsx/detailPageLayout.jsx) and the admin tool read. Pure function of
 * its input; strips the draft's editor-only `id` fields first so the committed file
 * never carries them.
 *
 * @param {Object} layoutDraft - a hydrated layout draft (see layoutHelpers.js)
 */
export const generateLayoutData = (layoutDraft) => {
  const data = stripLayoutData(layoutDraft);
  return `const layout = ${serializeValue(data, 0)};\n\nexport default layout;\n`;
};
