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

    it('filters the existing-tiles list', () => {
      const multipleTiles = {
        hoggsHollowFrench: { kind: 'image', imageUrl: 'https://example.com/a.jpg' },
        kingswayGeorgian: { kind: 'image', imageUrl: 'https://example.com/b.jpg' }
      };
      render(
        <TileEditPopover
          selection={makeSelection({ isEmpty: true })}
          tiles={multipleTiles}
          onChangeTiles={jest.fn()}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={jest.fn()}
        />
      );

      fireEvent.change(screen.getByLabelText('Filter tiles'), { target: { value: 'kingsway' } });

      expect(screen.queryByText(/hoggsHollowFrench/)).not.toBeInTheDocument();
      expect(screen.getByText(/kingswayGeorgian/)).toBeInTheDocument();
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

    it('keeps the popover fully within the viewport when its anchor is near the bottom-right corner', () => {
      // A small window with an anchor right at its edge, and a popover whose own
      // rendered size (mocked below) would overflow both the right and bottom edges if
      // positioned naively off the anchor alone (top: anchor.bottom, left: anchor.left).
      window.innerWidth = 400;
      window.innerHeight = 300;
      const anchor = document.createElement('div');
      jest.spyOn(anchor, 'getBoundingClientRect').mockReturnValue(
        { top: 280, bottom: 290, left: 380, right: 390, width: 10, height: 10 }
      );
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
        if (this.classList.contains('adminTileEditPopover')) {
          return { top: 296, bottom: 696, left: 380, right: 680, width: 300, height: 400 };
        }
        return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
      });

      const { container } = render(
        <TileEditPopover
          selection={makeSelection({ tileKey: 'tileA', anchor })}
          tiles={{ tileA: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } }}
          onChangeTiles={jest.fn()}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={jest.fn()}
        />
      );

      const popover = container.querySelector('.adminTileEditPopover');
      expect(popover.style.position).toBe('fixed');
      // 300px wide / 400px tall popover in a 400x300 window: only one on-screen position
      // satisfies both axes' 8px-margin clamp, so this also proves clamping actually ran
      // rather than just not crashing.
      expect(popover.style.top).toBe('8px');
      expect(popover.style.left).toBe('92px');

      jest.restoreAllMocks();
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

  describe('moving/removing the clicked spot', () => {
    const tiles = { tileA: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } };
    const renderWith = (selectionOverrides, handlers = {}) => render(
      <TileEditPopover
        selection={makeSelection({
          tileKey: 'tileA',
          canMoveUp: true,
          canMoveDown: false,
          getMovedRows: jest.fn((delta) => [{ moved: delta }]),
          getRemovedRows: jest.fn(() => [{ removed: true }]),
          ...selectionOverrides
        })}
        tiles={tiles}
        onChangeTiles={jest.fn()}
        onAssignRows={handlers.onAssignRows ?? jest.fn()}
        onCreateTileAndAssign={jest.fn()}
        projects={projects}
        kinds={['image']}
        onClose={handlers.onClose ?? jest.fn()}
      />
    );

    it('moves the spot up (or down, when allowed), applying the rows and closing', () => {
      const onAssignRows = jest.fn();
      const onClose = jest.fn();
      renderWith({}, { onAssignRows, onClose });

      expect(screen.getByRole('button', { name: 'Move down' })).toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: 'Move up' }));

      expect(onAssignRows).toHaveBeenCalledWith([{ moved: -1 }]);
      expect(onClose).toHaveBeenCalled();
    });

    it('moves the spot down', () => {
      const onAssignRows = jest.fn();
      renderWith({ canMoveUp: false, canMoveDown: true }, { onAssignRows });

      expect(screen.getByRole('button', { name: 'Move up' })).toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: 'Move down' }));
      expect(onAssignRows).toHaveBeenCalledWith([{ moved: 1 }]);
    });

    it('removes the spot from the layout, from an empty slot too', () => {
      const onAssignRows = jest.fn();
      renderWith({ tileKey: null, isEmpty: true }, { onAssignRows });

      expect(screen.getByText('Assign a tile')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Remove from layout' }));
      expect(onAssignRows).toHaveBeenCalledWith([{ removed: true }]);
    });

    it('offers no spot actions when the selection can\'t provide them', () => {
      renderWith({ getMovedRows: undefined, getRemovedRows: undefined });
      expect(screen.queryByRole('button', { name: 'Remove from layout' })).not.toBeInTheDocument();
    });
  });

  describe('closing when the page scrolls', () => {
    const tiles = { tileA: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } };
    const setScrollY = (y) => Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true });
    const renderOpen = (onClose) => render(
      <TileEditPopover
        selection={makeSelection({ tileKey: 'tileA' })}
        tiles={tiles}
        onChangeTiles={jest.fn()}
        onAssignRows={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
        projects={projects}
        kinds={['image']}
        onClose={onClose}
      />
    );

    beforeEach(() => setScrollY(0));
    afterEach(() => setScrollY(0));

    it('closes once the page scrolls past a few pixels', () => {
      const onClose = jest.fn();
      renderOpen(onClose);

      setScrollY(5);
      fireEvent.scroll(document);
      expect(onClose).not.toHaveBeenCalled();

      setScrollY(40);
      fireEvent.scroll(document);
      expect(onClose).toHaveBeenCalled();
    });

    it('stays open when the scrolling happens inside the popover itself', () => {
      const onClose = jest.fn();
      renderOpen(onClose);
      setScrollY(40);

      fireEvent.scroll(screen.getByRole('dialog'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('stays open while one of its fields has focus (a tablet keyboard can scroll the page)', () => {
      const onClose = jest.fn();
      renderOpen(onClose);
      screen.getByLabelText('Image URL').focus();

      setScrollY(200);
      fireEvent.scroll(document);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('also closes when a scrolling container around the preview scrolls', () => {
      const onClose = jest.fn();
      renderOpen(onClose);
      const panel = document.createElement('div');
      document.body.appendChild(panel);

      panel.scrollTop = 0;
      fireEvent.scroll(panel);
      panel.scrollTop = 50;
      fireEvent.scroll(panel);

      expect(onClose).toHaveBeenCalled();
      panel.remove();
    });

    it('stops listening once closed', () => {
      const onClose = jest.fn();
      const { rerender } = renderOpen(onClose);
      rerender(
        <TileEditPopover
          selection={null}
          tiles={tiles}
          onChangeTiles={jest.fn()}
          onAssignRows={jest.fn()}
          onCreateTileAndAssign={jest.fn()}
          projects={projects}
          kinds={['image']}
          onClose={onClose}
        />
      );

      setScrollY(100);
      fireEvent.scroll(document);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('edit form validation and navigation', () => {
    const tiles = {
      a: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' },
      b: { kind: 'image', imageUrl: 'https://example.com/b.jpg', backgroundPosition: '', overlayText: '' }
    };
    const renderEdit = (overrides = {}) => render(
      <TileEditPopover
        selection={makeSelection({ tileKey: 'a' })}
        tiles={tiles}
        onChangeTiles={overrides.onChangeTiles ?? jest.fn()}
        onAssignRows={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
        projects={projects}
        kinds={['image']}
        onClose={overrides.onClose ?? jest.fn()}
      />
    );

    beforeEach(() => { window.alert = jest.fn(); });

    it('refuses an empty key', () => {
      const onChangeTiles = jest.fn();
      renderEdit({ onChangeTiles });
      fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: '  ' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      expect(window.alert).toHaveBeenCalledWith('A tile needs a key.');
      expect(onChangeTiles).not.toHaveBeenCalled();
    });

    it('refuses a key another tile already has', () => {
      const onChangeTiles = jest.fn();
      renderEdit({ onChangeTiles });
      fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'b' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      expect(window.alert).toHaveBeenCalledWith('"b" is already used by another tile.');
      expect(onChangeTiles).not.toHaveBeenCalled();
    });

    it('renames through onChangeTiles alone when no rename handler is given', () => {
      const onChangeTiles = jest.fn();
      renderEdit({ onChangeTiles });
      fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'c' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      expect(onChangeTiles).toHaveBeenCalledWith({ b: tiles.b, c: tiles.a });
    });

    it('"Back" leaves the new-tile form for the assign list, and Cancel there closes', () => {
      const onClose = jest.fn();
      renderEdit({ onClose });
      fireEvent.click(screen.getByRole('button', { name: 'Use a different tile here' }));
      fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
      expect(screen.getByText('New image tile')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(screen.getByText('Assign a tile')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onClose).toHaveBeenCalled();
    });
  });
});
