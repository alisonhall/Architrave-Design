import React from 'react';
import { render, screen } from '@testing-library/react';

import { buildProjectTile } from '../helpers';

const project = {
  mainImageUrl: 'https://example.com/photo.jpg',
  type: 'new-homes',
  fileName: 'some-project',
  projectName: 'Some Project'
};

describe('buildProjectTile', () => {
  it('renders a link to the project using its type and fileName', () => {
    render(buildProjectTile(project));

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/portfolio/new-homes/some-project'
    );
  });

  it('renders the project image and its name as the overlay copy', () => {
    render(buildProjectTile(project));

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(screen.getByText('Some Project')).toBeInTheDocument();
  });

  it('defaults num to 1 when not provided', () => {
    render(buildProjectTile(project));

    expect(screen.getByRole('link')).toHaveClass('image1');
  });

  it('uses the provided num for the tile class', () => {
    render(buildProjectTile(project, 4));

    expect(screen.getByRole('link')).toHaveClass('image4');
  });

  it('renders without crashing when a backgroundPosition override is provided', () => {
    const { container } = render(
      buildProjectTile(project, 1, { backgroundPosition: '100% 0%' })
    );

    expect(container.querySelector('img')).toBeInTheDocument();
  });
});
