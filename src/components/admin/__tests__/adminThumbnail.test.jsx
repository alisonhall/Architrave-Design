import React from 'react';
import { render } from '@testing-library/react';

import AdminThumbnail from '../adminThumbnail';

describe('AdminThumbnail', () => {
  it('renders nothing when there is no imageUrl', () => {
    const { container } = render(<AdminThumbnail />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies a Cloudinary resize transform to an upload URL', () => {
    const { container } = render(
      <AdminThumbnail imageUrl="https://res.cloudinary.com/demo/image/upload/v123/folder/photo.jpg" />
    );

    const img = container.querySelector('img');
    expect(img).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/demo/image/upload/h_80,c_fill,f_auto,q_auto/v123/folder/photo.jpg'
    );
  });

  it('does not double-transform a URL that already has a resize modifier', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/w_auto,c_scale/v123/folder/photo.jpg';
    const { container } = render(<AdminThumbnail imageUrl={url} />);

    expect(container.querySelector('img')).toHaveAttribute('src', url);
  });

  it('uses a non-Cloudinary URL as-is', () => {
    const url = 'https://example.com/photo.jpg';
    const { container } = render(<AdminThumbnail imageUrl={url} />);

    expect(container.querySelector('img')).toHaveAttribute('src', url);
  });

  it('renders with an empty alt text (decorative)', () => {
    const { container } = render(<AdminThumbnail imageUrl="https://example.com/photo.jpg" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});
