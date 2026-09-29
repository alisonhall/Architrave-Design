import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import EditableLayoutPreview from '../editableLayoutPreview';

const projects = {
  someProject: {
    key: 'someProject',
    fileName: 'some-project',
    type: 'new-homes',
    projectName: 'Some Project',
    mainImageUrl: 'https://example.com/some-project.jpg'
  }
};

// resolvePlacementClick (layoutClickOverlay.jsx) reads `data-column-id`, populated only
// from a hydrated column's `id` — these fixtures always include one, matching what
// hydrateLayoutData (layoutHelpers.js) actually produces for the admin draft.
const row = (props, columns) => ({ ...props, columns });
const column = (id, children) => ({ id, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

describe('EditableLayoutPreview', () => {
  it('renders the live preview and no popover initially', () => {
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg' } };
    const rows = [row({}, [column('col1', [tileRef('a')])])];

    const { container } = render(
      <EditableLayoutPreview
        rows={rows}
        tiles={tiles}
        projects={projects}
        kinds={['image']}
        onChangeRows={jest.fn()}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(container.querySelector('[data-column-id="col1"]')).toBeInTheDocument();
  });

  it('clicking a tile opens the popover with its fields', () => {
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } };
    const rows = [row({}, [column('col1', [tileRef('a')])])];

    render(
      <EditableLayoutPreview
        rows={rows}
        tiles={tiles}
        projects={projects}
        kinds={['image']}
        onChangeRows={jest.fn()}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('img'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Editing tile: a')).toBeInTheDocument();
  });

  it('saving an edit from the popover calls onChangeTiles and closes it', () => {
    const onChangeTiles = jest.fn();
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } };
    const rows = [row({}, [column('col1', [tileRef('a')])])];

    render(
      <EditableLayoutPreview
        rows={rows}
        tiles={tiles}
        projects={projects}
        kinds={['image']}
        onChangeRows={jest.fn()}
        onChangeTiles={onChangeTiles}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('img'));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/new.jpg' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onChangeTiles).toHaveBeenCalledWith({
      a: { kind: 'image', imageUrl: 'https://example.com/new.jpg', backgroundPosition: '', overlayText: '' }
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('assigning an existing tile to an empty slot calls onChangeRows with the resolved rows', () => {
    const onChangeRows = jest.fn();
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg' } };
    const rows = [row({}, [column('col1', [{ nodeType: 'empty' }])])];

    const { container } = render(
      <EditableLayoutPreview
        rows={rows}
        tiles={tiles}
        projects={projects}
        kinds={['image']}
        onChangeRows={onChangeRows}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    fireEvent.click(container.querySelector('.textBlurbFiller'));
    fireEvent.click(screen.getByText(/^a —/));

    expect(onChangeRows).toHaveBeenCalledWith([row({}, [column('col1', [tileRef('a')])])]);
  });

  it('creating a new tile from an empty slot calls onCreateTileAndAssign with the resolved rows', () => {
    const onCreateTileAndAssign = jest.fn();
    const rows = [row({}, [column('col1', [{ nodeType: 'empty' }])])];

    const { container } = render(
      <EditableLayoutPreview
        rows={rows}
        tiles={{}}
        projects={projects}
        kinds={['image']}
        onChangeRows={jest.fn()}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={onCreateTileAndAssign}
      />
    );

    fireEvent.click(container.querySelector('.textBlurbFiller'));
    fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/new.jpg' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add & assign' }));

    expect(onCreateTileAndAssign).toHaveBeenCalledWith(
      'imageTile',
      expect.objectContaining({ imageUrl: 'https://example.com/new.jpg' }),
      [row({}, [column('col1', [tileRef('imageTile')])])]
    );
  });

  it('clicking a project tile (a real link) opens the popover instead of navigating', () => {
    const tileRows = [row({}, [column('col1', [{ nodeType: 'tileRef', tileKey: 'someProject' }])])];

    render(
      <EditableLayoutPreview
        rows={tileRows}
        tiles={{ someProject: { kind: 'project', projectKey: 'someProject' } }}
        projects={projects}
        kinds={['project']}
        onChangeRows={jest.fn()}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/portfolio/new-homes/some-project');

    // fireEvent.click resolves to the underlying dispatchEvent()'s own return value, which
    // the DOM spec defines as false exactly when preventDefault() was called — the most
    // direct way to prove real navigation was actually blocked, not just that a popover
    // happened to also open.
    const dispatchResult = fireEvent.click(link);

    expect(dispatchResult).toBe(false);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Editing tile: someProject')).toBeInTheDocument();
  });

  it('clicking outside any column does not open a popover', () => {
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg' } };
    const rows = [row({}, [column('col1', [tileRef('a')])])];

    const { container } = render(
      <EditableLayoutPreview
        rows={rows}
        tiles={tiles}
        projects={projects}
        kinds={['image']}
        onChangeRows={jest.fn()}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    fireEvent.click(container);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('structure editing, directly on the preview', () => {
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg' } };
    const renderPreview = (rows, onChangeRows = jest.fn(), tileMap = tiles) => render(
      <EditableLayoutPreview
        rows={rows}
        tiles={tileMap}
        projects={projects}
        kinds={['image']}
        onChangeRows={onChangeRows}
        onChangeTiles={jest.fn()}
        onCreateTileAndAssign={jest.fn()}
      />
    );

    it('"Add row" appends a blank row', () => {
      const onChangeRows = jest.fn();
      const rows = [row({ id: 'row1' }, [column('col1', [tileRef('a')])])];
      renderPreview(rows, onChangeRows);

      fireEvent.click(screen.getByRole('button', { name: 'Add row' }));

      const next = onChangeRows.mock.calls[0][0];
      expect(next).toHaveLength(2);
      expect(next[0]).toBe(rows[0]);
      expect(next[1].columns).toEqual([]);
    });

    it('says so when a layout has no rows yet', () => {
      renderPreview([]);
      expect(screen.getByText('This layout has no rows yet.')).toBeInTheDocument();
    });

    it('shows a structure toolbar on each row and column', () => {
      const { container } = renderPreview([row({ id: 'row1' }, [column('col1', [tileRef('a')])])]);

      expect(within(container.querySelector('[data-row-toolbar="row1"]')).getByRole('button', { name: 'Row ▾' })).toBeInTheDocument();
      expect(within(container.querySelector('[data-column-toolbar="col1"]')).getByRole('button', { name: 'Column ▾' })).toBeInTheDocument();
    });

    it('a row toolbar\'s "Edit size…" opens the size form, which commits to the row', () => {
      const onChangeRows = jest.fn();
      const { container } = renderPreview([row({ id: 'row1', height: 300 }, [column('col1', [tileRef('a')])])], onChangeRows);

      const toolbar = container.querySelector('[data-row-toolbar="row1"]');
      fireEvent.click(within(toolbar).getByRole('button', { name: 'Row ▾' }));
      fireEvent.click(within(toolbar).getByRole('menuitem', { name: 'Edit size…' }));

      const heightInput = screen.getByLabelText('Height (px)');
      expect(heightInput).toHaveValue('300');
      fireEvent.change(heightInput, { target: { value: '420' } });
      fireEvent.keyDown(heightInput, { key: 'Enter' });

      expect(onChangeRows.mock.calls[0][0][0].height).toBe(420);
      expect(screen.queryByLabelText('Height (px)')).not.toBeInTheDocument();
    });

    it('clicking a spot whose tile was deleted offers to assign one, rather than editing a tile that isn\'t there', () => {
      const onChangeRows = jest.fn();
      renderPreview([row({ id: 'row1' }, [column('col1', [tileRef('gone')])])], onChangeRows);

      fireEvent.click(screen.getByText('Empty slot — click to choose a tile'));

      expect(screen.getByText('Assign a tile')).toBeInTheDocument();
      fireEvent.click(screen.getByText(/^a —/));
      expect(onChangeRows.mock.calls[0][0][0].columns[0].children[0].tileKey).toBe('a');
    });

    it('removing a spot from its popover takes it out of the layout', () => {
      const onChangeRows = jest.fn();
      renderPreview([row({ id: 'row1' }, [column('col1', [tileRef('a'), { nodeType: 'empty' }])])], onChangeRows);

      fireEvent.click(screen.getByRole('img'));
      fireEvent.click(screen.getByRole('button', { name: 'Remove from layout' }));

      expect(onChangeRows.mock.calls[0][0][0].columns[0].children).toEqual([{ nodeType: 'empty' }]);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('the tile popover when the layout changes underneath it', () => {
    const tiles = { a: { kind: 'image', imageUrl: 'https://example.com/a.jpg', backgroundPosition: '', overlayText: '' } };
    const props = (rows, overrides = {}) => ({
      rows,
      tiles,
      projects,
      kinds: ['image'],
      onChangeRows: jest.fn(),
      onChangeTiles: jest.fn(),
      onCreateTileAndAssign: jest.fn(),
      ...overrides
    });

    it('closes when this layout tree changes some other way, so its stale actions can\'t undo that change', () => {
      const rows = [row({ id: 'row1' }, [column('col1', [tileRef('a')])])];
      const { rerender } = render(<EditableLayoutPreview {...props(rows)} />);
      fireEvent.click(screen.getByRole('img'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // e.g. a resize applied while the popover was open.
      rerender(<EditableLayoutPreview {...props([{ ...rows[0], height: 500 }])} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('stays open when only the tiles change (the same tree)', () => {
      const rows = [row({ id: 'row1' }, [column('col1', [tileRef('a')])])];
      const { rerender } = render(<EditableLayoutPreview {...props(rows)} />);
      fireEvent.click(screen.getByRole('img'));

      rerender(<EditableLayoutPreview {...props(rows, { tiles: { ...tiles, b: { kind: 'placeholder' } } })} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('hands "Delete this tile" to onDeleteTile, closing only if it went ahead', () => {
      const rows = [row({ id: 'row1' }, [column('col1', [tileRef('a')])])];
      const onDeleteTile = jest.fn(() => false);
      const { rerender } = render(<EditableLayoutPreview {...props(rows, { onDeleteTile })} />);
      fireEvent.click(screen.getByRole('img'));

      fireEvent.click(screen.getByRole('button', { name: 'Delete this tile' }));
      expect(onDeleteTile).toHaveBeenCalledWith('a');
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      onDeleteTile.mockReturnValue(true);
      rerender(<EditableLayoutPreview {...props(rows, { onDeleteTile })} />);
      fireEvent.click(screen.getByRole('button', { name: 'Delete this tile' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
