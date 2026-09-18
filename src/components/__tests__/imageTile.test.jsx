import React from 'react';
import { render, screen } from '@testing-library/react';

import ImageTile from '../imageTile';

describe('ImageTile', () => {
  it('renders the image', () => {
    render(
      <ImageTile
        image={{ imageUrl: 'https://example.com/photo.jpg', altText: 'A house' }}
        num={1}
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('renders the text overlay copy when provided', () => {
    render(
      <ImageTile
        image={{ imageUrl: 'https://example.com/photo.jpg' }}
        text={{ copy: 'Some Project' }}
        num={1}
      />
    );

    expect(screen.getByText('Some Project')).toBeInTheDocument();
  });

  it('does not render a text overlay when copy is absent', () => {
    const { container } = render(
      <ImageTile image={{ imageUrl: 'https://example.com/photo.jpg' }} num={1} />
    );

    expect(container.querySelector('.textOverlay')).not.toBeInTheDocument();
  });

  it('applies the customClass prop to the wrapper', () => {
    const { container } = render(
      <ImageTile
        image={{ imageUrl: 'https://example.com/photo.jpg' }}
        customClass="highlight"
        num={1}
      />
    );

    expect(container.firstChild).toHaveClass('image-tile', 'clearfix', 'highlight');
  });
});
