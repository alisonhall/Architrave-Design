import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  flattenLayout,
  insertAt,
  removeAt,
  moveAt,
  moveToIndex,
  makeBlankColumn,
  makeRowPlacement,
  makeTilePlacement,
  makeEmptyPlacement,
  cloneColumnWithNewIds,
  updateRowContainer,
  updateRowColumns,
  updateColumnChildren
} from './layoutHelpers';
import { useLayoutMeasurement } from './layoutDomMeasurement';
import { editAnchorFor } from './layoutResizeOverlay';
import ActionsMenu from './actionsMenu';

// Estimated toolbar footprints (px), used only to keep toolbars from landing on top of
// each other (see placeToolbars) — each toolbar still sizes itself to its own content.
// Sized for touch screens' larger controls (see the pointer: coarse rules in
// _admin.scss), so toolbars don't overlap there either; on a mouse it just leaves a
// little extra space between stacked toolbars.
export const TOOLBAR_HEIGHT = 36;
const TOOLBAR_GAP = 2;
// Movement below this (px) counts as a click on a drag handle, not a drag.
const DRAG_THRESHOLD = 4;
const ROW_TOOLBAR_WIDTH = 120;
const COLUMN_TOOLBAR_WIDTH = 136;

// Removing a row or column also removes everything inside it, and the admin tool has
// no undo — so, like deleting a page (layoutsEditor.jsx), it asks first.
const confirmRemove = (what) => (
  // eslint-disable-next-line no-alert
  window.confirm(`Remove this ${what} and everything in it? This can't be undone.`)
);

const overlaps = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

/**
 * @description Decides where each row's and column's toolbar goes: a row's at its
 * top-left corner, a column's at its top-right. Those corners routinely coincide — a
 * row's top-left is its first column's top-left, and a nested row placed first in a
 * column starts exactly where that column (and often its parent row) does — so any
 * toolbar that would overlap one already placed is nudged down, below it, until it
 * doesn't. Outer levels are placed first, so they keep their natural spot and nested
 * ones step down beneath them.
 *
 * @param {Array} rowBoxes - from useLayoutMeasurement
 * @param {Array} columnBoxes - from useLayoutMeasurement
 * @returns {Array} [{ kind: 'row'|'column', box, top }] in placement order
 */
export const placeToolbars = (rowBoxes, columnBoxes) => {
  const maxDepth = Math.max(-1, ...rowBoxes.map((box) => box.depth), ...columnBoxes.map((box) => box.depth));
  const ordered = [];
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    rowBoxes.filter((box) => box.depth === depth).forEach((box) => ordered.push({ kind: 'row', box }));
    columnBoxes.filter((box) => box.depth === depth).forEach((box) => ordered.push({ kind: 'column', box }));
  }

  const placed = [];
  return ordered.map(({ kind, box }) => {
    const width = kind === 'row' ? ROW_TOOLBAR_WIDTH : COLUMN_TOOLBAR_WIDTH;
    const left = kind === 'row' ? box.left : Math.max(box.left, box.left + box.width - width);
    const rect = { left, right: left + width, top: box.top, bottom: box.top + TOOLBAR_HEIGHT };

    let blocker = placed.find((other) => overlaps(rect, other));
    while (blocker) {
      rect.top = blocker.bottom + TOOLBAR_GAP;
      rect.bottom = rect.top + TOOLBAR_HEIGHT;
      blocker = placed.find((other) => overlaps(rect, other));
    }

    placed.push(rect);
    return { kind, box, top: rect.top };
  });
};

const DragHandle = (props) => (
  <button type="button" className="adminDragHandle" aria-label="Drag to reorder" {...props}>⠿</button>
);

const contains = (box, x, y) => x >= box.left && x < box.left + box.width && y >= box.top && y < box.top + box.height;

/**
 * @description Pointer-driven drag-to-reorder for a group of sibling boxes (the
 * top-level rows, or one row's columns) — the same pointer-event approach as the
 * resize handles (layoutResizeOverlay.jsx), rather than native HTML5 drag-and-drop,
 * which has no touch support and whose drop negotiation can silently turn a drop into
 * a cancel. Pressing a drag handle and moving past a small threshold starts a drag;
 * while it's under way `drag` names the group, the dragged index, and the sibling
 * currently under the pointer; releasing over a different sibling calls `onReorder`.
 *
 * @param {Element} containerEl - the element the measured boxes are relative to
 * @param {Function} onReorder - called with (group, fromIndex, toIndex)
 */
