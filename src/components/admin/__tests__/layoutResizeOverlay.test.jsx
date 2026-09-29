import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LayoutResizeOverlay, {
  setRowHeight,
  setRowSize,
  setColumnWidth,
  setColumnWidths,
  visibleHandleBoxes,
  editAnchorFor,
  computeColumnResize,
  canResizeColumn,
  parsePxInput
} from '../layoutResizeOverlay';

const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

// LayoutResizeOverlay finds its handles' positions by measuring the real DOM (the same
// approach layoutClickOverlay.jsx settled on, after a synthetic data-only grid proved
// impossible to align — see the plan). This harness stands in for the real preview:
// LayoutResizeOverlay only needs elements bearing the right data-row-id/data-column-id,
// not any particular rendering of them. It mirrors editableLayoutPreview.jsx's own
// callback-ref-into-state pattern (a plain ref's `.current` isn't populated yet during
// LayoutResizeOverlay's first-mount measurement — see that component's comment).
const Harness = ({ rows, onChangeRows }) => {
  const [containerEl, setContainerEl] = useState(null);
  return (
    <div ref={setContainerEl}>
      {rows.map((row) => (
        <div key={row.id} data-row-id={row.id}>
          {row.columns.map((column) => (
            <div key={column.id} data-column-id={column.id} />
          ))}
        </div>
      ))}
      <LayoutResizeOverlay containerEl={containerEl} rows={rows} onChangeRows={onChangeRows} />
    </div>
  );
};

const rect = (overrides) => ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {}, ...overrides });

// A row 400px wide, 100px tall, with one column filling it (also 400x100) — matches
// the fixture built below for most tests.
const mockRects = ({ rowRect, columnRects = {} } = {}) => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
    if (this.dataset && this.dataset.rowId) return rect(rowRect ?? { top: 0, left: 0, right: 400, bottom: 100, width: 400, height: 100 });
    if (this.dataset && this.dataset.columnId) {
      return rect(columnRects[this.dataset.columnId] ?? { top: 0, left: 0, right: 400, bottom: 100, width: 400, height: 100 });
    }
    // The container itself.
    return rect({ top: 0, left: 0, right: 400, bottom: 100, width: 400, height: 100 });
  });
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('setRowHeight / setColumnWidth', () => {
  const rows = [
    { id: 'row1', height: 300, columns: [{ id: 'col1', width: '50%', children: [tileRef('a')] }] },
    { id: 'row2', height: undefined, columns: [] }
  ];

  it('setRowHeight updates only the matching row', () => {
    const next = setRowHeight(rows, 'row1', 450);
    expect(next[0].height).toBe(450);
    expect(next[1]).toBe(rows[1]);
  });

  it('setColumnWidth updates only the matching column, within the matching row', () => {
    const next = setColumnWidth(rows, 'row1', 'col1', '75%');
    expect(next[0].columns[0].width).toBe('75%');
    expect(next[0].columns[0].children).toBe(rows[0].columns[0].children);
    expect(next[1]).toBe(rows[1]);
  });
});

