// computeTileOrder is genuinely shared with production rendering (src/components/
// layoutTreeRenderer.jsx) — re-exported here so existing admin imports keep working.
export { computeTileOrder } from '../layoutTreeRenderer';

let idCounter = 0;
/**
 * @description A unique-enough id for a layout tree node, used only as a React key and
 * to address nodes for editing — never emitted by the generator.
 */
export const makeId = (prefix) => {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Math.random().toString(36).slice(2, 8)}`;
};

export const replaceAt = (array, index, value) => array.map((item, i) => (i === index ? value : item));
export const removeAt = (array, index) => array.filter((_, i) => i !== index);
export const moveAt = (array, index, delta) => {
  const target = index + delta;
  if (target < 0 || target >= array.length) return array;
  const next = [...array];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

export const makeBlankRow = () => ({ id: makeId('row'), height: undefined, imageHeight: undefined, columns: [] });
export const makeBlankColumn = () => ({ id: makeId('column'), width: undefined, children: [] });
export const makeRowPlacement = () => ({ id: makeId('placement'), nodeType: 'row', row: makeBlankRow() });
export const makeTilePlacement = (tileKey) => ({ id: makeId('placement'), nodeType: 'tileRef', tileKey });
// A bare `<Item />` placeholder — some detail pages use one as an empty spacer, placed
// directly rather than through the shared tile library (there's nothing to reuse or
// configure about it).
export const makeEmptyPlacement = () => ({ id: makeId('placement'), nodeType: 'empty' });

export const makeBlankTile = (kind) => {
  if (kind === 'project') return { kind: 'project', projectKey: '', backgroundPosition: '' };
  if (kind === 'filler') return { kind: 'filler', projectKey: '', imageUrl: '' };
  if (kind === 'image') return { kind: 'image', imageUrl: '', backgroundPosition: '', overlayText: '' };
  if (kind === 'description') return { kind: 'description' };
  return { kind: 'text', text: '', useIntroText: true };
};

/**
 * @description Suggests a tile key from a project name/kind that doesn't collide with
 * any existing tile key, following the live site's own naming convention (e.g.
 * "kingswayTransitionalFiller" for a filler tile of the Kingsway Transitional project).
 */
export const suggestTileKey = (kind, projectKey, existingTiles) => {
  const base = kind === 'filler' && projectKey ? `${projectKey}Filler` : projectKey || `${kind}Tile`;
  if (!existingTiles[base]) return base;

  let suffix = 2;
  while (existingTiles[`${base}${suffix}`]) suffix += 1;
  return `${base}${suffix}`;
};

// `static/layouts/*.js` never stores `id` fields (they're an editing-only concern —
// React keys and node addresses for the tree editor). These two functions are the only
// place ids get added (on load) and removed (before generating output), so the
// committed data stays clean regardless of what the admin does with it in a session.
const hydratePlacement = (placement) => {
  if (placement.nodeType === 'row') return { id: makeId('placement'), nodeType: 'row', row: hydrateRow(placement.row) };
  return { id: makeId('placement'), ...placement };
};

const hydrateColumn = (column) => ({ id: makeId('column'), ...column, children: column.children.map(hydratePlacement) });

const hydrateRow = (row) => ({ id: makeId('row'), ...row, columns: row.columns.map(hydrateColumn) });

export const hydrateLayoutRows = (rows) => rows.map(hydrateRow);

/**
 * @description Adds fresh `id`s to every row/column/placement in a page's layout data
 * (as loaded from static/layouts/<slug>.js) so the tree editor has stable React keys
 * and addresses to edit. Handles both a single-tree page (`layout`) and a dual-tree
 * page (`defaultLayout`/`wideLayout`); everything else on the object passes through.
 */
export const hydrateLayoutData = (data) => {
  const hydrated = { ...data };
  if (data.layout) hydrated.layout = hydrateLayoutRows(data.layout);
  if (data.defaultLayout) hydrated.defaultLayout = hydrateLayoutRows(data.defaultLayout);
  if (data.wideLayout) hydrated.wideLayout = hydrateLayoutRows(data.wideLayout);
  return hydrated;
};

const stripPlacement = ({ id, ...rest }) => {
  if (rest.nodeType === 'row') return { nodeType: 'row', row: stripRow(rest.row) };
  return rest;
};

const stripColumn = ({ id, children, ...rest }) => ({ ...rest, children: children.map(stripPlacement) });

const stripRow = ({ id, columns, ...rest }) => ({ ...rest, columns: columns.map(stripColumn) });

export const stripLayoutRows = (rows) => rows.map(stripRow);

/**
 * @description The inverse of hydrateLayoutData — removes every `id` before the draft
 * is serialized back to static/layouts/<slug>.js text, so what's committed never
 * carries editor-only bookkeeping.
 */
export const stripLayoutData = (data) => {
  const stripped = { ...data };
  if (data.layout) stripped.layout = stripLayoutRows(data.layout);
  if (data.defaultLayout) stripped.defaultLayout = stripLayoutRows(data.defaultLayout);
  if (data.wideLayout) stripped.wideLayout = stripLayoutRows(data.wideLayout);
  return stripped;
};
