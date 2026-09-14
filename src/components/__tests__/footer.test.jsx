import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../footer';

describe('Footer', () => {
  it('renders the sitemap link', () => {
    render(<Footer />);

    const link = screen.getByText('Site Map');
    expect(link).toHaveAttribute('href', '/sitemap');
  });

  it('renders the current year in the copyright notice', () => {
    render(<Footer />);

    expect(
      screen.getByText(`© ${new Date().getFullYear()}`)
    ).toBeInTheDocument();
  });

  it('renders the Houzz badges', () => {
    render(<Footer />);

    expect(screen.getAllByAltText(/Houzz/i).length).toBeGreaterThan(0);
  });
});
