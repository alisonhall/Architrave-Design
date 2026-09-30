import React, { useState } from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import LayoutStructureOverlay, { placeToolbars, TOOLBAR_HEIGHT } from '../layoutStructureOverlay';
import { findRowById, findColumnById } from '../layoutHelpers';

const rect = (overrides) => ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {}, ...overrides });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

// row1 (400x300) [col1 (200 wide): [tile a, nested row2 [col3]], col2 (200 wide): [tile b]]
// row4 (400x100) [col4]
const makeRows = () => [
  {
    id: 'row1',
    columns: [
      { id: 'col1', children: [tileRef('p1', 'a'), { id: 'p2', nodeType: 'row', row: { id: 'row2', columns: [{ id: 'col3', children: [] }] } }] },
      { id: 'col2', children: [tileRef('p3', 'b')] }
    ]
  },
  { id: 'row4', columns: [{ id: 'col4', children: [] }] }
];

const BOXES = {
  row1: { top: 0, left: 0, width: 400, height: 300 },
  col1: { top: 0, left: 0, width: 200, height: 300 },
  row2: { top: 150, left: 0, width: 200, height: 150 },
  col3: { top: 150, left: 0, width: 200, height: 150 },
  col2: { top: 0, left: 200, width: 200, height: 300 },
  row4: { top: 300, left: 0, width: 400, height: 100 },
  col4: { top: 300, left: 0, width: 400, height: 100 }
};

// Stands in for the real preview: LayoutStructureOverlay only needs elements bearing the
// right data-row-id/data-column-id to measure, not any particular rendering of them.
const Harness = ({ rows, onChangeRows, onEditSize = jest.fn() }) => {
  const [containerEl, setContainerEl] = useState(null);
  const ids = Object.keys(BOXES);
  return (
    <div ref={setContainerEl}>
      {ids.map((id) => (id.startsWith('row')
        ? <div key={id} data-row-id={id} />
        : <div key={id} data-column-id={id} />))}
      <LayoutStructureOverlay containerEl={containerEl} rows={rows} onChangeRows={onChangeRows} onEditSize={onEditSize} />
    </div>
  );
};