describe('LayoutResizeOverlay', () => {
  const singleColumnRows = () => [
    { id: 'row1', height: 300, columns: [{ id: 'col1', width: undefined, children: [tileRef('a')] }] }
  ];

  it('renders a row resize handle and a column resize handle', () => {
    mockRects();
    render(<Harness rows={singleColumnRows()} onChangeRows={jest.fn()} />);

    expect(screen.getByRole('separator', { name: /resize this row's height/ })).toBeInTheDocument();
    expect(screen.getByRole('separator', { name: /resize this column's width/ })).toBeInTheDocument();
  });

  it('dragging the row handle down commits a taller height on release, starting from its rendered height', () => {
    // The row renders 100px tall (mockRects), whatever its data says — that's where the
    // line is, so that's what a drag starts from.
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 150 });
    fireEvent.pointerUp(document, { clientY: 150 });

    expect(onChangeRows).toHaveBeenCalledWith(setRowHeight(rows, 'row1', 150));
  });

  it('measures a row\'s height inside its borders, so the committed height puts the edge where it was released', () => {
    // 350px border box = 300px inside + 25px white border top and bottom (row.scss).
    mockRects({ rowRect: { top: 0, left: 0, right: 400, bottom: 350, width: 400, height: 350 } });
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function mockHeight() {
      return this.dataset.rowId ? 300 : 0;
    });
    const onChangeRows = jest.fn();
    const rows = [{ id: 'row1', columns: [{ id: 'col1', children: [] }] }];
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 350 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 410 });
    fireEvent.pointerUp(document, { clientY: 410 });

    expect(onChangeRows).toHaveBeenCalledWith(setRowHeight(rows, 'row1', 360));
  });

  it('shows a live height label while dragging', () => {
    mockRects();
    render(<Harness rows={singleColumnRows()} onChangeRows={jest.fn()} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 160 });

    expect(screen.getByText('160px')).toBeInTheDocument();

    fireEvent.pointerUp(document, { clientY: 160 });
  });

  it('a cancelled drag (the browser taking a touch over as a scroll) commits nothing, and a later tap doesn\'t either', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={singleColumnRows()} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 150 });
    fireEvent.pointerCancel(document);

    expect(screen.queryByText(/px$/)).not.toBeInTheDocument();
    expect(handle.style.transform).toBe('');

    // Before the fix, the drag's listeners outlived the cancel, so this unrelated tap
    // elsewhere "finished" it and committed a bogus height.
    fireEvent.pointerUp(document, { clientY: 0 });
    expect(onChangeRows).not.toHaveBeenCalled();
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
  });

  it('a plain click (no meaningful movement) on the row handle opens the height input instead of resizing', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={singleColumnRows()} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 101 });

    expect(onChangeRows).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Height (px)')).toBeInTheDocument();
  });

  it('typing a height in the click-to-edit input and pressing Enter commits it', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 100 });

    const input = screen.getByLabelText('Height (px)');
    fireEvent.change(input, { target: { value: '500' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChangeRows).toHaveBeenCalledWith(setRowHeight(rows, 'row1', 500));
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
  });

  it('clearing the height input commits undefined (auto height)', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this row's height/ }), { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 100 });

    const input = screen.getByLabelText('Height (px)');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChangeRows).toHaveBeenCalledWith(setRowHeight(rows, 'row1', undefined));
  });

  it('pressing Escape cancels the height edit without committing', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={singleColumnRows()} onChangeRows={onChangeRows} />);

    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this row's height/ }), { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 100 });

    fireEvent.keyDown(screen.getByLabelText('Height (px)'), { key: 'Escape' });

    expect(onChangeRows).not.toHaveBeenCalled();
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
  });

  it('dragging the column handle right commits a wider percentage width on release', () => {
    // Column starts at 200px wide within a 400px-wide row — dragging 40px right should
    // land on (240 / 400) * 100 = 60%.
    mockRects({ columnRects: { col1: { top: 0, left: 0, right: 200, bottom: 100, width: 200, height: 100 } } });
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this column's width/ });
    fireEvent.pointerDown(handle, { clientX: 200 });
    fireEvent.pointerMove(document, { buttons: 1, clientX: 240 });
    fireEvent.pointerUp(document, { clientX: 240 });

    expect(onChangeRows).toHaveBeenCalledWith(setColumnWidth(rows, 'row1', 'col1', '60.0%'));
  });

  it('a plain click on the column handle opens the width input instead of resizing', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={singleColumnRows()} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this column's width/ });
    fireEvent.pointerDown(handle, { clientX: 100 });
    fireEvent.pointerUp(document, { clientX: 100 });

    expect(onChangeRows).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Width')).toBeInTheDocument();
  });

  it('typing a width in the click-to-edit input commits it verbatim', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this column's width/ }), { clientX: 100 });
    fireEvent.pointerUp(document, { clientX: 100 });

    const input = screen.getByLabelText('Width');
    fireEvent.change(input, { target: { value: '33%' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChangeRows).toHaveBeenCalledWith(setColumnWidth(rows, 'row1', 'col1', '33%'));
  });

  it('does not crash and skips stale handles when rows no longer contain their ids (e.g. right after switching pages)', () => {
    mockRects();
    const containerEl = document.createElement('div');
    const { rerender } = render(
      <LayoutResizeOverlay containerEl={containerEl} rows={singleColumnRows()} onChangeRows={jest.fn()} />
    );

    const otherPageRows = [{ id: 'otherRow', height: 200, columns: [] }];
    expect(() => rerender(
      <LayoutResizeOverlay containerEl={containerEl} rows={otherPageRows} onChangeRows={jest.fn()} />
    )).not.toThrow();
  });

  it('renders nothing (no crash) before the container element is available', () => {
    mockRects();
    expect(() => render(
      <LayoutResizeOverlay containerEl={null} rows={singleColumnRows()} onChangeRows={jest.fn()} />
    )).not.toThrow();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });
});

