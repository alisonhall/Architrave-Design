import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LayoutResizeOverlay, { setRowHeight, setColumnWidth } from '../layoutResizeOverlay';

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

  it('dragging the row handle down commits a taller height on release', () => {
    mockRects();
    const onChangeRows = jest.fn();
    const rows = singleColumnRows();
    render(<Harness rows={rows} onChangeRows={onChangeRows} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerMove(document, { clientY: 150 });
    fireEvent.pointerUp(document, { clientY: 150 });

    expect(onChangeRows).toHaveBeenCalledWith(setRowHeight(rows, 'row1', 350));
  });

  it('shows a live height label while dragging', () => {
    mockRects();
    render(<Harness rows={singleColumnRows()} onChangeRows={jest.fn()} />);

    const handle = screen.getByRole('separator', { name: /resize this row's height/ });
    fireEvent.pointerDown(handle, { clientY: 100 });
    fireEvent.pointerMove(document, { clientY: 160 });

    expect(screen.getByText('360px')).toBeInTheDocument();

    fireEvent.pointerUp(document, { clientY: 160 });
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
    fireEvent.pointerMove(document, { clientX: 240 });
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
