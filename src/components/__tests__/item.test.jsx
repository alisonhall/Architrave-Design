import React from 'react';
import { render, screen } from '@testing-library/react';

import Item from '../item';

describe('Item', () => {
  it('renders an ImageLinkTile when both image and link are provided', () => {
    render(
      <Item
        image={{ imageUrl: 'https://example.com/photo.jpg' }}
        link={{ linkUrl: '/some-project' }}
        text={{ copy: 'Some Project' }}
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/some-project');
    expect(link).toHaveClass('item', 'image', 'image0');
  });

  it('renders an ImageFillerTile when image and isFiller are provided', () => {
    const { container } = render(
      <Item image={{ imageUrl: 'https://example.com/photo.jpg' }} isFiller num={2} />
    );

    expect(container.querySelector('.imageFiller')).toBeInTheDocument();
    expect(container.querySelector('.imageFiller')).toHaveClass('item', 'image', 'image2');
  });

  it('renders an ImageTile when only image is provided', () => {
    const { container } = render(
      <Item image={{ imageUrl: 'https://example.com/photo.jpg' }} num={5} />
    );

    expect(container.querySelector('.image-tile')).toHaveClass('item', 'image', 'image5');
  });

  it('renders a TextBlurb when only text is provided', () => {
    render(<Item text={{ copy: 'Some copy' }} />);

    expect(screen.getByText('Some copy')).toBeInTheDocument();
  });

  it('renders the raw content when content is provided', () => {
    render(<Item content={<span>Custom content</span>} num={7} customClass="wide" />);

    expect(screen.getByText('Custom content')).toBeInTheDocument();
    expect(screen.getByText('Custom content').parentElement).toHaveClass(
      'item',
      'wide',
      'image',
      'image7'
    );
  });

  it('renders a TextBlurbFiller when no image, text, or content is provided', () => {
    const { container } = render(<Item />);

    expect(container.querySelector('.textBlurbFiller')).toBeInTheDocument();
  });
});
