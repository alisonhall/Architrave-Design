import React from 'react';
import { render, screen } from '@testing-library/react';

import LayoutPreview from '../layoutPreview';

const projects = {
  someProject: {
    key: 'someProject',
    fileName: 'some-project',
    type: 'new-homes',
    projectName: 'Some Project',
    mainImageUrl: 'https://example.com/some-project.jpg'
  }
};

const row = (id, columns, props = {}) => ({ id, columns, ...props });
const column = (id, children, props = {}) => ({ id, children, ...props });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

describe('LayoutPreview', () => {
  it('renders a project tile with a link to its portfolio page', () => {
    const tiles = { someTile: { kind: 'project', projectKey: 'someProject', num: 1 } };
    const rows = [row('r1', [column('c1', [tileRef('p1', 'someTile')])])];

    render(<LayoutPreview rows={rows} tiles={tiles} projects={projects} introText="Intro" />);

    expect(screen.getByText('Some Project')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/portfolio/new-homes/some-project');
  });

  it('renders a filler tile without a link', () => {
    const tiles = { fillerTile: { kind: 'filler', imageUrl: 'https://example.com/filler.jpg', num: 2 } };
    const rows = [row('r1', [column('c1', [tileRef('p1', 'fillerTile')])])];

    render(<LayoutPreview rows={rows} tiles={tiles} projects={projects} introText="Intro" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/filler.jpg');
  });

  it('renders a text tile using the shared introduction text when useIntroText is set', () => {
    const tiles = { blurb: { kind: 'text', useIntroText: true } };
    const rows = [row('r1', [column('c1', [tileRef('p1', 'blurb')])])];

    render(<LayoutPreview rows={rows} tiles={tiles} projects={projects} introText="The shared intro" />);

    expect(screen.getByText('The shared intro')).toBeInTheDocument();
  });

  it('renders a text tile using its own copy when useIntroText is false', () => {
    const tiles = { blurb: { kind: 'text', useIntroText: false, text: 'Custom copy' } };
    const rows = [row('r1', [column('c1', [tileRef('p1', 'blurb')])])];

    render(<LayoutPreview rows={rows} tiles={tiles} projects={projects} introText="The shared intro" />);

    expect(screen.getByText('Custom copy')).toBeInTheDocument();
    expect(screen.queryByText('The shared intro')).not.toBeInTheDocument();
  });

  it('renders a nested row inside a column', () => {
    const tiles = { someTile: { kind: 'project', projectKey: 'someProject', num: 1 } };
    const rows = [
      row('outer', [
        column('outerCol', [
          { id: 'nested', nodeType: 'row', row: row('inner', [column('innerCol', [tileRef('p1', 'someTile')])]) }
        ])
      ])
    ];

    render(<LayoutPreview rows={rows} tiles={tiles} projects={projects} introText="Intro" />);

    expect(screen.getByText('Some Project')).toBeInTheDocument();
  });

  it('silently skips a placement referencing a tile that no longer exists', () => {
    const rows = [row('r1', [column('c1', [tileRef('p1', 'missingTile')])])];

    render(<LayoutPreview rows={rows} tiles={{}} projects={projects} introText="Intro" />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
