import React from 'react';
import { render, screen } from '@testing-library/react';

import { renderLayoutTree, computeTileOrder } from '../layoutTreeRenderer';

const projects = {
  someProject: {
    key: 'someProject',
    fileName: 'some-project',
    type: 'new-homes',
    projectName: 'Some Project',
    mainImageUrl: 'https://example.com/some-project.jpg'
  }
};

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

describe('renderLayoutTree', () => {
  it('renders a project tile with a link to its portfolio page', () => {
    const tiles = { someTile: { kind: 'project', projectKey: 'someProject', num: 1 } };
    const rows = [row({}, [column({}, [tileRef('someTile')])])];

    render(<>{renderLayoutTree({ rows, tiles, projects })}</>);

    expect(screen.getByText('Some Project')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/portfolio/new-homes/some-project');
  });

  it('injects Row/Column sizing down onto the actual Item element (not a wrapper)', () => {
    const tiles = {
      image1: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/demo/image/upload/a.jpg' }
    };
    const rows = [row({ height: 400 }, [column({}, [tileRef('image1')])])];

    render(<>{renderLayoutTree({ rows, tiles, projects })}</>);

    // The Image component only emits an h_<n> cloudinary transform when a height was
    // actually propagated down to it — this is the regression this test guards (Row/
    // Column pass sizing via React.cloneElement on their *direct* JSX children; a
    // wrapper component in between silently breaks that).
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('h_800'));
  });

  it('renders a text tile using the shared introduction text', () => {
    const tiles = { blurb: { kind: 'text', useIntroText: true } };
    const rows = [row({}, [column({}, [tileRef('blurb')])])];

    render(<>{renderLayoutTree({ rows, tiles, projects, introText: 'The shared intro' })}</>);

    expect(screen.getByText('The shared intro')).toBeInTheDocument();
  });

  it('renders a description tile bound to a project', () => {
    const tiles = { description: { kind: 'description' } };
    const rows = [row({}, [column({}, [tileRef('description')])])];
    const boundProject = { projectName: 'Bound Project', projectDescription: 'A lovely description.' };

    render(<>{renderLayoutTree({ rows, tiles, projects, boundProject })}</>);

    expect(screen.getByText('Bound Project')).toBeInTheDocument();
    expect(screen.getByText('A lovely description.')).toBeInTheDocument();
  });

  it('renders an embed tile\'s raw HTML markup verbatim, including non-JSX attribute names', () => {
    const tiles = {
      tour: { kind: 'embed', num: 11, html: '<iframe title="Tour" width="100%" height="500" frameborder="0" src="https://kuula.co/share/abc"></iframe>' }
    };
    const rows = [row({}, [column({}, [tileRef('tour')])])];

    const { container } = render(<>{renderLayoutTree({ rows, tiles, projects })}</>);

    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', 'https://kuula.co/share/abc');
    expect(iframe).toHaveAttribute('frameborder', '0');
  });

  it('renders a nested row inside a column', () => {
    const tiles = { someTile: { kind: 'project', projectKey: 'someProject', num: 1 } };
    const rows = [
      row({}, [
        column({}, [
          { nodeType: 'row', row: row({}, [column({}, [tileRef('someTile')])]) }
        ])
      ])
    ];

    render(<>{renderLayoutTree({ rows, tiles, projects })}</>);

    expect(screen.getByText('Some Project')).toBeInTheDocument();
  });

  it('renders an empty placeholder placement without throwing', () => {
    const rows = [row({}, [column({}, [{ nodeType: 'empty' }])])];

    const { container } = render(<>{renderLayoutTree({ rows, tiles: {}, projects })}</>);

    expect(container.querySelector('.column')).toBeInTheDocument();
  });

  it('skips a placement referencing a tile that does not exist, without crashing', () => {
    const rows = [row({}, [column({}, [tileRef('missingTile')])])];

    render(<>{renderLayoutTree({ rows, tiles: {}, projects })}</>);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('computeTileOrder', () => {
  it('lists numbered-kind tile keys in document order, skipping text/description tiles', () => {
    const tiles = {
      a: { kind: 'project', projectKey: 'a' },
      b: { kind: 'text', useIntroText: true }
    };
    const rows = [
      row({}, [column({}, [tileRef('b')])]),
      row({}, [column({}, [tileRef('a')])])
    ];

    expect(computeTileOrder(rows, tiles)).toEqual(['a']);
  });
});
