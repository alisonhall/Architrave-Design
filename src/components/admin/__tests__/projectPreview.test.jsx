import React from 'react';
import { render, screen } from '@testing-library/react';

import ProjectPreview from '../projectPreview';

describe('ProjectPreview', () => {
  it('renders the project image and name using the real site tile', () => {
    render(
      <ProjectPreview
        project={{
          projectName: 'Preview Project',
          mainImageUrl: 'https://example.com/preview.jpg',
          type: 'new-homes',
          fileName: 'preview-project'
        }}
      />
    );

    expect(screen.getByText('Preview Project')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/preview.jpg');
  });

  it('links to the project\'s portfolio page', () => {
    render(
      <ProjectPreview
        project={{
          projectName: 'Preview Project',
          mainImageUrl: 'https://example.com/preview.jpg',
          type: 'new-homes',
          fileName: 'preview-project'
        }}
      />
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/portfolio/new-homes/preview-project');
  });
});
