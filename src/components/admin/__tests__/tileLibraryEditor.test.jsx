import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TileLibraryEditor from '../tileLibraryEditor';

const projects = {
  projectA: { key: 'projectA', projectName: 'Project A' },
  projectB: { key: 'projectB', projectName: 'Project B' }
};

describe('TileLibraryEditor', () => {
  beforeEach(() => {
    window.confirm = jest.fn(() => true);
  });

  it('lists existing tiles with a human-readable summary', () => {
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA', num: 1 } };
    render(<TileLibraryEditor tiles={tiles} onChange={jest.fn()} projects={projects} />);

    expect(screen.getByText(/tileA/)).toBeInTheDocument();
    expect(screen.getByText(/Project A/)).toBeInTheDocument();
  });

  it('adds a new project tile', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add project tile' }));
    fireEvent.change(screen.getByLabelText('Project'), { target: { value: 'projectB' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      projectB: { kind: 'project', projectKey: 'projectB', backgroundPosition: '' }
    });
  });

  it('adds a new filler tile with a suggested key based on its related project', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add filler tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/f.jpg' } });
    fireEvent.change(screen.getByLabelText(/Related project/), { target: { value: 'projectA' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      projectAFiller: { kind: 'filler', projectKey: 'projectA', imageUrl: 'https://example.com/f.jpg' }
    });
  });

  it('edits an existing tile', () => {
    const onChange = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA', backgroundPosition: '' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/Background position/), { target: { value: '10% 10%' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onChange).toHaveBeenCalledWith({
      tileA: { kind: 'project', projectKey: 'projectA', backgroundPosition: '10% 10%' }
    });
  });

  it('deletes a tile after confirmation', () => {
    const onChange = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(window.confirm).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({});
  });

  it('does not delete when confirmation is declined', () => {
    window.confirm = jest.fn(() => false);
    const onChange = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('adds a text tile defaulting to the shared introduction text', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add text tile' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      textTile: { kind: 'text', text: '', useIntroText: true }
    });
  });

  it('cancels adding a tile without calling onChange', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add text tile' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Add text tile' })).toBeInTheDocument();
  });

  it('only offers the tile kinds passed in via the kinds prop', () => {
    render(<TileLibraryEditor tiles={{}} onChange={jest.fn()} projects={projects} kinds={['image', 'description']} />);

    expect(screen.getByRole('button', { name: 'Add image tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add description tile' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add project tile' })).not.toBeInTheDocument();
  });

  it('adds a new image tile (detail pages)', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} kinds={['image', 'description']} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/room.jpg' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      imageTile: { kind: 'image', imageUrl: 'https://example.com/room.jpg', backgroundPosition: '', overlayText: '' }
    });
  });

  it('sets a background position on an image tile', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} kinds={['image', 'description']} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/room.jpg' } });
    fireEvent.change(screen.getByLabelText(/Background position/), { target: { value: '100% 0%' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      imageTile: { kind: 'image', imageUrl: 'https://example.com/room.jpg', backgroundPosition: '100% 0%', overlayText: '' }
    });
  });

  it('sets an overlay text on an image tile', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} kinds={['image', 'description']} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/before.jpg' } });
    fireEvent.change(screen.getByLabelText(/Overlay text/), { target: { value: 'Before' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      imageTile: { kind: 'image', imageUrl: 'https://example.com/before.jpg', backgroundPosition: '', overlayText: 'Before' }
    });
  });

  it('adds a description tile with no configurable fields (detail pages)', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} kinds={['image', 'description']} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add description tile' }));
    expect(screen.getByText(/Always shows this page/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({ descriptionTile: { kind: 'description' } });
  });

  it('adds a new embed tile by pasting iframe markup (detail pages)', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} kinds={['image', 'description', 'embed']} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add embed tile' }));
    fireEvent.change(screen.getByLabelText(/Embed HTML/), {
      target: { value: '<iframe width="100%" height="500" src="https://kuula.co/share/abc"></iframe>' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      embedTile: { kind: 'embed', html: '<iframe width="100%" height="500" src="https://kuula.co/share/abc"></iframe>' }
    });
  });

  it('summarizes an embed tile in the tile list', () => {
    const tiles = { tour: { kind: 'embed', num: 11, html: '<iframe src="https://kuula.co/share/abc"></iframe>' } };
    render(<TileLibraryEditor tiles={tiles} onChange={jest.fn()} projects={projects} kinds={['image', 'description', 'embed']} />);

    expect(screen.getByText(/Embed — pasted iframe markup/)).toBeInTheDocument();
  });

  it('summarizes an image tile and a description tile in the tile list', () => {
    const tiles = {
      1: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' },
      description: { kind: 'description' }
    };
    render(<TileLibraryEditor tiles={tiles} onChange={jest.fn()} projects={projects} kinds={['image', 'description']} />);

    expect(screen.getByText(/Image tile/)).toBeInTheDocument();
    expect(screen.getByText(/Description — this page's project/)).toBeInTheDocument();
  });

  it('adds a new tile under an explicit custom key instead of the suggested one', () => {
    const onChange = jest.fn();
    render(<TileLibraryEditor tiles={{}} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add project tile' }));
    fireEvent.change(screen.getByLabelText('Project'), { target: { value: 'projectB' } });
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'myCustomKey' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(onChange).toHaveBeenCalledWith({
      myCustomKey: { kind: 'project', projectKey: 'projectB', backgroundPosition: '' }
    });
  });

  it('refuses to add a tile under a key that already exists', () => {
    window.alert = jest.fn();
    const onChange = jest.fn();
    const tiles = { existingKey: { kind: 'project', projectKey: 'projectA' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add project tile' }));
    fireEvent.change(screen.getByLabelText('Project'), { target: { value: 'projectB' } });
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'existingKey' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add tile' }));

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('existingKey'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renames an existing tile, calling onRenameTile with the old key, new key, and updated tile map', () => {
    const onChange = jest.fn();
    const onRenameTile = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA', backgroundPosition: '' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} onRenameTile={onRenameTile} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'tileB' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onRenameTile).toHaveBeenCalledWith('tileA', 'tileB', {
      tileB: { kind: 'project', projectKey: 'projectA', backgroundPosition: '' }
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('falls back to a plain onChange rename when onRenameTile is not provided', () => {
    const onChange = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA', backgroundPosition: '' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'tileB' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onChange).toHaveBeenCalledWith({
      tileB: { kind: 'project', projectKey: 'projectA', backgroundPosition: '' }
    });
  });

  it('refuses to rename a tile to a key that already exists', () => {
    window.alert = jest.fn();
    const onChange = jest.fn();
    const onRenameTile = jest.fn();
    const tiles = {
      tileA: { kind: 'project', projectKey: 'projectA' },
      tileB: { kind: 'project', projectKey: 'projectB' }
    };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} onRenameTile={onRenameTile} projects={projects} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0]);
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'tileB' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('tileB'));
    expect(onChange).not.toHaveBeenCalled();
    expect(onRenameTile).not.toHaveBeenCalled();
  });

  it('refuses to save a tile with a blank key', () => {
    window.alert = jest.fn();
    const onChange = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(window.alert).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('saving an edit with the key unchanged keeps the same key, not a rename', () => {
    const onChange = jest.fn();
    const onRenameTile = jest.fn();
    const tiles = { tileA: { kind: 'project', projectKey: 'projectA', backgroundPosition: '' } };
    render(<TileLibraryEditor tiles={tiles} onChange={onChange} onRenameTile={onRenameTile} projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/Background position/), { target: { value: '10% 10%' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onChange).toHaveBeenCalledWith({
      tileA: { kind: 'project', projectKey: 'projectA', backgroundPosition: '10% 10%' }
    });
    expect(onRenameTile).not.toHaveBeenCalled();
  });
});
