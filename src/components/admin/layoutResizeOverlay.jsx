import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Movement below this (px) counts as a click, not a drag — lets the same handle serve
// both "drag to resize" and "click for an exact number" without a separate button.
const DRAG_THRESHOLD = 4;

// Row/column resize is scoped to top-level rows and their direct columns — the same
// boundary drag-and-drop and duplication already draw (see layoutTreeEditor.jsx): a
// nested row (inside a column) has no resize handle of its own here either.
export const setRowHeight = (rows, rowId, height) => rows.map((row) => (row.id === rowId ? { ...row, height } : row));

export const setColumnWidth = (rows, rowId, columnId, width) => rows.map((row) => {
  if (row.id !== rowId) return row;
  return { ...row, columns: row.columns.map((column) => (column.id === columnId ? { ...column, width } : column)) };
});

// Reads the *real* rendered positions of each top-level row/column, the same way
// layoutClickOverlay.jsx resolves clicks — a synthetic grid built from data alone has
// no way to know a row's actual height (most have none set, sized by their image
// content) or match it pixel-for-pixel; measuring the live DOM sidesteps that entirely.
const measureRects = (containerEl, rows) => {
  if (!containerEl) return { rowRects: [], columnRects: [] };
  const containerRect = containerEl.getBoundingClientRect();
  const rowRects = [];
  const columnRects = [];

  rows.forEach((row) => {
    const rowEl = containerEl.querySelector(`[data-row-id="${row.id}"]`);
    if (!rowEl) return;
    const rowRect = rowEl.getBoundingClientRect();
    rowRects.push({
      rowId: row.id,
      top: rowRect.bottom - containerRect.top,
      left: rowRect.left - containerRect.left,
      width: rowRect.width,
      height: rowRect.height
    });

    row.columns.forEach((column) => {
      const columnEl = containerEl.querySelector(`[data-column-id="${column.id}"]`);
      if (!columnEl) return;
      const columnRect = columnEl.getBoundingClientRect();
      columnRects.push({
        rowId: row.id,
        columnId: column.id,
        top: columnRect.top - containerRect.top,
        left: columnRect.right - containerRect.left,
        height: columnRect.height,
        width: columnRect.width,
        rowWidth: rowRect.width
      });
    });
  });

  return { rowRects, columnRects };
};

// Takes the container *element* itself, not a ref object — a mutable ref's `.current`
// isn't safe to read here: React attaches a parent host div's ref only after processing
// that div's children's own commit-phase work, so on first mount this component's own
// layout effect would run before containerRef.current is populated, silently measuring
// nothing until the next window resize. The caller (editableLayoutPreview.jsx) tracks the
// container in state via a callback ref instead, so this effect re-runs, correctly, the
// moment the real element becomes available.
const useMeasuredRects = (containerEl, rows) => {
  const [rects, setRects] = useState({ rowRects: [], columnRects: [] });

  useLayoutEffect(() => {
    const remeasure = () => setRects(measureRects(containerEl, rows));
    remeasure();
    window.addEventListener('resize', remeasure);
    return () => window.removeEventListener('resize', remeasure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerEl, rows]);

  return rects;
};

// Shared drag logic for both handle orientations: tracks pointer movement along one
// axis, moves the handle's own line to follow the cursor (imperative — no re-render per
// pointermove) for live feedback without resizing anything until release, then either
// commits the final value (a real drag) or opens the number-input fallback (a click).
const useDragHandle = ({ axis, initialValue, onCommit, onClickToEdit }) => {
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

    const handleUp = (upEvent) => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      if (lineRef.current) lineRef.current.style.transform = '';
      setLiveValue(null);

      if (moved) {
        const pos = axis === 'y' ? upEvent.clientY : upEvent.clientX;
        onCommit(pos - startPos);
      } else {
        onClickToEdit();
      }
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
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
  const { lineRef, liveValue, onPointerDown } = useDragHandle({
    axis: 'x',
    onCommit: (delta) => {
      const percent = Math.max(5, Math.min(100, ((initialWidth + delta) / rect.rowWidth) * 100));
      onCommit(`${percent.toFixed(1)}%`);
    },
    onClickToEdit
  });

  const liveWidth = liveValue !== null ? Math.max(5, Math.min(100, ((initialWidth + liveValue) / rect.rowWidth) * 100)) : null;

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
      {liveWidth !== null && <span className="adminLayoutResize-label">{liveWidth.toFixed(0)}%</span>}
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

const EditPopup = ({ rect, label, value, onCommit, onCancel }) => {
  const [draft, setDraft] = useState(value);

  const commit = () => onCommit(draft);

  return (
    <div className="adminLayoutResize-edit" style={{ top: rect.top, left: rect.left }}>
      <label>
        {label}
        <input
          type="text"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') onCancel();
          }}
          onBlur={commit}
        />
      </label>
    </div>
  );
};