describe('visibleHandleBoxes', () => {
  // row1 [col1: [nested row2 [col2]]] — row2 is 100px tall inside a 300px-tall row1.
  const nestedRows = [
    { id: 'row1', columns: [{ id: 'col1', children: [{ id: 'p', nodeType: 'row', row: { id: 'row2', columns: [{ id: 'col2', children: [] }] } }] }] }
  ];
  const rowBox = (overrides) => ({ depth: 0, parentRowId: null, parentColumnId: null, top: 0, left: 0, width: 400, height: 300, ...overrides });
  const row1 = rowBox({ rowId: 'row1' });
  const col1 = { columnId: 'col1', rowId: 'row1', depth: 0, top: 0, left: 0, width: 400, height: 300 };

  it('keeps a nested row\'s handle when its bottom edge is clear of its parent\'s, innermost first', () => {
    const row2 = rowBox({ rowId: 'row2', depth: 1, parentRowId: 'row1', parentColumnId: 'col1', height: 100 });
    const col2 = { columnId: 'col2', rowId: 'row2', depth: 1, top: 0, left: 0, width: 200, height: 100 };

    const visible = visibleHandleBoxes(nestedRows, { rowBoxes: [row1, row2], columnBoxes: [col1, col2] });
    expect(visible.rows.map((box) => box.rowId)).toEqual(['row2', 'row1']);
    expect(visible.columns.map((box) => box.columnId)).toEqual(['col2', 'col1']);
  });

  it('drops a nested row/column handle that would sit on top of its parent\'s own edge', () => {
    const row2 = rowBox({ rowId: 'row2', depth: 1, parentRowId: 'row1', parentColumnId: 'col1', height: 298 });
    const col2 = { columnId: 'col2', rowId: 'row2', depth: 1, top: 0, left: 0, width: 398, height: 298 };

    const visible = visibleHandleBoxes(nestedRows, { rowBoxes: [row1, row2], columnBoxes: [col1, col2] });
    expect(visible.rows.map((box) => box.rowId)).toEqual(['row1']);
    expect(visible.columns.map((box) => box.columnId)).toEqual(['col1']);
  });

  it('drops boxes for ids no longer in the tree', () => {
    const visible = visibleHandleBoxes([], { rowBoxes: [row1], columnBoxes: [col1] });
    expect(visible).toEqual({ rows: [], columns: [] });
  });
});

describe('editAnchorFor', () => {
  it('anchors a row\'s form at its bottom edge and a column\'s at its right edge', () => {
    const box = { top: 10, left: 20, width: 100, height: 50 };
    expect(editAnchorFor('row', box)).toEqual({ top: 60, left: 20 });
    expect(editAnchorFor('column', box)).toEqual({ top: 10, left: 120 });
  });
});

