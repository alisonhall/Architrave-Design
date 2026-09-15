import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TileEditPopover from '../tileEditPopover';

const projects = {
  projectA: { key: 'projectA', projectName: 'Project A', mainImageUrl: 'https://example.com/project-a.jpg' }
};

const makeSelection = (overrides) => ({
  tileKey: null,
  isEmpty: false,
  anchor: document.createElement('div'),
  getNextRows: jest.fn((tileKey) => [{ result: tileKey }]),
  ...overrides
});

describe('TileEditPopover', () => {
  it('renders nothing when there is no selection', () => {
    const { container } = render(
      <TileEditPopover
        selection={null}
        tiles={{}}
        onChangeTiles={jest.fn()}
        onAssignRows={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
        projects={projects}
        kinds={['image']}
        onClose={jest.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  describe('editing an existing tile', () => {
    const tiles = { tileA: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } };

    it('shows that tile\'s fields and saves an edit', () => {
      const onChangeTiles = jest.fn();
      const onClose = jest.fn();
      render(
        <TileEditPopover
          selection={makeSelection({ tileKey: 'tileA' })}
          tiles={tiles}
          onChangeTiles={onChangeTiles}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={onClose}
        />
      );

      expect(screen.getByText('Editing tile: tileA')).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/new.jpg' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));

      expect(onChangeTiles).toHaveBeenCalledWith({
        tileA: { kind: 'image', imageUrl: 'https://example.com/new.jpg', backgroundPosition: '', overlayText: '' }
      });
      expect(onClose).toHaveBeenCalled();
    });

    it('renames the tile via onRenameTile when the key changes', () => {
      const onRenameTile = jest.fn();
      const onClose = jest.fn();
      render(
        <TileEditPopover
          selection={makeSelection({ tileKey: 'tileA' })}
          tiles={tiles}
          onChangeTiles={jest.fn()}
          onRenameTile={onRenameTile}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={onClose}
        />
      );

      fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'tileB' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));

      expect(onRenameTile).toHaveBeenCalledWith('tileA', 'tileB', { tileB: tiles.tileA });
      expect(onClose).toHaveBeenCalled();
    });

    it('deletes the tile after confirmation', () => {
      window.confirm = jest.fn(() => true);
      const onChangeTiles = jest.fn();
      const onClose = jest.fn();
      render(
        <TileEditPopover
          selection={makeSelection({ tileKey: 'tileA' })}
          tiles={tiles}
          onChangeTiles={onChangeTiles}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={onClose}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Delete this tile' }));

      expect(window.confirm).toHaveBeenCalled();
      expect(onChangeTiles).toHaveBeenCalledWith({});
      expect(onClose).toHaveBeenCalled();
    });

    it('does not delete when confirmation is declined', () => {
      window.confirm = jest.fn(() => false);
      const onChangeTiles = jest.fn();
      render(
        <TileEditPopover
          selection={makeSelection({ tileKey: 'tileA' })}
          tiles={tiles}
          onChangeTiles={onChangeTiles}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={jest.fn()}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Delete this tile' }));
      expect(onChangeTiles).not.toHaveBeenCalled();
    });

    it('switches to assign mode via "Use a different tile here"', () => {
      render(
        <TileEditPopover
          selection={makeSelection({ tileKey: 'tileA' })}
          tiles={tiles}
          onChangeTiles={jest.fn()}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={jest.fn()}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Use a different tile here' }));
      expect(screen.getByText('Assign a tile')).toBeInTheDocument();
    });
  });

  describe('assigning a tile to an empty slot', () => {
    const tiles = { tileA: { kind: 'image', imageUrl: 'https://example.com/a.jpg' } };

    it('lists existing tiles and assigns one, computing rows via getNextRows', () => {
      const onAssignRows = jest.fn();
      const onClose = jest.fn();
      const selection = makeSelection({ isEmpty: true });
      render(
        <TileEditPopover
          selection={selection}
          tiles={tiles}
          onChangeTiles={jest.fn()}
          onAssignRows={onAssignRows}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={onClose}
        />
      );

      expect(screen.getByText('Assign a tile')).toBeInTheDocument();
      fireEvent.click(screen.getByText(/tileA/));

      expect(selection.getNextRows).toHaveBeenCalledWith('tileA');
      expect(onAssignRows).toHaveBeenCalledWith([{ result: 'tileA' }]);
      expect(onClose).toHaveBeenCalled();
    });

    it('creates a new tile and assigns it in one atomic call', () => {
      const onCreateTileAndAssign = jest.fn();
      const onClose = jest.fn();
      const selection = makeSelection({ isEmpty: true });
      render(
        <TileEditPopover
          selection={selection}
          tiles={tiles}
          onChangeTiles={jest.fn()}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={onCreateTileAndAssign}
          projects={projects}
          kinds={['image']}
          onClose={onClose}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
      fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/new.jpg' } });
      fireEvent.click(screen.getByRole('button', { name: 'Add & assign' }));

      expect(onCreateTileAndAssign).toHaveBeenCalledWith(
        'imageTile',
        expect.objectContaining({ kind: 'image', imageUrl: 'https://example.com/new.jpg' }),
        [{ result: 'imageTile' }]
      );
      expect(onClose).toHaveBeenCalled();
    });

    it('refuses to create a tile whose key already exists', () => {
      window.alert = jest.fn();
      const onCreateTileAndAssign = jest.fn();
      render(
        <TileEditPopover
          selection={makeSelection({ isEmpty: true })}
          tiles={tiles}
          onChangeTiles={jest.fn()}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={onCreateTileAndAssign}
          projects={projects}
          kinds={['image']}
          onClose={jest.fn()}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
      fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'tileA' } });
      fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/new.jpg' } });
      fireEvent.click(screen.getByRole('button', { name: 'Add & assign' }));

      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('tileA'));
      expect(onCreateTileAndAssign).not.toHaveBeenCalled();
    });
  });
});
