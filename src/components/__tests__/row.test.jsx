import React from 'react';
import { render, screen } from '@testing-library/react';

import Row from '../row';

describe('Row', () => {
  it('renders its children', () => {
    render(
      <Row>
        <p>child content</p>
      </Row>
    );

    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies the row class', () => {
    const { container } = render(
      <Row>
        <p>child content</p>
      </Row>
    );

    expect(container.querySelector('.row')).toBeInTheDocument();
  });

  it('renders with a height prop without crashing', () => {
    const { container } = render(
      <Row height="300px">
        <p>child content</p>
      </Row>
    );

    expect(container.querySelector('.row')).toBeInTheDocument();
  });
});
