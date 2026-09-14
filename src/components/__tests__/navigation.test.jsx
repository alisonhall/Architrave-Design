import React from 'react';
import { render, screen } from '@testing-library/react';

import Navigation from '../navigation';

describe('Navigation', () => {
  it('renders the logo link to the homepage', () => {
    render(<Navigation urlPath="/" />);

    expect(screen.getByAltText('Architrave Design, Architect logo').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders the main navigation links', () => {
    render(<Navigation urlPath="/" />);

    expect(screen.getByText('Portfolio')).toHaveAttribute('href', '/portfolio/new-homes');
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
    expect(screen.getByText('Reviews')).toHaveAttribute('href', '/reviews');
    expect(screen.getByText('Contact')).toHaveAttribute('href', '/contact');
  });

  it('shows the subnav when the urlPath is within the portfolio', () => {
    const { container } = render(<Navigation urlPath="/portfolio/new-homes" />);

    expect(container.querySelector('.subNav')).toHaveClass('subNavVisible');
  });

  it('hides the subnav when the urlPath is outside the portfolio', () => {
    const { container } = render(<Navigation urlPath="/about" />);

    expect(container.querySelector('.subNav')).not.toHaveClass('subNavVisible');
  });

  it('marks the new homes link as selected when on a new-homes path', () => {
    render(<Navigation urlPath="/portfolio/new-homes/credit-river-manor" />);

    expect(screen.getByText('New Homes')).toHaveClass('selected');
    expect(screen.getByText('Renovations')).not.toHaveClass('selected');
  });

  it('marks the renovations link as selected when on a renovations path', () => {
    render(<Navigation urlPath="/portfolio/renovations-additions" />);

    expect(screen.getByText('Renovations')).toHaveClass('selected');
    expect(screen.getByText('New Homes')).not.toHaveClass('selected');
  });
});
