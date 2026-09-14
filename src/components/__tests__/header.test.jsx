import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../header';

describe('Header', () => {
  it('renders the practice name and title', () => {
    render(<Header />);

    expect(screen.getByText('Architrave Design')).toBeInTheDocument();
    expect(screen.getByText('Architect')).toBeInTheDocument();
  });

  it('applies the className prop to the header element', () => {
    const { container } = render(<Header className="top" />);

    expect(container.querySelector('header')).toHaveClass('top');
  });

  it('renders without a className when none is provided', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('header').className).toBe('');
  });
});
