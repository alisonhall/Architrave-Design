import React from 'react';
import { render } from '@testing-library/react';

import ImageFillerTile from '../imageFillerTile';

describe('ImageFillerTile', () => {
  it('renders an image and an empty text overlay', () => {
    const { container } = render(
      <ImageFillerTile
        customClass="tile"
        image={{ imageUrl: 'https://example.com/photo.jpg', altText: 'A house' }}
      />
    );

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveClass('filler');

    const overlay = container.querySelector('p.textOverlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toBeEmptyDOMElement();
  });

  it('applies the customClass and imageFiller classes to the wrapper', () => {
    const { container } = render(
      <ImageFillerTile customClass="tile" image={{ imageUrl: 'https://example.com/photo.jpg' }} />
    );

    expect(container.firstChild).toHaveClass('tile', 'clearfix', 'imageFiller');
  });

  it('passes dimensions through to the underlying image', () => {
    const { container } = render(
      <ImageFillerTile
        image={{ imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1/photo.jpg' }}
        dimensions={{ height: 50 }}
      />
    );

    const img = container.querySelector('img');
    expect(img.getAttribute('src')).toContain('h_100');
  });
});
