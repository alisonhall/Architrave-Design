import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { flattenLayout, updateRowById, updateRowColumns } from './layoutHelpers';
import { useLayoutMeasurement } from './layoutDomMeasurement';

// Movement below this (px) counts as a click, not a drag — lets the same handle serve
// both "drag to resize" and "click for an exact number" without a separate button.
const DRAG_THRESHOLD = 4;

// Two edges closer than this (px) are treated as the same line — see
// visibleHandleBoxes below.
const COINCIDENT_EDGE = 6;

// All three work on a row/column at any depth, nested rows included (updateRowById /
// updateRowColumns walk the whole tree).
export const setRowHeight = (rows, rowId, height) => updateRowById(rows, rowId, (row) => ({ ...row, height }));

export const setRowSize = (rows, rowId, { height, imageHeight }) => updateRowById(
  rows,
  rowId,
  (row) => ({ ...row, height, imageHeight })
);

export const setColumnWidth = (rows, rowId, columnId, width) => updateRowColumns(
  rows,
  rowId,
  (columns) => columns.map((column) => (column.id === columnId ? { ...column, width } : column))
);

/**
 * @description Picks which measured rows/columns get a resize handle. Every row gets
 * one at its bottom edge and every column at its right edge — nested rows included —
 * except where a nested row's edge lands on its parent's own edge (a nested row filling
 * the rest of its column, or a nested row's last column ending where its parent column
 * does): two handles stacked on the same line would leave only whichever renders last
 * reachable, so the outer one keeps it. A nested row hidden that way can still be sized
 * exactly from its structure toolbar's "Edit size…" (layoutStructureOverlay.jsx).
 *
 * Measured boxes whose ids aren't in `rows` any more (one stale frame right after
 * switching to a different tree entirely, before the effect re-measures) are dropped
 * rather than crashing on them.
 *
 * @param {Array} rows
 * @param {Object} measurement - useLayoutMeasurement's { rowBoxes, columnBoxes }
 * @returns {{ rows: Array, columns: Array }} the boxes to render handles for, innermost first
 */
export const visibleHandleBoxes = (rows, { rowBoxes, columnBoxes }) => {
  const { rows: rowEntries, columns: columnEntries } = flattenLayout(rows);
  const liveRowIds = new Set(rowEntries.map((entry) => entry.row.id));
  const liveColumnIds = new Set(columnEntries.map((entry) => entry.column.id));
  const rowBoxById = Object.fromEntries(rowBoxes.map((box) => [box.rowId, box]));
  const columnBoxById = Object.fromEntries(columnBoxes.map((box) => [box.columnId, box]));
  const bottom = (box) => box.top + box.height;
  const right = (box) => box.left + box.width;

  const visibleRows = rowBoxes.filter((box) => {
    if (!liveRowIds.has(box.rowId)) return false;
    const parent = box.parentRowId ? rowBoxById[box.parentRowId] : null;
    return !parent || Math.abs(bottom(box) - bottom(parent)) >= COINCIDENT_EDGE;
  });

  const visibleColumns = columnBoxes.filter((box) => {
    if (!liveColumnIds.has(box.columnId)) return false;
    const row = rowBoxById[box.rowId];
    const parentColumn = row && row.parentColumnId ? columnBoxById[row.parentColumnId] : null;
    return !parentColumn || Math.abs(right(box) - right(parentColumn)) >= COINCIDENT_EDGE;
  });

  // Outer handles render last, so wherever two do still overlap, the outer one is on top.
  const innermostFirst = (a, b) => b.depth - a.depth;
  return { rows: [...visibleRows].sort(innermostFirst), columns: [...visibleColumns].sort(innermostFirst) };
};