describe('setRowSize', () => {
  it('sets both height and imageHeight on a nested row', () => {
    const rows = [{ id: 'row1', columns: [{ id: 'col1', children: [{ id: 'p', nodeType: 'row', row: { id: 'row2', columns: [] } }] }] }];
    const next = setRowSize(rows, 'row2', { height: 100, imageHeight: 80 });
    expect(next[0].columns[0].children[0].row).toEqual({ id: 'row2', columns: [], height: 100, imageHeight: 80 });
  });
});

describe('LayoutResizeOverlay — nested rows', () => {
  // A harness rendering one level of nesting: row1 > col1 > row2 > col2.
  const NestedHarness = ({ rows, onChangeRows }) => {
    const [containerEl, setContainerEl] = useState(null);
    return (
      <div ref={setContainerEl}>
        <div data-row-id="row1">
          <div data-column-id="col1">
            <div data-row-id="row2"><div data-column-id="col2" /><div data-column-id="col3" /></div>
          </div>
        </div>
        <LayoutResizeOverlay containerEl={containerEl} rows={rows} onChangeRows={onChangeRows} />
      </div>
    );
  };

  const nestedRows = () => [
    {
      id: 'row1',
      height: 400,
      columns: [{
        id: 'col1',
        children: [{ id: 'p', nodeType: 'row', row: { id: 'row2', height: 150, columns: [{ id: 'col2', children: [] }, { id: 'col3', children: [] }] } }]
      }]
    }
  ];

  beforeEach(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
      const boxes = {
        row1: { top: 0, left: 0, right: 400, bottom: 400, width: 400, height: 400 },
        col1: { top: 0, left: 0, right: 400, bottom: 400, width: 400, height: 400 },
        row2: { top: 0, left: 0, right: 400, bottom: 150, width: 400, height: 150 },
        col2: { top: 0, left: 0, right: 200, bottom: 150, width: 200, height: 150 },
        col3: { top: 0, left: 200, right: 400, bottom: 150, width: 200, height: 150 }
      };
      const id = this.dataset.rowId || this.dataset.columnId;
      return rect(boxes[id] ?? { top: 0, left: 0, right: 400, bottom: 400, width: 400, height: 400 });
    });
  });

  it('gives a nested row its own height handle, which resizes only that nested row', () => {
    const onChangeRows = jest.fn();
    const rows = nestedRows();
    render(<NestedHarness rows={rows} onChangeRows={onChangeRows} />);

    const handles = screen.getAllByRole('separator', { name: /resize this row's height/ });
    expect(handles).toHaveLength(2);

    // Innermost first: handles[0] is row2's.
    fireEvent.pointerDown(handles[0], { clientY: 150 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 200 });
    fireEvent.pointerUp(document, { clientY: 200 });

    expect(onChangeRows).toHaveBeenCalledWith(setRowHeight(rows, 'row2', 200));
    expect(onChangeRows.mock.calls[0][0][0].height).toBe(400);
  });

  it('gives a nested row\'s columns width handles, except the last one (its edge is its parent column\'s)', () => {
    const onChangeRows = jest.fn();
    const rows = nestedRows();
    render(<NestedHarness rows={rows} onChangeRows={onChangeRows} />);

    const handles = screen.getAllByRole('separator', { name: /resize this column's width/ });
    // col2 (nested, clear of col1's right edge) and col1 itself; col3 ends where col1 does.
    expect(handles).toHaveLength(2);

    fireEvent.pointerDown(handles[0], { clientX: 200 });
    fireEvent.pointerMove(document, { buttons: 1, clientX: 300 });
    fireEvent.pointerUp(document, { clientX: 300 });

    // Both nested columns had no width, so both get one: col2 grows by the 100px dragged
    // and col3, to its right, gives up the same.
    expect(onChangeRows).toHaveBeenCalledWith(setColumnWidths(rows, 'row2', { col2: '75.0%', col3: '25.0%' }));
  });
});

describe('LayoutResizeOverlay — the row size form', () => {
  const singleColumnRows = () => [
    { id: 'row1', height: 300, imageHeight: 250, columns: [{ id: 'col1', width: undefined, children: [tileRef('a')] }] }
  ];

  const openRowForm = () => {
    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this row's height/ }), { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 100 });
  };

  it('also edits the row\'s image height, committing both fields together', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);
    openRowForm();

    expect(screen.getByLabelText('Image height (px)')).toHaveValue('250');
    fireEvent.change(screen.getByLabelText('Image height (px)'), { target: { value: '180' } });
    fireEvent.keyDown(screen.getByLabelText('Image height (px)'), { key: 'Enter' });

    expect(onChangeRows).toHaveBeenCalledWith(setRowSize(rows, 'row1', { height: 300, imageHeight: 180 }));
  });

  it('keeps the row\'s current height for a value it can\'t read, rather than clearing it', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);
    openRowForm();

    fireEvent.change(screen.getByLabelText('Height (px)'), { target: { value: 'tall' } });
    fireEvent.keyDown(screen.getByLabelText('Height (px)'), { key: 'Enter' });

    expect(onChangeRows).toHaveBeenCalledWith(setRowSize(rows, 'row1', { height: 300, imageHeight: 250 }));
  });

  it('moving focus between its own fields doesn\'t commit, but leaving the form does', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={singleColumnRows()} onChangeRows={onChangeRows} />);
    openRowForm();

    fireEvent.blur(screen.getByLabelText('Height (px)'), { relatedTarget: screen.getByLabelText('Image height (px)') });
    expect(onChangeRows).not.toHaveBeenCalled();

    fireEvent.blur(screen.getByLabelText('Image height (px)'), { relatedTarget: document.body });
    expect(onChangeRows).toHaveBeenCalledTimes(1);
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
  });

  it('can be opened and closed from outside when controlled', () => {
    mockRects();
    const onEditingChange = jest.fn();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    const containerEl = document.createElement('div');

    const { rerender } = render(
      <LayoutResizeOverlay containerEl={containerEl} rows={rows} onChangeRows={onChangeRows} editing={null} onEditingChange={onEditingChange} />
    );
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();

    rerender(
      <LayoutResizeOverlay
        containerEl={containerEl}
        rows={rows}
        onChangeRows={onChangeRows}
        editing={{ type: 'column', rowId: 'row1', columnId: 'col1', rect: { top: 0, left: 0 } }}
        onEditingChange={onEditingChange}
      />
    );
    fireEvent.keyDown(screen.getByLabelText('Width'), { key: 'Escape' });
    expect(onEditingChange).toHaveBeenCalledWith(null);
    expect(onChangeRows).not.toHaveBeenCalled();
  });
});

