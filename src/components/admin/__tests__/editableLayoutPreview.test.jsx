import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

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
});
