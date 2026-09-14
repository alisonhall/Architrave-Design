import React from 'react';
import { render, screen } from '@testing-library/react';

import Column from '../column';

describe('Column', () => {
  it('renders its children', () => {
    render(
      <Column>
        <p>child content</p>
      </Column>
    );

    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies the column class', () => {
    const { container } = render(
      <Column>
        <p>child content</p>
      </Column>
    );

    expect(container.querySelector('.column')).toBeInTheDocument();
  });

  it('renders with a width prop without crashing', () => {
    const { container } = render(
      <Column width="48%">
        <p>child content</p>
      </Column>
    );

    expect(container.querySelector('.column')).toBeInTheDocument();
  });
});
