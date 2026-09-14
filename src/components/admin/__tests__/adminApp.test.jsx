import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import AdminApp from '../adminApp';

describe('AdminApp', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renders a nav button for every section', () => {
    render(<AdminApp />);

    ['Projects', 'Layouts', 'About', 'Reviews', 'Review Changes'].forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
  });

  it('defaults to the Projects section', () => {
    render(<AdminApp />);

    expect(screen.getByRole('button', { name: 'Projects' })).toHaveClass('active');
    expect(screen.getByText(/Projects editor isn't built yet/)).toBeInTheDocument();
  });

  it('switches sections when a nav button is clicked', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'About' }));

    expect(screen.getByRole('button', { name: 'About' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Projects' })).not.toHaveClass('active');
    expect(screen.getByText(/About editor isn't built yet/)).toBeInTheDocument();
  });

  it('renders the output panel in the Review Changes section', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'Review Changes' }));

    expect(screen.getByText(/no changes yet/i)).toBeInTheDocument();
  });
});
