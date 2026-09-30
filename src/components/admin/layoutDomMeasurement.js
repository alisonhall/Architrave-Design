import { useLayoutEffect, useState } from 'react';

import { flattenLayout } from './layoutHelpers';

const EMPTY = { rowBoxes: [], columnBoxes: [] };

/**
 * @description Measures where every row and column of a layout tree — nested rows
 * included, at any depth — actually rendered inside the live preview, relative to the
 * preview's own container. This is the one DOM-reading implementation behind every
 * preview overlay (drag-to-resize, and the row/column structure toolbars): a synthetic
 * grid rebuilt from data alone has no way to know a row's real height (most have none
 * set, sized by their image content), so each overlay positions itself from these
 * measurements instead. Row/Column (rowHOC.jsx/columnHOC.jsx) stamp their editor-only
 * ids onto their divs as `data-row-id`/`data-column-id`, which is what's looked up here.
 *
 * Each box carries the structural metadata from flattenLayout (layoutHelpers.js) too —
 * `depth`, `topLevel`, sibling `index`/`siblingCount`, parent ids — so an overlay can
 * decide what a given row/column's controls should offer without walking the tree
 * again. A row/column with no id, or with no matching element (not rendered yet, e.g.),
 * is simply left out.
 *
 * @param {Element} containerEl
 * @param {Array} rows
 * @returns {{ rowBoxes: Array, columnBoxes: Array }} boxes with `top`/`left`/`width`/
 * `height` (border box) and `contentWidth`/`contentHeight` (inside the borders), in px
 * relative to `containerEl`; column boxes also carry their parent row's
 * `rowContentWidth` (what a column's percentage width is actually a percentage of)
 */
export const measureLayout = (containerEl, rows) => {
  if (!containerEl) return EMPTY;
  const containerRect = containerEl.getBoundingClientRect();
  // `width`/`height` are the full border box (where the edge — and so its resize line —
  // actually is); `contentWidth`/`contentHeight` exclude borders. The two differ by a
  // lot here: every row and column carries 25px white borders as its gutters (see
  // row.scss/column.scss), while a row's `height` and a column's `width` in the data
  // only size the inside. (clientWidth/Height read 0 for something with no layout box
  // of its own, so fall back to the border box then.)
  const boxOf = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top - containerRect.top,
      left: rect.left - containerRect.left,
      width: rect.width,
      height: rect.height,
      contentWidth: el.clientWidth || rect.width,
      contentHeight: el.clientHeight || rect.height
    };
  };

  const { rows: rowEntries, columns: columnEntries } = flattenLayout(rows);

  const rowBoxes = [];
  const rowBoxById = {};
  rowEntries.forEach(({ row, ...meta }) => {
    const el = row.id ? containerEl.querySelector(`[data-row-id="${row.id}"]`) : null;
    if (!el) return;
    const box = { rowId: row.id, ...meta, ...boxOf(el) };
    rowBoxes.push(box);
    rowBoxById[row.id] = box;
  });

  const columnBoxes = [];
  columnEntries.forEach(({ column, ...meta }) => {
    const el = column.id ? containerEl.querySelector(`[data-column-id="${column.id}"]`) : null;
    if (!el) return;
    const parentRowBox = rowBoxById[meta.rowId];
    const box = boxOf(el);
    columnBoxes.push({
      columnId: column.id,
      ...meta,
      ...box,
      rowContentWidth: parentRowBox ? parentRowBox.contentWidth : box.contentWidth
    });
  });

  return { rowBoxes, columnBoxes };
};

/**
 * @description Keeps measureLayout's result current: re-measures whenever the tree
 * changes, the window resizes, or (where ResizeObserver exists — every real browser,
 * not jsdom) the preview or any row/column in it changes size, e.g. once a late-loading
 * image settles a row's height.
 *
 * Takes the container *element* itself, not a ref object — a mutable ref's `.current`
 * isn't safe to read here: React attaches a parent host div's ref only after processing
 * that div's children's own commit-phase work, so on first mount this effect would run
 * before containerRef.current is populated, silently measuring nothing. The caller
 * (editableLayoutPreview.jsx) tracks the container in state via a callback ref instead,
 * so this re-runs, correctly, the moment the real element becomes available.
 *
 * @param {Element} containerEl
 * @param {Array} rows
 */
export const useLayoutMeasurement = (containerEl, rows) => {
  const [measurement, setMeasurement] = useState(EMPTY);

  useLayoutEffect(() => {
    const remeasure = () => setMeasurement(measureLayout(containerEl, rows));
    remeasure();
    window.addEventListener('resize', remeasure);

    // Every row and column, not just the preview as a whole: plenty of changes resize
    // one without changing the preview's outer size — a tile's content edited so a
    // column with no width set renders wider, say — and no other trigger here would
    // notice. (Observing each one also catches the preview's own size changing, since
    // anything that does resizes some row.)
    let observer = null;
    if (containerEl && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(remeasure);
      observer.observe(containerEl);
      containerEl.querySelectorAll('[data-row-id], [data-column-id]').forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener('resize', remeasure);
      if (observer) observer.disconnect();
    };
  }, [containerEl, rows]);

  return measurement;
};
