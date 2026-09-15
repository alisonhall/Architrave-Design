import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import LayoutTreeEditor from '../layoutTreeEditor';
import { makeBlankRow, makeBlankColumn, makeTilePlacement } from '../layoutHelpers';

const tiles = { tileA: { kind: 'project', projectKey: 'a' }, tileB: { kind: 'project', projectKey: 'b' } };

const rowWithOneColumnAndTile = (tileKey) => {
  const column = { ...makeBlankColumn(), children: [makeTilePlacement(tileKey)] };
  return { ...makeBlankRow(), columns: [column] };
};

// Row/column/placement controls are consolidated into one ActionsMenu each (see
// actionsMenu.jsx) — open the menu that belongs to a specific header/placement element,
// scoped with :scope so it doesn't also match a nested row's own menu, then choose an item.
const openMenuIn = (containerEl) => fireEvent.click(within(containerEl).getByRole('button', { name: 'Actions ▾' }));
const rowHeaderEl = (index) => document.querySelectorAll('.adminLayoutTree > .adminLayoutTree-row > .adminLayoutTree-rowHeader')[index];

describe('LayoutTreeEditor', () => {
  it('renders an empty tree with just an Add row button', () => {
    render(<LayoutTreeEditor rows={[]} onChange={jest.fn()} tiles={tiles} />);

    expect(screen.getByRole('button', { name: 'Add row' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
  });

  it('adds a blank row', () => {
    const onChange = jest.fn();
    render(<LayoutTreeEditor rows={[]} onChange={onChange} tiles={tiles} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add row' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    const [newRows] = onChange.mock.calls[0];
    expect(newRows).toHaveLength(1);
    expect(newRows[0].columns).toEqual([]);
  });

  it('updates a row height', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    fireEvent.change(screen.getByLabelText('Height (px)'), { target: { value: '400' } });

    expect(onChange).toHaveBeenCalledWith([{ ...rows[0], height: 400 }]);
  });

  it('adds a column to a row', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add column' }));

    const [newRows] = onChange.mock.calls[0];
    expect(newRows[0].columns).toHaveLength(2);
  });

  it('removes a row', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    openMenuIn(rowHeaderEl(0));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Remove row' }));

    expect(onChange).toHaveBeenCalledWith([rows[1]]);
  });

  it('moves a row down', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    openMenuIn(rowHeaderEl(0));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Move down' }));

    expect(onChange).toHaveBeenCalledWith([rows[1], rows[0]]);
  });

  it('disables "Move up" on the first row and "Move down" on the last row', () => {
    const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
    render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

    openMenuIn(rowHeaderEl(0));
    openMenuIn(rowHeaderEl(1));

    expect(screen.getAllByRole('menuitem', { name: 'Move up' })[0]).toBeDisabled();
    expect(screen.getAllByRole('menuitem', { name: 'Move down' })[1]).toBeDisabled();
  });

  it('changes a tile placement selection', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'tileB' } });

    const [newRows] = onChange.mock.calls[0];
    expect(newRows[0].columns[0].children[0].tileKey).toBe('tileB');
  });

  it('adds a nested row inside a column', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add nested row' }));

    const [newRows] = onChange.mock.calls[0];
    expect(newRows[0].columns[0].children).toHaveLength(2);
    expect(newRows[0].columns[0].children[1].nodeType).toBe('row');
  });

  it('renders a nested row with its own controls', () => {
    const nestedRow = rowWithOneColumnAndTile('tileB');
    const outerColumn = { ...makeBlankColumn(), children: [{ id: 'nested', nodeType: 'row', row: nestedRow }] };
    const rows = [{ ...makeBlankRow(), columns: [outerColumn] }];

    render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

    expect(within(document.body).getAllByRole('combobox')).toHaveLength(1);
  });

  describe('collapsing', () => {
    it('starts expanded, showing the row\'s fields and its columns', () => {
      const rows = [rowWithOneColumnAndTile('tileA')];
      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      expect(screen.getByLabelText('Height (px)')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('collapsing a row hides its fields and columns, showing a summary instead', () => {
      const rows = [rowWithOneColumnAndTile('tileA')];
      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      fireEvent.click(screen.getAllByRole('button', { name: '▾' })[0]);

      expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      expect(screen.getByText('Row — 1 column')).toBeInTheDocument();
    });

    it('expanding a collapsed row restores its fields and columns', () => {
      const rows = [rowWithOneColumnAndTile('tileA')];
      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      const [rowToggle] = screen.getAllByRole('button', { name: '▾' });
      fireEvent.click(rowToggle);
      fireEvent.click(screen.getByRole('button', { name: '▸' }));

      expect(screen.getByLabelText('Height (px)')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('collapsing a row does not affect its own data — a re-render still reflects the underlying rows prop', () => {
      const onChange = jest.fn();
      const rows = [rowWithOneColumnAndTile('tileA')];
      render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

      fireEvent.click(screen.getAllByRole('button', { name: '▾' })[0]);
      openMenuIn(rowHeaderEl(0));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Remove row' }));

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('collapsing a column hides its width field and children, showing a summary instead', () => {
      const rows = [rowWithOneColumnAndTile('tileA')];
      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      const columnToggle = screen.getAllByRole('button', { name: '▾' })[1];
      fireEvent.click(columnToggle);

      expect(screen.queryByLabelText(/Width/)).not.toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      expect(screen.getByText('Column — 1 item')).toBeInTheDocument();
    });

    it('collapsing a row does not collapse its columns independently — collapsing and re-expanding a row keeps its columns expanded', () => {
      const rows = [rowWithOneColumnAndTile('tileA')];
      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      const [rowToggle] = screen.getAllByRole('button', { name: '▾' });
      fireEvent.click(rowToggle);
      fireEvent.click(screen.getByRole('button', { name: '▸' }));

      // The column itself was never toggled, so it should still show its own fields.
      expect(screen.queryByText(/Column — /)).not.toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('drag-and-drop reordering', () => {
    // Carries the dragged index the same way the real browser's DataTransfer would —
    // set once in dragstart, read back in drop.
    const makeDataTransfer = () => {
      let payload = '';
      return {
        setData: (_type, value) => { payload = value; },
        getData: () => payload,
        effectAllowed: ''
      };
    };

    it('dragging the first row\'s handle onto the second row moves it there', () => {
      const onChange = jest.fn();
      const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
      render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

      const dataTransfer = makeDataTransfer();
      const rowEls = document.querySelectorAll('.adminLayoutTree > .adminLayoutTree-row');
      const handles = screen.getAllByRole('button', { name: 'Drag to reorder' });

      fireEvent.dragStart(handles[0], { dataTransfer });
      fireEvent.dragOver(rowEls[1], { dataTransfer });
      fireEvent.drop(rowEls[1], { dataTransfer });

      expect(onChange).toHaveBeenCalledWith([rows[1], rows[0]]);
    });

    it('dragging a column onto another column within the same row reorders them', () => {
      const onChange = jest.fn();
      const rows = [{
        ...makeBlankRow(),
        columns: [
          { ...makeBlankColumn(), children: [makeTilePlacement('tileA')] },
          { ...makeBlankColumn(), children: [makeTilePlacement('tileB')] }
        ]
      }];
      render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

      const dataTransfer = makeDataTransfer();
      const columnEls = document.querySelectorAll('.adminLayoutTree-column');
      const handles = screen.getAllByRole('button', { name: 'Drag to reorder' });
      // handles[0] is the row's own handle; the column handles follow.
      const [firstColumnHandle] = handles.slice(1);

      fireEvent.dragStart(firstColumnHandle, { dataTransfer });
      fireEvent.dragOver(columnEls[1], { dataTransfer });
      fireEvent.drop(columnEls[1], { dataTransfer });

      const [newRows] = onChange.mock.calls[0];
      expect(newRows[0].columns).toEqual([rows[0].columns[1], rows[0].columns[0]]);
    });

    it('a nested row (inside a column) has no drag handle of its own — no sibling rows to reorder against', () => {
      const nestedRow = rowWithOneColumnAndTile('tileB');
      const outerColumn = { ...makeBlankColumn(), children: [{ id: 'nested', nodeType: 'row', row: nestedRow }] };
      const rows = [{ ...makeBlankRow(), columns: [outerColumn] }];

      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      // 3 handles: the outer row, the outer column, and the nested row's own column
      // (each column is always reorderable within its row, nested or not) — none for
      // the nested row itself, since it has no sibling rows at its level to drag against.
      expect(screen.getAllByRole('button', { name: 'Drag to reorder' })).toHaveLength(3);
    });

    it('dropping with no valid drag data is a no-op', () => {
      const onChange = jest.fn();
      const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
      render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

      const rowEls = document.querySelectorAll('.adminLayoutTree > .adminLayoutTree-row');
      fireEvent.drop(rowEls[1], { dataTransfer: makeDataTransfer() });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('duplicating', () => {
    it('duplicates a row, inserting the copy right after the original with fresh ids', () => {
      const onChange = jest.fn();
      const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
      render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

      openMenuIn(rowHeaderEl(0));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Duplicate row' }));

      const [newRows] = onChange.mock.calls[0];
      expect(newRows).toHaveLength(3);
      // The duplicate sits right after the original, before what was previously second.
      expect(newRows[1].columns[0].children[0].tileKey).toBe('tileA');
      expect(newRows[2]).toBe(rows[1]);
      // Fresh ids on the duplicate — not just a shallow copy of the original.
      expect(newRows[1].id).not.toBe(rows[0].id);
      expect(newRows[1].columns[0].id).not.toBe(rows[0].columns[0].id);
      expect(newRows[1].columns[0].children[0].id).not.toBe(rows[0].columns[0].children[0].id);
    });

    it('duplicates a column, inserting the copy right after the original within the same row', () => {
      const onChange = jest.fn();
      const rows = [{
        ...makeBlankRow(),
        columns: [
          { ...makeBlankColumn(), children: [makeTilePlacement('tileA')] },
          { ...makeBlankColumn(), children: [makeTilePlacement('tileB')] }
        ]
      }];
      render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

      const columnHeaders = document.querySelectorAll('.adminLayoutTree-columnHeader');
      openMenuIn(columnHeaders[0]);
      fireEvent.click(screen.getByRole('menuitem', { name: 'Duplicate column' }));

      const [newRows] = onChange.mock.calls[0];
      const [newColumns] = [newRows[0].columns];
      expect(newColumns).toHaveLength(3);
      expect(newColumns[1].children[0].tileKey).toBe('tileA');
      expect(newColumns[2]).toBe(rows[0].columns[1]);
      expect(newColumns[1].id).not.toBe(rows[0].columns[0].id);
    });

    it('a nested row has no "Duplicate row" action — no sibling rows of its own to duplicate into', () => {
      const nestedRow = rowWithOneColumnAndTile('tileB');
      const outerColumn = { ...makeBlankColumn(), children: [{ id: 'nested', nodeType: 'row', row: nestedRow }] };
      const rows = [{ ...makeBlankRow(), columns: [outerColumn] }];

      render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

      // The outer row (rowHeaderEl(0)) does have the action...
      openMenuIn(rowHeaderEl(0));
      expect(within(rowHeaderEl(0)).getByRole('menuitem', { name: 'Duplicate row' })).toBeInTheDocument();

      // ...but the nested row's own header (the second rowHeader in document order) does not.
      const nestedRowHeader = document.querySelectorAll('.adminLayoutTree-rowHeader')[1];
      openMenuIn(nestedRowHeader);
      expect(within(nestedRowHeader).queryByRole('menuitem', { name: 'Duplicate row' })).not.toBeInTheDocument();
    });
  });
});