describe('computeColumnResize', () => {
  // A 1000px-wide row (inside its borders).
  const box = (contentWidth) => ({ contentWidth, rowContentWidth: 1000 });

  it('with room to spare, grows the column by exactly the drag and shrinks its right-hand neighbour to match', () => {
    const columns = [{ id: 'a', width: '40%' }, { id: 'b', width: '40%' }, { id: 'c', width: '10%' }];
    const boxes = { a: box(400), b: box(400), c: box(100) };

    expect(computeColumnResize({ columns, boxes, index: 0, delta: 50 })).toEqual({ a: '45.0%', b: '35.0%' });
  });

  it('corrects for flexbox shrinking an over-full row, so the edge still lands where it was dragged', () => {
    // "50%" + "50%" plus borders overflow the row, so both render at 95% of what they ask for.
    const columns = [{ id: 'a', width: '50%' }, { id: 'b', width: '50%' }];
    const boxes = { a: box(475), b: box(475) };

    // Moving the rendered edge 95px means asking for 100px more (95 / 0.95).
    expect(computeColumnResize({ columns, boxes, index: 0, delta: 95 })).toEqual({ a: '60.0%', b: '40.0%' });
  });

  it('first gives every column in the row the width it renders at when any has none', () => {
    const columns = [{ id: 'a' }, { id: 'b', width: '30%' }, { id: 'c' }];
    const boxes = { a: box(300), b: box(300), c: box(300) };

    expect(computeColumnResize({ columns, boxes, index: 1, delta: -100 })).toEqual({ a: '30.0%', b: '20.0%', c: '40.0%' });
  });

  it('reads px widths too, and resizes a last column on its own', () => {
    const columns = [{ id: 'a', width: '500px' }];
    expect(computeColumnResize({ columns, boxes: { a: box(500) }, index: 0, delta: -100 })).toEqual({ a: '40.0%' });
  });

  it('never drags a column, or its neighbour, below a minimum width', () => {
    const columns = [{ id: 'a', width: '50%' }, { id: 'b', width: '50%' }];
    const boxes = { a: box(500), b: box(500) };

    expect(computeColumnResize({ columns, boxes, index: 0, delta: -1000 })).toEqual({ a: '2.0%', b: '98.0%' });
    expect(computeColumnResize({ columns, boxes, index: 0, delta: 1000 })).toEqual({ a: '98.0%', b: '2.0%' });
  });
});

