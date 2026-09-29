import { replaceAt, removeAt, moveAt, findColumnById, updateColumnChildren } from './layoutHelpers';

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
 * @returns {Object|null} { tileKey, isEmpty, anchor, getNextRows, canMoveUp, canMoveDown,
 * getMovedRows, getRemovedRows } or null if the click didn't land on a resolvable
 * placement — `getNextRows(tileKey)` assigns a tile to this slot, `getMovedRows(delta)`
 * moves it up/down among its column's children, `getRemovedRows()` takes it out of the
 * layout entirely (all pure: each returns the next `rows` without applying it)
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
  const updateChildren = (op) => updateColumnChildren(rows, columnId, op);

  return {
    tileKey: placement.nodeType === 'tileRef' ? placement.tileKey : null,
    isEmpty,
    anchor: directChild,
    canMoveUp: childIndex > 0,
    canMoveDown: childIndex < column.children.length - 1,
    getNextRows: (tileKey) => updateChildren((children) => replaceAt(children, childIndex, { id: placement.id, nodeType: 'tileRef', tileKey })),
    getMovedRows: (delta) => updateChildren((children) => moveAt(children, childIndex, delta)),
    getRemovedRows: () => updateChildren((children) => removeAt(children, childIndex))
  };
};