// Shared drag logic for both handle orientations: tracks pointer movement along one
// axis, moves the handle's own line to follow the cursor (imperative — no re-render per
// pointermove) for live feedback without resizing anything until release, then either
// commits the final value (a real drag) or opens the number-input fallback (a click).
const useDragHandle = ({ axis, onCommit, onClickToEdit }) => {
  const lineRef = useRef(null);
  const [liveValue, setLiveValue] = useState(null);

  const onPointerDown = (event) => {
    event.preventDefault();
    const startPos = axis === 'y' ? event.clientY : event.clientX;
    let moved = false;

    const handleMove = (moveEvent) => {
      const pos = axis === 'y' ? moveEvent.clientY : moveEvent.clientX;
      const delta = pos - startPos;
      if (Math.abs(delta) > DRAG_THRESHOLD) moved = true;
      if (moved && lineRef.current) {
        lineRef.current.style.transform = axis === 'y' ? `translateY(${delta}px)` : `translateX(${delta}px)`;
        setLiveValue(delta);
      }
    };

    const cleanUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointercancel', cleanUp);
      if (lineRef.current) lineRef.current.style.transform = '';
      setLiveValue(null);
    };

    function handleUp(upEvent) {
      cleanUp();

      if (moved) {
        const pos = axis === 'y' ? upEvent.clientY : upEvent.clientX;
        onCommit(pos - startPos);
      } else {
        onClickToEdit();
      }
    }

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    // The browser took the gesture over (a touch it decided was a scroll, e.g.): drop
    // it without committing anything. Without this, the listeners would stay attached
    // and the next unrelated tap anywhere would "finish" the drag at that position.
    document.addEventListener('pointercancel', cleanUp);
  };

  return { lineRef, liveValue, onPointerDown };
};

const RowResizeHandle = ({ rect, initialHeight, onCommit, onClickToEdit }) => {
  const { lineRef, liveValue, onPointerDown } = useDragHandle({
    axis: 'y',
    onCommit: (delta) => onCommit(Math.max(20, Math.round(initialHeight + delta))),
    onClickToEdit
  });

  return (
    <div
      ref={lineRef}
      className="adminLayoutResize-row"
      style={{ top: rect.top, left: rect.left, width: rect.width }}
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Drag to resize this row's height, or click to type an exact value"
    >
      {liveValue !== null && (
        <span className="adminLayoutResize-label">{Math.max(20, Math.round(initialHeight + liveValue))}px</span>
      )}
    </div>
  );
};

RowResizeHandle.propTypes = {
  rect: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number, width: PropTypes.number }).isRequired,
  initialHeight: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired,
  onClickToEdit: PropTypes.func.isRequired
};

const ColumnResizeHandle = ({ rect, initialWidth, onCommit, onClickToEdit }) => {
  const toPercent = (delta) => Math.max(5, Math.min(100, ((initialWidth + delta) / rect.rowWidth) * 100));
  const { lineRef, liveValue, onPointerDown } = useDragHandle({
    axis: 'x',
    onCommit: (delta) => onCommit(`${toPercent(delta).toFixed(1)}%`),
    onClickToEdit
  });

  return (
    <div
      ref={lineRef}
      className="adminLayoutResize-column"
      style={{ top: rect.top, left: rect.left, height: rect.height }}
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Drag to resize this column's width, or click to type an exact value"
    >
      {liveValue !== null && <span className="adminLayoutResize-label">{toPercent(liveValue).toFixed(0)}%</span>}
    </div>
  );
};

ColumnResizeHandle.propTypes = {
  rect: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    height: PropTypes.number,
    rowWidth: PropTypes.number
  }).isRequired,
  initialWidth: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired,
  onClickToEdit: PropTypes.func.isRequired
};

/**
 * @description The small inline form a click on a resize line (or a structure
 * toolbar's "Edit size…") opens, for typing exact values a drag can't hit precisely.
 * Enter in any field commits every field at once, as does moving focus out of the form
 * entirely (not just between its own fields); Escape cancels.
 */
const EditPopup = ({ rect, fields, onCommit, onCancel }) => {
  const [draft, setDraft] = useState(() => Object.fromEntries(fields.map((field) => [field.name, field.value])));

  const commit = () => onCommit(draft);

  return (
    <div
      className="adminLayoutResize-edit"
      style={{ top: rect.top, left: rect.left }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) commit(); }}
    >
      {fields.map((field, index) => (
        <label key={field.name}>
          {field.label}
          <input
            type="text"
            inputMode={field.numeric ? 'numeric' : undefined}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={index === 0}
            value={draft[field.name]}
            onChange={(e) => setDraft({ ...draft, [field.name]: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') onCancel();
            }}
          />
        </label>
      ))}
    </div>
  );
};

EditPopup.propTypes = {
  rect: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    numeric: PropTypes.bool
  })).isRequired,
  onCommit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const pxOrUndefined = (value) => {
  if (value.trim() === '') return undefined;
  const number = Number(value);
  return Number.isNaN(number) ? undefined : number;
};

// Where the inline form opens for a given measured box: just below a row's bottom
// edge, or at a column's right edge.
export const editAnchorFor = (type, box) => (
  type === 'row'
    ? { top: box.top + box.height, left: box.left }
    : { top: box.top, left: box.left + box.width }
);