describe('canResizeColumn', () => {
  const box = (contentWidth) => ({ contentWidth, rowContentWidth: 1000 });

  it('allows any column but the last', () => {
    expect(canResizeColumn([{ id: 'a', width: '50%' }, { id: 'b', width: '50%' }], { a: box(475), b: box(475) }, 0)).toBe(true);
  });

  it('refuses a last column whose edge is pinned by flexbox shrinking the row', () => {
    expect(canResizeColumn([{ id: 'a', width: '50%' }, { id: 'b', width: '50%' }], { a: box(475), b: box(475) }, 1)).toBe(false);
  });

  it('allows a last column that renders at the width it asks for, or in a row with unsized columns', () => {
    expect(canResizeColumn([{ id: 'a', width: '40%' }, { id: 'b', width: '40%' }], { a: box(400), b: box(400) }, 1)).toBe(true);
    expect(canResizeColumn([{ id: 'a' }, { id: 'b', width: '50%' }], { a: box(475), b: box(475) }, 1)).toBe(true);
    expect(canResizeColumn([{ id: 'a', width: '40%' }], {}, 0)).toBe(true);
  });
});

describe('LayoutResizeOverlay — after a column is removed', () => {
  it('doesn\'t crash on the render that still has the old measurement (positions past the end of the row)', () => {
    // Two sized columns, each 200px wide in a 400px row.
    mockRects({
      columnRects: {
        col1: { top: 0, left: 0, right: 200, bottom: 100, width: 200, height: 100 },
        col2: { top: 0, left: 200, right: 400, bottom: 100, width: 200, height: 100 }
      }
    });
    const twoColumns = [{ id: 'row1', columns: [{ id: 'col1', width: '46%', children: [] }, { id: 'col2', width: '54%', children: [] }] }];
    const { rerender } = render(<Harness rows={twoColumns} onChangeRows={jest.fn()} />);
    expect(screen.getAllByRole('separator', { name: /resize this column's width/ }).length).toBeGreaterThan(0);

    // col1 removed: col2 is now at position 0, but the last measurement still says 1.
    const oneColumn = [{ id: 'row1', columns: [{ id: 'col2', width: '54%', children: [] }] }];
    expect(() => rerender(<Harness rows={oneColumn} onChangeRows={jest.fn()} />)).not.toThrow();
  });
});

describe('LayoutResizeOverlay — the size form when the layout changes under it', () => {
  it('closes, so the values it opened with can\'t later be saved over the change', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = [{ id: 'row1', height: 300, columns: [{ id: 'col1', children: [] }] }];
    const { rerender } = render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this row's height/ }), { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 100 });
    const input = screen.getByLabelText('Height (px)');
    expect(input).toHaveValue('300');

    // e.g. the same line dragged to 400 while the form was open.
    rerender(<Harness rows={[{ ...rows[0], height: 400 }]} onChangeRows={onChangeRows} />);

    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
    fireEvent.blur(input, { relatedTarget: document.body });
    expect(onChangeRows).not.toHaveBeenCalled();
  });

  it('closes a controlled form too, via onEditingChange', () => {
    mockRects();
    const onEditingChange = jest.fn();
    const rows = [{ id: 'row1', columns: [{ id: 'col1', children: [] }] }];
    const containerEl = document.createElement('div');
    const editing = { type: 'row', rowId: 'row1', rect: { top: 0, left: 0 } };
    const { rerender } = render(
      <LayoutResizeOverlay containerEl={containerEl} rows={rows} onChangeRows={jest.fn()} editing={editing} onEditingChange={onEditingChange} />
    );
    expect(onEditingChange).not.toHaveBeenCalled();

    rerender(
      <LayoutResizeOverlay containerEl={containerEl} rows={[...rows]} onChangeRows={jest.fn()} editing={editing} onEditingChange={onEditingChange} />
    );
    expect(onEditingChange).toHaveBeenCalledWith(null);
  });
});

describe('parsePxInput', () => {
  it('reads plain numbers and px values', () => {
    expect(parsePxInput('320', 100)).toBe(320);
    expect(parsePxInput(' 320px ', 100)).toBe(320);
    expect(parsePxInput('320 PX', 100)).toBe(320);
    expect(parsePxInput('12.5', 100)).toBe(12.5);
  });

  it('treats an empty field as a deliberate clear', () => {
    expect(parsePxInput('   ', 100)).toBeUndefined();
  });

  it('keeps the previous value for anything it can\'t read, rather than clearing it', () => {
    expect(parsePxInput('tall', 100)).toBe(100);
    expect(parsePxInput('3O0', 100)).toBe(100);
    expect(parsePxInput('-20', 100)).toBe(100);
    expect(parsePxInput('50%', undefined)).toBeUndefined();
  });
});

describe('LayoutResizeOverlay — typed values', () => {
  const rows = () => [{ id: 'row1', height: 300, imageHeight: 250, columns: [{ id: 'col1', children: [] }] }];
  const openForm = () => {
    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this row's height/ }), { clientY: 100 });
    fireEvent.pointerUp(document, { clientY: 100 });
  };

  it('accepts "320px" as 320, and keeps the old height for something unreadable', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const current = rows();
    render(<Harness rows={current} onChangeRows={onChangeRows} />);
    openForm();

    fireEvent.change(screen.getByLabelText('Height (px)'), { target: { value: '320px' } });
    fireEvent.change(screen.getByLabelText('Image height (px)'), { target: { value: 'big' } });
    fireEvent.keyDown(screen.getByLabelText('Height (px)'), { key: 'Enter' });

    expect(onChangeRows).toHaveBeenCalledWith(setRowSize(current, 'row1', { height: 320, imageHeight: 250 }));
  });
});

describe('LayoutResizeOverlay — which presses drag', () => {
  it('ignores a right-click on a line', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={[{ id: 'row1', height: 300, columns: [{ id: 'col1', children: [] }] }]} onChangeRows={onChangeRows} />);

    fireEvent.pointerDown(screen.getByRole('separator', { name: /resize this row's height/ }), { button: 2, clientY: 100 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 150 });
    fireEvent.pointerUp(document, { clientY: 150 });

    expect(onChangeRows).not.toHaveBeenCalled();
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
  });

  it('drops a drag whose release was never seen (a move with no button held), without committing', () => {
    mockRects();
    const onChangeRows = jest.fn();
    render(<Harness rows={[{ id: 'row1', height: 300, columns: [{ id: 'col1', children: [] }] }]} onChangeRows={onChangeRows} />);
    const handle = screen.getByRole('separator', { name: /resize this row's height/ });

    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerMove(document, { buttons: 1, clientY: 150 });
    fireEvent.pointerMove(document, { buttons: 0, clientY: 160 });
    expect(screen.queryByText(/px$/)).not.toBeInTheDocument();
    expect(handle.style.transform).toBe('');

    // The later click that used to "finish" it now does nothing.
    fireEvent.pointerUp(document, { clientY: 300 });
    expect(onChangeRows).not.toHaveBeenCalled();
  });
});
