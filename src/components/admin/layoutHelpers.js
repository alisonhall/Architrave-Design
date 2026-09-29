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
export const insertAt = (array, index, value) => [...array.slice(0, index), value, ...array.slice(index)];
export const moveAt = (array, index, delta) => {
  const target = index + delta;
  if (target < 0 || target >= array.length) return array;
  const next = [...array];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

// Used for drag-and-drop reordering (layoutStructureOverlay.jsx) — unlike moveAt (which
// swaps two adjacent items), this relocates one item to any position, shifting the
// items between its old and new spot rather than swapping.
export const moveToIndex = (array, fromIndex, toIndex) => {
  if (fromIndex === toIndex || fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
    return array;
  }
  const next = [...array];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
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

// Deep-clones a row/column/placement with fresh ids at every level — used for
// "Duplicate row"/"Duplicate column" (layoutStructureOverlay.jsx). A shallow clone would
// leave the copy sharing ids with the original, breaking both React's keying and the
// click-to-edit-in-preview DOM-id lookup (layoutClickOverlay.jsx), which relies on
// every column having a unique id.
export const cloneColumnWithNewIds = (column) => ({
  ...column,
  id: makeId('column'),
  children: column.children.map(clonePlacementWithNewIds)
});

export const cloneRowWithNewIds = (row) => ({
  ...row,
  id: makeId('row'),
  columns: row.columns.map(cloneColumnWithNewIds)
});

export function clonePlacementWithNewIds(placement) {
  const id = makeId('placement');
  if (placement.nodeType === 'row') return { ...placement, id, row: cloneRowWithNewIds(placement.row) };
  return { ...placement, id };
}

// ---------------------------------------------------------------------------------
// Tree walking. A layout tree nests arbitrarily: a column's `children` can include a
// `{ nodeType: 'row', row }` placement, whose own columns can hold further rows, and so
// on. Every preview overlay (click-to-edit, resize, structure) addresses rows and
// columns by their editor-only `id` alone, wherever in the tree they live — these are
// the one shared implementation of finding/updating a node by id, so no overlay needs
// its own recursive walk.
// ---------------------------------------------------------------------------------

// Like array.map, but returns the original array itself when `fn` returned every item
// unchanged — so an update deep in the tree only produces new objects along the path
// that actually changed, leaving every untouched sibling (and its subtree) the same
// reference it was before.
const mapPreserving = (array, fn) => {
  let changed = false;
  const next = array.map((item) => {
    const mapped = fn(item);
    if (mapped !== item) changed = true;
    return mapped;
  });
  return changed ? next : array;
};

// `row` with `columnFn` applied to each of its columns, or `row` itself if that changed
// nothing; likewise `column` with `rowFn` applied to each row nested directly in it.
const mapRowContents = (row, columnFn) => {
  const columns = mapPreserving(row.columns, columnFn);
  return columns === row.columns ? row : { ...row, columns };
};

const mapNestedRows = (column, rowFn) => {
  const children = mapPreserving(column.children, (placement) => {
    if (placement.nodeType !== 'row') return placement;
    const row = rowFn(placement.row);
    return row === placement.row ? placement : { ...placement, row };
  });
  return children === column.children ? column : { ...column, children };
};

const updateColumnRecursive = (column, columnId, updater) => {
  if (column.id === columnId) return updater(column);
  return mapNestedRows(column, (row) => mapRowContents(row, (nested) => updateColumnRecursive(nested, columnId, updater)));
};

/**
 * @description Replaces the column whose `id` matches `columnId`, wherever it lives in
 * the tree (including inside a nested row placement), with `updater(column)`'s result.
 */
export const updateColumnById = (rows, columnId, updater) => mapPreserving(
  rows,
  (row) => mapRowContents(row, (column) => updateColumnRecursive(column, columnId, updater))
);

const updateRowRecursive = (row, rowId, updater) => {
  if (row.id === rowId) return updater(row);
  return mapRowContents(row, (column) => mapNestedRows(column, (nested) => updateRowRecursive(nested, rowId, updater)));
};

/**
 * @description Replaces the row whose `id` matches `rowId` — a top-level row or one
 * nested (as a placement) at any depth — with `updater(row)`'s result.
 */
export const updateRowById = (rows, rowId, updater) => mapPreserving(rows, (row) => updateRowRecursive(row, rowId, updater));

/**
 * @description Every row and column in a layout tree, in document order (a row before
 * its own columns, a column before any rows nested inside it), each tagged with where
 * it sits: `depth` (0 for a top-level row and its columns), its sibling `index` and
 * `siblingCount`, and its parent's id. For a nested row, `index`/`siblingCount` refer
 * to its position among its parent column's `children` (tiles and other rows alike),
 * since that's the array moving/removing it actually changes.
 *
 * @param {Array} rows
 * @returns {{ rows: Array, columns: Array }}
 */
export const flattenLayout = (rows) => {
  const rowEntries = [];
  const columnEntries = [];

  const visitRow = (row, meta) => {
    rowEntries.push({ row, ...meta });
    row.columns.forEach((column, columnIndex) => {
      columnEntries.push({
        column,
        rowId: row.id,
        depth: meta.depth,
        index: columnIndex,
        siblingCount: row.columns.length
      });
      column.children.forEach((placement, placementIndex) => {
        if (placement.nodeType !== 'row') return;
        visitRow(placement.row, {
          depth: meta.depth + 1,
          topLevel: false,
          index: placementIndex,
          siblingCount: column.children.length,
          parentColumnId: column.id,
          parentRowId: row.id
        });
      });
    });
  };

  rows.forEach((row, index) => visitRow(row, {
    depth: 0,
    topLevel: true,
    index,
    siblingCount: rows.length,
    parentColumnId: null,
    parentRowId: null
  }));

  return { rows: rowEntries, columns: columnEntries };
};

export const findRowById = (rows, rowId) => flattenLayout(rows).rows.find((entry) => entry.row.id === rowId)?.row ?? null;

export const findColumnById = (rows, columnId) => (
  flattenLayout(rows).columns.find((entry) => entry.column.id === columnId)?.column ?? null
);

/**
 * @description Applies `op(list, index, clone)` to whichever array actually holds the
 * row `rowId` — the top-level `rows` array itself, or (for a nested row) its parent
 * column's `children`, where it's wrapped in a `{ nodeType: 'row' }` placement. `clone`
 * deep-copies an item of that same array with fresh ids, so "duplicate" works the same
 * at either level. Lets move/remove/duplicate treat a nested row exactly like a
 * top-level one. Returns `rows` unchanged if no such row exists.
 */
export const updateRowContainer = (rows, rowId, op) => {
  const entry = flattenLayout(rows).rows.find((candidate) => candidate.row.id === rowId);
  if (!entry) return rows;
  if (entry.topLevel) return op(rows, entry.index, cloneRowWithNewIds);
  return updateColumnById(rows, entry.parentColumnId, (column) => ({
    ...column,
    children: op(column.children, entry.index, clonePlacementWithNewIds)
  }));
};

export const updateRowColumns = (rows, rowId, op) => updateRowById(rows, rowId, (row) => ({ ...row, columns: op(row.columns) }));

export const updateColumnChildren = (rows, columnId, op) => (
  updateColumnById(rows, columnId, (column) => ({ ...column, children: op(column.children) }))
);

export const makeBlankTile = (kind) => {
  if (kind === 'project') return { kind: 'project', projectKey: '', backgroundPosition: '' };
  if (kind === 'filler') return { kind: 'filler', projectKey: '', imageUrl: '' };
  if (kind === 'image') return { kind: 'image', imageUrl: '', backgroundPosition: '', overlayText: '' };
  if (kind === 'description') return { kind: 'description' };
  if (kind === 'embed') return { kind: 'embed', html: '' };
  if (kind === 'placeholder') return { kind: 'placeholder' };
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
// React keys and node addresses for the layout editor). These two functions are the only
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
 * (as loaded from static/layouts/<slug>.js) so the layout editor has stable React keys
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

const renamePlacementTileKey = (placement, oldKey, newKey) => {
  if (placement.nodeType === 'row') return { ...placement, row: renameRowTileKey(placement.row, oldKey, newKey) };
  if (placement.nodeType === 'tileRef' && placement.tileKey === oldKey) return { ...placement, tileKey: newKey };
  return placement;
};

const renameColumnTileKey = (column, oldKey, newKey) => ({
  ...column,
  children: column.children.map((placement) => renamePlacementTileKey(placement, oldKey, newKey))
});

const renameRowTileKey = (row, oldKey, newKey) => ({
  ...row,
  columns: row.columns.map((column) => renameColumnTileKey(column, oldKey, newKey))
});

/**
 * @description Updates every `tileRef` placement across a page's layout tree(s) that
 * points at `oldKey` to point at `newKey` instead — used when a tile is renamed in the
 * tile library, so its existing placements keep working under the new key rather than
 * silently going stale. Returns only the tree fields that actually changed (`layout` or
 * `defaultLayout`/`wideLayout`), ready to spread into an updatePageLayout call.
 */
export const renameTileKeyInLayoutData = (pageLayout, oldKey, newKey) => {
  const updates = {};
  if (pageLayout.layout) updates.layout = pageLayout.layout.map((row) => renameRowTileKey(row, oldKey, newKey));
  if (pageLayout.defaultLayout) {
    updates.defaultLayout = pageLayout.defaultLayout.map((row) => renameRowTileKey(row, oldKey, newKey));
  }
  if (pageLayout.wideLayout) {
    updates.wideLayout = pageLayout.wideLayout.map((row) => renameRowTileKey(row, oldKey, newKey));
  }
  return updates;
};

/**
 * @description Starting layout draft for a brand-new detail page: a single, empty tree
 * (just a description tile in its library, no rows yet — the preview's own "Add row"
 * button takes it from there) bound to the given project. Already hydrated with
 * editor-only ids, ready to drop straight into draft.layouts.
 */
export const makeBlankDetailLayout = (projectKey) => hydrateLayoutData({
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey,
  tiles: { description: { kind: 'description' } },
  layout: []
});
