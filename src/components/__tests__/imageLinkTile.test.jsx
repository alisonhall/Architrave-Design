import React from 'react';
import { render, screen } from '@testing-library/react';

import ImageLinkTile from '../imageLinkTile';

describe('ImageLinkTile', () => {
  it('renders a link to the given URL', () => {
    render(
      <ImageLinkTile
        image={{ imageUrl: 'https://example.com/photo.jpg' }}
        link={{ linkUrl: '/portfolio/new-homes/some-project' }}
        text={{ copy: 'Some Project' }}
        num={1}
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/portfolio/new-homes/some-project');
  });

  it('renders the image and the text overlay copy', () => {
    render(
      <ImageLinkTile
        image={{ imageUrl: 'https://example.com/photo.jpg', altText: 'A house' }}
        link={{ linkUrl: '/some-project' }}
        text={{ copy: 'Some Project' }}
        num={2}
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(screen.getByText('Some Project')).toBeInTheDocument();
  });

  it('defaults the link to "/" when no linkUrl is provided', () => {
    render(
      <ImageLinkTile
        image={{ imageUrl: 'https://example.com/photo.jpg' }}
        link={{}}
        text={{ copy: 'Some Project' }}
        num={3}
      />
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('applies the customClass prop to the link wrapper', () => {
    render(
      <ImageLinkTile
        image={{ imageUrl: 'https://example.com/photo.jpg' }}
        link={{ linkUrl: '/some-project' }}
        text={{ copy: 'Some Project' }}
        customClass="highlight"
        num={4}
      />
    );

    expect(screen.getByRole('link')).toHaveClass('image-link', 'clearfix', 'highlight');
  });
});