export const usePointerReorder = (containerEl, onReorder) => {
  const [drag, setDrag] = useState(null);

  // Only ever called from a handle, and handles only render once there's a measured
  // container — so `containerEl` is always set by now.
  const startDrag = (event, group, fromIndex, siblingBoxes) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    let current = null;

    const overIndexAt = (clientX, clientY) => {
      const origin = containerEl.getBoundingClientRect();
      const hit = siblingBoxes.find((box) => contains(box, clientX - origin.left, clientY - origin.top));
      return hit ? hit.index : null;
    };

    const handleMove = (moveEvent) => {
      const moved = Math.abs(moveEvent.clientX - startX) > DRAG_THRESHOLD || Math.abs(moveEvent.clientY - startY) > DRAG_THRESHOLD;
      if (!current && !moved) return;
      current = { group, fromIndex, overIndex: overIndexAt(moveEvent.clientX, moveEvent.clientY) };
      setDrag(current);
    };

    const cleanUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointercancel', cleanUp);
      setDrag(null);
    };

    // A pointercancel (the browser taking a touch gesture over) just drops the drag —
    // see the same handling in layoutResizeOverlay.jsx.
    function handleUp(upEvent) {
      cleanUp();
      if (!current) return;
      const toIndex = overIndexAt(upEvent.clientX, upEvent.clientY);
      if (toIndex !== null && toIndex !== fromIndex) onReorder(group, fromIndex, toIndex);
    }

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    document.addEventListener('pointercancel', cleanUp);
  };

  return { drag, startDrag };
};

/**
 * @description Row and column toolbars overlaid directly on the live preview — every
 * structural edit to a layout tree happens here (plus "Add row", in
 * editableLayoutPreview.jsx), with no separate side-panel tree editor. Each row, nested
 * rows included, gets a small toolbar at its top-left; each column one at its top-right:
 *
 * - Row: drag handle (top-level rows — drag onto another top-level row to reorder), and
 *   a menu with Move up/down, Duplicate, Add column, Edit size… (opens the same inline
 *   form as clicking a resize line — see layoutResizeOverlay.jsx), and Remove. A nested
 *   row's Move up/down moves it among its column's other children (tiles included),
 *   since that's the list it lives in.
 * - Column: drag handle (drag onto a sibling column to reorder), and a menu with Move
 *   left/right, Duplicate, Add tile / nested row / empty placeholder, Edit width…, and
 *   Remove.
 *
 * Tiles and empty slots themselves are edited, moved, and removed by clicking them
 * (tileEditPopover.jsx), not from here.
 *
 * @param {Object} param
 * @param {Element} param.containerEl - the element renderLayoutTree's output is inside
 * @param {Array} param.rows
 * @param {Function} param.onChangeRows
 * @param {Function} param.onEditSize - called with { type, rowId, columnId?, rect } to open the resize overlay's inline form
 */
