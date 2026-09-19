import { replaceAt } from './layoutHelpers';

// Recursively replaces the column whose `id` matches `columnId`, wherever it lives in
// the tree (including inside a nested row placement), with `updater(column)`'s result.
// Everything else is returned untouched (new references only along the path that
// actually changed, same as the rest of this codebase's update helpers).
const updateColumnById = (rows, columnId, updater) => rows.map((row) => ({
  ...row,
  columns: row.columns.map((column) => updateColumnRecursive(column, columnId, updater))
}));

const updateColumnRecursive = (column, columnId, updater) => {
  if (column.id === columnId) return updater(column);
  return {
    ...column,
    children: column.children.map((placement) => {
      if (placement.nodeType !== 'row') return placement;
      return {
        ...placement,
        row: {
          ...placement.row,
          columns: placement.row.columns.map((nested) => updateColumnRecursive(nested, columnId, updater))
        }
      };
    })
  };
};

const findColumnById = (rows, columnId) => {
  for (let i = 0; i < rows.length; i += 1) {
    const found = findColumnInColumns(rows[i].columns, columnId);
    if (found) return found;
  }
  return null;
};

const findColumnInColumns = (columns, columnId) => {
  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];
    if (column.id === columnId) return column;
    const nestedMatch = column.children
      .filter((child) => child.nodeType === 'row')
      .map((child) => findColumnInColumns(child.row.columns, columnId))
      .find(Boolean);
    if (nestedMatch) return nestedMatch;
  }
  return null;
};

/**
 * @description Resolves a click inside a live layout preview to the exact placement
 * clicked, using the real rendered DOM rather than a separate synthetic overlay — a
 * parallel Row/Column tree built purely from data has no way to know a real image's
 * rendered height/aspect ratio, so it can't be sized to align with the actual preview
 * (this is exactly what layoutClickOverlay.jsx tried first, and why it doesn't work).
 *
 * Instead, Row/Column (rowHOC.jsx/columnHOC.jsx) stamp their editor-only `id` (from
 * layoutHelpers.js hydrateLayoutData) onto their own div as `data-row-id`/
 * `data-column-id` — real production pages never hydrate ids, so this is a no-op there.
 * Clicking anywhere inside the preview finds the nearest `[data-column-id]` ancestor
 * (naturally the *innermost* one for a click inside a nested row, since `closest` walks
 * up from the target), then figures out which of that column's direct DOM children
 * contains the click — which is exactly the tile/nested-row at that same index in the
 * column's own `children` array, since renderColumn (layoutTreeRenderer.jsx) renders
 * them in that same order with no wrapper in between.
 *
 * @param {MouseEvent} event
 * @param {HTMLElement} rootEl - the preview's own container (stops the search there)
 * @param {Array} rows
 * @returns {Object|null} { tileKey, isEmpty, anchor, getNextRows } or null if the click
 * didn't land on a resolvable placement
 */
export const resolvePlacementClick = (event, rootEl, rows) => {
  const columnEl = event.target.closest('[data-column-id]');
  if (!columnEl || !rootEl.contains(columnEl)) return null;

  let directChild = event.target;
  while (directChild && directChild.parentElement !== columnEl) directChild = directChild.parentElement;
  if (!directChild) return null;

  const childIndex = Array.from(columnEl.children).indexOf(directChild);
  if (childIndex === -1) return null;

  const columnId = columnEl.dataset.columnId;
  const column = findColumnById(rows, columnId);
  const placement = column?.children[childIndex];
  if (!placement) return null;

  const isEmpty = placement.nodeType === 'empty' || (placement.nodeType === 'tileRef' && !placement.tileKey);
  const getNextRows = (tileKey) => updateColumnById(rows, columnId, (col) => ({
    ...col,
    children: replaceAt(col.children, childIndex, { id: placement.id, nodeType: 'tileRef', tileKey })
  }));

  return {
    tileKey: placement.nodeType === 'tileRef' ? placement.tileKey : null,
    isEmpty,
    anchor: directChild,
    getNextRows
  };
};
