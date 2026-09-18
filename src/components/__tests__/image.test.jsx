import React from 'react';
import { render } from '@testing-library/react';

import Image from '../image';

describe('Image', () => {
  it('returns null when neither image nor imageUrl is provided', () => {
    const { container } = render(<Image />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the image prop directly when there is no imageUrl', () => {
    const { container } = render(<Image image="local-image-stub" />);

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'local-image-stub');
  });

  it('renders a plain imageUrl unmodified when it has no cloudinary upload segment', () => {
    const { container } = render(
      <Image imageUrl="https://example.com/photo.jpg" />
    );

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('injects a width-based cloudinary transform for a cloudinary upload URL', () => {
    const { container } = render(
      <Image imageUrl="https://res.cloudinary.com/demo/image/upload/v1/photo.jpg" />
    );

    const img = container.querySelector('img');
    expect(img.getAttribute('src')).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_auto,c_scale,f_auto,q_auto/v1/photo.jpg'
    );
  });

  it('injects a height-based cloudinary transform when a height is provided', () => {
    const { container } = render(
      <Image
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1/photo.jpg"
        height={100}
      />
    );

    const img = container.querySelector('img');
    expect(img.getAttribute('src')).toBe(
      'https://res.cloudinary.com/demo/image/upload/h_200,c_scale,f_auto,q_auto/v1/photo.jpg'
    );
  });

  it('prefers dimensions.height over the height prop for the transform', () => {
    const { container } = render(
      <Image
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1/photo.jpg"
        dimensions={{ height: 50 }}
      />
    );

    const img = container.querySelector('img');
    expect(img.getAttribute('src')).toBe(
      'https://res.cloudinary.com/demo/image/upload/h_100,c_scale,f_auto,q_auto/v1/photo.jpg'
    );
  });

  it('applies the altText, num, and customClass props', () => {
    const { container } = render(
      <Image
        imageUrl="https://example.com/photo.jpg"
        altText="A house"
        num={3}
        customClass="filler"
      />
    );

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'A house');
    expect(img).toHaveClass('imageDiv', 'imageDiv3', 'filler');
  });
});
