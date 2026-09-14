import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import LayoutTreeEditor from '../layoutTreeEditor';
import { makeBlankRow, makeBlankColumn, makeTilePlacement } from '../layoutHelpers';

const tiles = { tileA: { kind: 'project', projectKey: 'a' }, tileB: { kind: 'project', projectKey: 'b' } };

const rowWithOneColumnAndTile = (tileKey) => {
  const column = { ...makeBlankColumn(), children: [makeTilePlacement(tileKey)] };
  return { ...makeBlankRow(), columns: [column] };
};

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

    fireEvent.click(screen.getAllByRole('button', { name: 'Remove row' })[0]);

    expect(onChange).toHaveBeenCalledWith([rows[1]]);
  });

  it('moves a row down', () => {
    const onChange = jest.fn();
    const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
    render(<LayoutTreeEditor rows={rows} onChange={onChange} tiles={tiles} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Down' })[0]);

    expect(onChange).toHaveBeenCalledWith([rows[1], rows[0]]);
  });

  it('disables Up on the first row and Down on the last row', () => {
    const rows = [rowWithOneColumnAndTile('tileA'), rowWithOneColumnAndTile('tileB')];
    render(<LayoutTreeEditor rows={rows} onChange={jest.fn()} tiles={tiles} />);

    const upButtons = screen.getAllByRole('button', { name: 'Up' });
    const downButtons = screen.getAllByRole('button', { name: 'Down' });
    expect(upButtons[0]).toBeDisabled();
    expect(downButtons[1]).toBeDisabled();
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
});