EditPopup.propTypes = {
  rect: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number }).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onCommit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

/**
 * @description Drag lines overlaid on the live preview for resizing a top-level row's
 * height or one of its direct columns' width — an alternative to the number/text inputs
 * in layoutTreeEditor.jsx (which stay in place; this doesn't replace them, just offers a
 * faster, more direct way to do the same edit). Clicking a line instead of dragging it
 * opens a small inline input for typing an exact value, since a drag alone can't be
 * precise.
 *
 * @param {Object} param
 * @param {Element} param.containerEl - the element renderLayoutTree's output is inside
 * @param {Array} param.rows
 * @param {Function} param.onChangeRows
 */
const LayoutResizeOverlay = ({ containerEl = null, rows, onChangeRows }) => {
  const { rowRects, columnRects } = useMeasuredRects(containerEl, rows);
  const [editing, setEditing] = useState(null);

  const rowById = Object.fromEntries(rows.map((row) => [row.id, row]));

  // Measuring happens in an effect that fires *after* render, so for one frame after
  // `rows` changes to a different tree entirely (switching pages, e.g.) the previous
  // page's rects can still be around, pointing at row/column ids this page doesn't
  // have — filtering them out here avoids crashing on that one stale frame rather than
  // trying to keep the effect perfectly synchronous with every possible prop change.
  const validRowRects = rowRects.filter((rect) => rowById[rect.rowId]);
  const validColumnRects = columnRects.filter(
    (rect) => rowById[rect.rowId]?.columns.some((column) => column.id === rect.columnId)
  );
  const editingRow = editing ? rowById[editing.rowId] : null;
  const editingColumn = editing?.type === 'column' && editingRow
    ? editingRow.columns.find((column) => column.id === editing.columnId)
    : null;

  return (
    <div className="adminLayoutResizeOverlay">
      {validRowRects.map((rect) => (
        <RowResizeHandle
          key={rect.rowId}
          rect={rect}
          initialHeight={rowById[rect.rowId].height ?? rect.height}
          onCommit={(height) => onChangeRows(setRowHeight(rows, rect.rowId, height))}
          onClickToEdit={() => setEditing({ type: 'row', rowId: rect.rowId, rect })}
        />
      ))}
      {validColumnRects.map((rect) => (
        <ColumnResizeHandle
          key={rect.columnId}
          rect={rect}
          initialWidth={rect.width}
          onCommit={(width) => onChangeRows(setColumnWidth(rows, rect.rowId, rect.columnId, width))}
          onClickToEdit={() => setEditing({ type: 'column', rowId: rect.rowId, columnId: rect.columnId, rect })}
        />
      ))}
      {editing && editing.type === 'row' && editingRow && (
        <EditPopup
          rect={editing.rect}
          label="Height (px)"
          value={String(editingRow.height ?? '')}
          onCommit={(value) => {
            const height = value.trim() === '' ? undefined : Number(value);
            onChangeRows(setRowHeight(rows, editing.rowId, Number.isNaN(height) ? undefined : height));
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}
      {editing && editing.type === 'column' && editingColumn && (
        <EditPopup
          rect={editing.rect}
          label="Width"
          value={editingColumn.width || ''}
          onCommit={(value) => {
            onChangeRows(setColumnWidth(rows, editing.rowId, editing.columnId, value.trim() || undefined));
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
  onChangeRows: PropTypes.func.isRequired
};

export default LayoutResizeOverlay;