const LayoutStructureOverlay = ({ containerEl = null, rows, onChangeRows, onEditSize }) => {
  const { rowBoxes, columnBoxes } = useLayoutMeasurement(containerEl, rows);
  const { drag, startDrag } = usePointerReorder(containerEl, (group, fromIndex, toIndex) => {
    if (group.kind === 'row') onChangeRows(moveToIndex(rows, fromIndex, toIndex));
    else onChangeRows(updateRowColumns(rows, group.rowId, (columns) => moveToIndex(columns, fromIndex, toIndex)));
  });

  // As in layoutResizeOverlay.jsx: for one frame right after switching to a different
  // tree entirely, the last measurement can still name ids this tree doesn't have.
  const { rows: rowEntries, columns: columnEntries } = flattenLayout(rows);
  const liveRowIds = new Set(rowEntries.map((entry) => entry.row.id));
  const liveColumnIds = new Set(columnEntries.map((entry) => entry.column.id));
  // Positions (`index`, `siblingCount`, `topLevel`, parents) come from the tree as it
  // is now, not from the measurement: right after a move or remove, this render still
  // has the previous measurement (the effect re-measures after it), whose positions no
  // longer match. Only the pixel geometry is taken from the measured boxes.
  const rowEntryById = Object.fromEntries(rowEntries.map(({ row, ...meta }) => [row.id, meta]));
  const columnEntryById = Object.fromEntries(columnEntries.map(({ column, ...meta }) => [column.id, meta]));
  const liveRowBoxes = rowBoxes
    .filter((box) => liveRowIds.has(box.rowId))
    .map((box) => ({ ...box, ...rowEntryById[box.rowId] }));
  const liveColumnBoxes = columnBoxes
    .filter((box) => liveColumnIds.has(box.columnId))
    .map((box) => ({ ...box, ...columnEntryById[box.columnId] }));

  // The boxes a given drag group can be dropped onto: every top-level row, or every
  // column in the same row.
  const siblingBoxesFor = (group) => (
    group.kind === 'row'
      ? liveRowBoxes.filter((box) => box.topLevel)
      : liveColumnBoxes.filter((box) => box.rowId === group.rowId)
  );
  const dragHandleProps = (group, index) => ({
    onPointerDown: (event) => startDrag(event, group, index, siblingBoxesFor(group))
  });

  const rowToolbar = (box, top) => {
    const { rowId, topLevel, index, siblingCount } = box;
    const inContainer = (op) => onChangeRows(updateRowContainer(rows, rowId, op));
    const group = { kind: 'row' };

    return (
      <div
        key={`row-${rowId}`}
        className={`adminLayoutStructure-toolbar adminLayoutStructure-toolbar--row${topLevel ? '' : ' adminLayoutStructure-toolbar--nested'}`}
        style={{ top, left: box.left }}
        data-row-toolbar={rowId}
      >
        {topLevel && <DragHandle {...dragHandleProps(group, index)} />}
        <ActionsMenu
          label={topLevel ? 'Row ▾' : 'Nested row ▾'}
          align="left"
          actions={[
            { label: 'Move up', onClick: () => inContainer((list, i) => moveAt(list, i, -1)), disabled: index === 0 },
            { label: 'Move down', onClick: () => inContainer((list, i) => moveAt(list, i, 1)), disabled: index >= siblingCount - 1 },
            { label: 'Duplicate row', onClick: () => inContainer((list, i, clone) => insertAt(list, i + 1, clone(list[i]))) },
            { label: 'Add column', onClick: () => onChangeRows(updateRowColumns(rows, rowId, (columns) => [...columns, makeBlankColumn()])) },
            { label: 'Edit size…', onClick: () => onEditSize({ type: 'row', rowId, rect: editAnchorFor('row', box) }) },
            {
              label: 'Remove row',
              onClick: () => { if (confirmRemove(topLevel ? 'row' : 'nested row')) inContainer((list, i) => removeAt(list, i)); }
            }
          ]}
        />
      </div>
    );
  };

  const columnToolbar = (box, top) => {
    const { columnId, rowId, index, siblingCount } = box;
    const onColumns = (op) => onChangeRows(updateRowColumns(rows, rowId, op));
    const addChild = (makePlacement) => onChangeRows(updateColumnChildren(rows, columnId, (children) => [...children, makePlacement()]));
    const group = { kind: 'column', rowId };

    return (
      <div
        key={`column-${columnId}`}
        className="adminLayoutStructure-toolbar adminLayoutStructure-toolbar--column"
        style={{ top, left: box.left + box.width }}
        data-column-toolbar={columnId}
      >
        {siblingCount > 1 && <DragHandle {...dragHandleProps(group, index)} />}
        <ActionsMenu
          label="Column ▾"
          actions={[
            { label: 'Move left', onClick: () => onColumns((columns) => moveAt(columns, index, -1)), disabled: index === 0 },
            { label: 'Move right', onClick: () => onColumns((columns) => moveAt(columns, index, 1)), disabled: index >= siblingCount - 1 },
            { label: 'Duplicate column', onClick: () => onColumns((columns) => insertAt(columns, index + 1, cloneColumnWithNewIds(columns[index]))) },
            { label: 'Add tile', onClick: () => addChild(() => makeTilePlacement('')) },
            { label: 'Add nested row', onClick: () => addChild(makeRowPlacement) },
            { label: 'Add empty placeholder', onClick: () => addChild(makeEmptyPlacement) },
            { label: 'Edit width…', onClick: () => onEditSize({ type: 'column', rowId, columnId, rect: editAnchorFor('column', box) }) },
            {
              label: 'Remove column',
              onClick: () => { if (confirmRemove('column')) onColumns((columns) => removeAt(columns, index)); }
            }
          ]}
        />
      </div>
    );
  };

  return (
    <div className="adminLayoutStructureOverlay">
      {placeToolbars(liveRowBoxes, liveColumnBoxes).map(({ kind, box, top }) => (
        kind === 'row' ? rowToolbar(box, top) : columnToolbar(box, top)
      ))}
      {drag && siblingBoxesFor(drag.group).map((box) => (
        <div
          key={box.columnId ?? box.rowId}
          className={[
            'adminLayoutStructure-dropZone',
            box.index === drag.fromIndex ? 'adminLayoutStructure-dropZone--source' : '',
            box.index === drag.overIndex && box.index !== drag.fromIndex ? 'adminLayoutStructure-dropZone--over' : ''
          ].filter(Boolean).join(' ')}
          style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
          data-testid="layout-drop-zone"
        />
      ))}
    </div>
  );
};

LayoutStructureOverlay.propTypes = {
  containerEl: PropTypes.instanceOf(typeof Element !== 'undefined' ? Element : Object),
  rows: PropTypes.array.isRequired,
  onChangeRows: PropTypes.func.isRequired,
  onEditSize: PropTypes.func.isRequired
};

export default LayoutStructureOverlay;