beforeEach(() => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
    const id = this.dataset.rowId || this.dataset.columnId;
    return rect(BOXES[id] ?? { top: 0, left: 0, width: 400, height: 400 });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const rowToolbar = (container, rowId) => container.querySelector(`[data-row-toolbar="${rowId}"]`);
const columnToolbar = (container, columnId) => container.querySelector(`[data-column-toolbar="${columnId}"]`);

const choose = (toolbar, menuLabel, itemLabel) => {
  fireEvent.click(within(toolbar).getByRole('button', { name: menuLabel }));
  fireEvent.click(within(toolbar).getByRole('menuitem', { name: itemLabel }));
};

describe('placeToolbars', () => {
  it('puts a row\'s toolbar at its top-left and a column\'s at its top-right, outer levels first', () => {
    const placed = placeToolbars(
      [{ rowId: 'r', depth: 0, top: 0, left: 0, width: 800, height: 100 }],
      [{ columnId: 'c', depth: 0, top: 0, left: 0, width: 800, height: 100 }]
    );
    expect(placed.map(({ kind, top }) => [kind, top])).toEqual([['row', 0], ['column', 0]]);
  });

  it('nudges a toolbar that would overlap one already placed down below it', () => {
    const placed = placeToolbars(
      [
        { rowId: 'outer', depth: 0, top: 0, left: 0, width: 150, height: 300 },
        { rowId: 'inner', depth: 1, top: 0, left: 0, width: 150, height: 100 }
      ],
      [{ columnId: 'c', depth: 0, top: 0, left: 0, width: 150, height: 300 }]
    );

    const topOf = (predicate) => placed.find(predicate).top;
    expect(topOf((t) => t.box.rowId === 'outer')).toBe(0);
    // The column's toolbar (150px wide column, 136px toolbar) overlaps the row's at the
    // top-left, so it steps down once; the nested row's then clears both.
    expect(topOf((t) => t.box.columnId === 'c')).toBe(TOOLBAR_HEIGHT + 2);
    expect(topOf((t) => t.box.rowId === 'inner')).toBe(2 * (TOOLBAR_HEIGHT + 2));
  });

  it('returns nothing for nothing', () => {
    expect(placeToolbars([], [])).toEqual([]);
  });
});

describe('LayoutStructureOverlay', () => {
  it('renders a toolbar for every row (nested included) and every column', () => {
    const { container } = render(<Harness rows={makeRows()} onChangeRows={jest.fn()} />);

    ['row1', 'row2', 'row4'].forEach((id) => expect(rowToolbar(container, id)).toBeInTheDocument());
    ['col1', 'col2', 'col3', 'col4'].forEach((id) => expect(columnToolbar(container, id)).toBeInTheDocument());

    expect(within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Row ▾' })).toBeInTheDocument();
    expect(within(rowToolbar(container, 'row2')).getByRole('button', { name: 'Nested row ▾' })).toBeInTheDocument();
  });

  it('only top-level rows, and columns with siblings, get a drag handle', () => {
    const { container } = render(<Harness rows={makeRows()} onChangeRows={jest.fn()} />);

    expect(within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' })).toBeInTheDocument();
    expect(within(rowToolbar(container, 'row2')).queryByRole('button', { name: 'Drag to reorder' })).not.toBeInTheDocument();
    expect(within(columnToolbar(container, 'col1')).getByRole('button', { name: 'Drag to reorder' })).toBeInTheDocument();
    expect(within(columnToolbar(container, 'col4')).queryByRole('button', { name: 'Drag to reorder' })).not.toBeInTheDocument();
  });

  it('ignores measured nodes whose ids are no longer in the tree', () => {
    const { container, rerender } = render(<Harness rows={makeRows()} onChangeRows={jest.fn()} />);
    rerender(<Harness rows={[makeRows()[1]]} onChangeRows={jest.fn()} />);
    expect(rowToolbar(container, 'row1')).not.toBeInTheDocument();
    expect(rowToolbar(container, 'row4')).toBeInTheDocument();
  });

  describe('row menu', () => {
    it('moves a top-level row down, with Move up disabled for the first', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      fireEvent.click(within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Row ▾' }));
      expect(screen.getByRole('menuitem', { name: 'Move up' })).toBeDisabled();
      fireEvent.click(screen.getByRole('menuitem', { name: 'Move down' }));

      expect(onChangeRows.mock.calls[0][0].map((row) => row.id)).toEqual(['row4', 'row1']);
    });

    it('moves a top-level row up, with Move down disabled for the last', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      fireEvent.click(within(rowToolbar(container, 'row4')).getByRole('button', { name: 'Row ▾' }));
      expect(screen.getByRole('menuitem', { name: 'Move down' })).toBeDisabled();
      fireEvent.click(screen.getByRole('menuitem', { name: 'Move up' }));

      expect(onChangeRows.mock.calls[0][0].map((row) => row.id)).toEqual(['row4', 'row1']);
    });

    it('moves a nested row among its column\'s children', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(rowToolbar(container, 'row2'), 'Nested row ▾', 'Move up');

      expect(findColumnById(onChangeRows.mock.calls[0][0], 'col1').children.map((child) => child.id)).toEqual(['p2', 'p1']);
    });

    it('duplicates a row right after itself, with fresh ids', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(rowToolbar(container, 'row1'), 'Row ▾', 'Duplicate row');

      const next = onChangeRows.mock.calls[0][0];
      expect(next).toHaveLength(3);
      expect(next[1].id).not.toBe('row1');
      expect(next[1].columns).toHaveLength(2);
    });

    it('duplicates a nested row within its column', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(rowToolbar(container, 'row2'), 'Nested row ▾', 'Duplicate row');

      const children = findColumnById(onChangeRows.mock.calls[0][0], 'col1').children;
      expect(children).toHaveLength(3);
      expect(children[2].nodeType).toBe('row');
      expect(children[2].row.id).not.toBe('row2');
    });

    it('adds a blank column to a row', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(rowToolbar(container, 'row2'), 'Nested row ▾', 'Add column');

      const columns = findRowById(onChangeRows.mock.calls[0][0], 'row2').columns;
      expect(columns).toHaveLength(2);
      expect(columns[1].children).toEqual([]);
    });

    it('asks to open the size form, anchored at the row\'s bottom edge', () => {
      const onEditSize = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={jest.fn()} onEditSize={onEditSize} />);

      choose(rowToolbar(container, 'row2'), 'Nested row ▾', 'Edit size…');

      expect(onEditSize).toHaveBeenCalledWith({ type: 'row', rowId: 'row2', rect: { top: 300, left: 0 } });
    });

    it('removes a row, top-level or nested, after confirming', () => {
      window.confirm = jest.fn(() => true);
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(rowToolbar(container, 'row4'), 'Row ▾', 'Remove row');
      expect(window.confirm).toHaveBeenLastCalledWith(expect.stringContaining('Remove this row and everything in it?'));
      expect(onChangeRows.mock.calls[0][0].map((row) => row.id)).toEqual(['row1']);

      choose(rowToolbar(container, 'row2'), 'Nested row ▾', 'Remove row');
      expect(window.confirm).toHaveBeenLastCalledWith(expect.stringContaining('Remove this nested row'));
      expect(findRowById(onChangeRows.mock.calls[1][0], 'row2')).toBeNull();
    });

    it('leaves the row in place when the confirmation is declined', () => {
      window.confirm = jest.fn(() => false);
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(rowToolbar(container, 'row4'), 'Row ▾', 'Remove row');

      expect(window.confirm).toHaveBeenCalled();
      expect(onChangeRows).not.toHaveBeenCalled();
    });
  });

  describe('column menu', () => {
    it('moves a column right, and left, within its row', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      fireEvent.click(within(columnToolbar(container, 'col1')).getByRole('button', { name: 'Column ▾' }));
      expect(screen.getByRole('menuitem', { name: 'Move left' })).toBeDisabled();
      fireEvent.click(screen.getByRole('menuitem', { name: 'Move right' }));
      expect(onChangeRows.mock.calls[0][0][0].columns.map((column) => column.id)).toEqual(['col2', 'col1']);

      fireEvent.click(within(columnToolbar(container, 'col2')).getByRole('button', { name: 'Column ▾' }));
      expect(screen.getByRole('menuitem', { name: 'Move right' })).toBeDisabled();
      fireEvent.click(screen.getByRole('menuitem', { name: 'Move left' }));
      expect(onChangeRows.mock.calls[1][0][0].columns.map((column) => column.id)).toEqual(['col2', 'col1']);
    });

    it('duplicates a column right after itself, with fresh ids', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(columnToolbar(container, 'col2'), 'Column ▾', 'Duplicate column');

      const columns = onChangeRows.mock.calls[0][0][0].columns;
      expect(columns).toHaveLength(3);
      expect(columns[2].id).not.toBe('col2');
      expect(columns[2].children[0].tileKey).toBe('b');
    });

    it.each([
      ['Add tile', { nodeType: 'tileRef', tileKey: '' }],
      ['Add nested row', { nodeType: 'row' }],
      ['Add empty placeholder', { nodeType: 'empty' }]
    ])('%s appends that kind of placement to the column', (label, expected) => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(columnToolbar(container, 'col3'), 'Column ▾', label);

      const children = findColumnById(onChangeRows.mock.calls[0][0], 'col3').children;
      expect(children).toHaveLength(1);
      expect(children[0]).toMatchObject(expected);
    });

    it('asks to open the width form, anchored at the column\'s right edge', () => {
      const onEditSize = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={jest.fn()} onEditSize={onEditSize} />);

      choose(columnToolbar(container, 'col1'), 'Column ▾', 'Edit width…');

      expect(onEditSize).toHaveBeenCalledWith({ type: 'column', rowId: 'row1', columnId: 'col1', rect: { top: 0, left: 200 } });
    });

    it('removes a column after confirming', () => {
      window.confirm = jest.fn(() => true);
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(columnToolbar(container, 'col1'), 'Column ▾', 'Remove column');

      expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Remove this column and everything in it?'));
      expect(onChangeRows.mock.calls[0][0][0].columns.map((column) => column.id)).toEqual(['col2']);
    });

    it('leaves the column in place when the confirmation is declined', () => {
      window.confirm = jest.fn(() => false);
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);

      choose(columnToolbar(container, 'col1'), 'Column ▾', 'Remove column');

      expect(onChangeRows).not.toHaveBeenCalled();
    });
  });

  describe('drag to reorder', () => {
    // The container measures at (0, 0), so these client coordinates are also positions
    // within the BOXES layout above.
    const drag = (handle, from, to, { release = true } = {}) => {
      fireEvent.pointerDown(handle, { clientX: from[0], clientY: from[1] });
      fireEvent.pointerMove(document, { buttons: 1, clientX: to[0], clientY: to[1] });
      if (release) fireEvent.pointerUp(document, { clientX: to[0], clientY: to[1] });
    };

    it('dragging a top-level row shows a zone on each top-level row, highlights the one under the pointer, and dropping reorders', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' });

      expect(screen.queryAllByTestId('layout-drop-zone')).toHaveLength(0);
      drag(handle, [5, 5], [50, 350], { release: false });

      const zones = screen.getAllByTestId('layout-drop-zone');
      expect(zones).toHaveLength(2);
      expect(zones[0]).toHaveClass('adminLayoutStructure-dropZone--source');
      expect(zones[1]).toHaveClass('adminLayoutStructure-dropZone--over');

      fireEvent.pointerUp(document, { clientX: 50, clientY: 350 });
      expect(onChangeRows.mock.calls[0][0].map((row) => row.id)).toEqual(['row4', 'row1']);
      expect(screen.queryAllByTestId('layout-drop-zone')).toHaveLength(0);
    });

    it('dragging a column onto its sibling reorders that row\'s columns', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(columnToolbar(container, 'col2')).getByRole('button', { name: 'Drag to reorder' });

      drag(handle, [390, 5], [50, 50]);

      expect(onChangeRows.mock.calls[0][0][0].columns.map((column) => column.id)).toEqual(['col2', 'col1']);
    });

    it('does nothing when released over its own spot, or outside every sibling', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' });

      drag(handle, [5, 5], [50, 50]);
      drag(handle, [5, 5], [50, 900]);

      expect(onChangeRows).not.toHaveBeenCalled();
    });

    it('a cancelled drag clears its drop zones and reorders nothing, even on a later tap', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' });

      drag(handle, [5, 5], [50, 350], { release: false });
      expect(screen.getAllByTestId('layout-drop-zone')).toHaveLength(2);

      fireEvent.pointerCancel(document);
      expect(screen.queryAllByTestId('layout-drop-zone')).toHaveLength(0);

      fireEvent.pointerUp(document, { clientX: 50, clientY: 350 });
      expect(onChangeRows).not.toHaveBeenCalled();
    });

    it('ignores a right-click on a drag handle', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' });

      fireEvent.pointerDown(handle, { button: 2, clientX: 5, clientY: 5 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 50, clientY: 350 });
      expect(screen.queryAllByTestId('layout-drop-zone')).toHaveLength(0);
      fireEvent.pointerUp(document, { clientX: 50, clientY: 350 });

      expect(onChangeRows).not.toHaveBeenCalled();
    });

    it('drops a drag whose release was never seen, so a later click can\'t reorder', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' });

      drag(handle, [5, 5], [50, 350], { release: false });
      expect(screen.getAllByTestId('layout-drop-zone')).toHaveLength(2);

      fireEvent.pointerMove(document, { buttons: 0, clientX: 60, clientY: 360 });
      expect(screen.queryAllByTestId('layout-drop-zone')).toHaveLength(0);

      fireEvent.pointerUp(document, { clientX: 50, clientY: 350 });
      expect(onChangeRows).not.toHaveBeenCalled();
    });

    it('a press-and-release without real movement is not a drag', () => {
      const onChangeRows = jest.fn();
      const { container } = render(<Harness rows={makeRows()} onChangeRows={onChangeRows} />);
      const handle = within(rowToolbar(container, 'row1')).getByRole('button', { name: 'Drag to reorder' });

      fireEvent.pointerDown(handle, { clientX: 5, clientY: 5 });
      fireEvent.pointerMove(document, { buttons: 1, clientX: 6, clientY: 6 });
      expect(screen.queryAllByTestId('layout-drop-zone')).toHaveLength(0);
      // Released straight over another row: still not a drag, since it never moved.
      fireEvent.pointerUp(document, { clientX: 50, clientY: 350 });

      expect(onChangeRows).not.toHaveBeenCalled();
    });
  });

  it('renders nothing before the container element is available', () => {
    const { container } = render(
      <LayoutStructureOverlay containerEl={null} rows={makeRows()} onChangeRows={jest.fn()} onEditSize={jest.fn()} />
    );
    expect(container.querySelectorAll('.adminLayoutStructure-toolbar')).toHaveLength(0);
  });
});