/**
 * @description Drag lines overlaid on the live preview for resizing any row's height
 * (top-level or nested) or any column's width — the preview's only way to change either
 * now that the side-panel tree editor is gone, alongside the "Edit size…" item in each
 * row/column's structure toolbar (layoutStructureOverlay.jsx), which opens this same
 * inline form. Clicking a line instead of dragging it opens that form too, for typing an
 * exact value (a row's form also holds its "Image height"), since a drag alone can't be
 * precise.
 *
 * The open form can be controlled from outside (`editing`/`onEditingChange`) so the
 * structure toolbar can open it too; without those props it manages itself.
 *
 * @param {Object} param
 * @param {Element} param.containerEl - the element renderLayoutTree's output is inside
 * @param {Array} param.rows
 * @param {Function} param.onChangeRows
 * @param {Object} [param.editing] - { type: 'row'|'column', rowId, columnId?, rect } or null
 * @param {Function} [param.onEditingChange]
 */
const LayoutResizeOverlay = ({ containerEl = null, rows, onChangeRows, editing: controlledEditing, onEditingChange }) => {
  const measurement = useLayoutMeasurement(containerEl, rows);
  const [ownEditing, setOwnEditing] = useState(null);
  const isControlled = onEditingChange !== undefined;
  const editing = isControlled ? controlledEditing : ownEditing;
  const setEditing = isControlled ? onEditingChange : setOwnEditing;

  const { rows: rowBoxes, columns: columnBoxes } = visibleHandleBoxes(rows, measurement);
  const { rows: rowEntries } = flattenLayout(rows);
  const rowById = Object.fromEntries(rowEntries.map((entry) => [entry.row.id, entry.row]));

  const editingRow = editing ? rowById[editing.rowId] : null;
  const editingColumn = editing?.type === 'column' && editingRow
    ? editingRow.columns.find((column) => column.id === editing.columnId)
    : null;

  return (
    <div className="adminLayoutResizeOverlay">
      {rowBoxes.map((box) => (
        <RowResizeHandle
          key={box.rowId}
          rect={{ ...editAnchorFor('row', box), width: box.width }}
          initialHeight={rowById[box.rowId].height ?? box.height}
          onCommit={(height) => onChangeRows(setRowHeight(rows, box.rowId, height))}
          onClickToEdit={() => setEditing({ type: 'row', rowId: box.rowId, rect: editAnchorFor('row', box) })}
        />
      ))}
      {columnBoxes.map((box) => (
        <ColumnResizeHandle
          key={box.columnId}
          rect={{ ...editAnchorFor('column', box), height: box.height, rowWidth: box.rowWidth }}
          initialWidth={box.width}
          onCommit={(width) => onChangeRows(setColumnWidth(rows, box.rowId, box.columnId, width))}
          onClickToEdit={() => setEditing({
            type: 'column',
            rowId: box.rowId,
            columnId: box.columnId,
            rect: editAnchorFor('column', box)
          })}
        />
      ))}
      {editing && editing.type === 'row' && editingRow && (
        <EditPopup
          key={`row-${editing.rowId}`}
          rect={editing.rect}
          fields={[
            { name: 'height', label: 'Height (px)', value: String(editingRow.height ?? ''), numeric: true },
            { name: 'imageHeight', label: 'Image height (px)', value: String(editingRow.imageHeight ?? ''), numeric: true }
          ]}
          onCommit={(values) => {
            onChangeRows(setRowSize(rows, editing.rowId, {
              height: pxOrUndefined(values.height),
              imageHeight: pxOrUndefined(values.imageHeight)
            }));
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}
      {editing && editing.type === 'column' && editingColumn && (
        <EditPopup
          key={`column-${editing.columnId}`}
          rect={editing.rect}
          fields={[{ name: 'width', label: 'Width', value: editingColumn.width || '' }]}
          onCommit={(values) => {
            onChangeRows(setColumnWidth(rows, editing.rowId, editing.columnId, values.width.trim() || undefined));
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
};

LayoutResizeOverlay.propTypes = {
  containerEl: PropTypes.instanceOf(typeof Element !== 'undefined' ? Element : Object),
  rows: PropTypes.array.isRequired,
  onChangeRows: PropTypes.func.isRequired,
  editing: PropTypes.shape({
    type: PropTypes.oneOf(['row', 'column']).isRequired,
    rowId: PropTypes.string.isRequired,
    columnId: PropTypes.string,
    rect: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number }).isRequired
  }),
  onEditingChange: PropTypes.func
};

export default LayoutResizeOverlay;
