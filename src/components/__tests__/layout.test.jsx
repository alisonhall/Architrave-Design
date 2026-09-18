import React from 'react';
import { render, screen } from '@testing-library/react';

import Layout from '../layout';

describe('Layout', () => {
  it('renders the header, navigation, footer, and children', () => {
    render(
      <Layout urlPath="/about">
        <p>page content</p>
      </Layout>
    );

    expect(screen.getAllByText('Architrave Design').length).toBeGreaterThan(0);
    expect(screen.getByText('page content')).toBeInTheDocument();
    expect(screen.getByText('Site Map')).toBeInTheDocument();
  });

  it('applies mainClasses to the content wrapper', () => {
    const { container } = render(
      <Layout urlPath="/" mainClasses="index home">
        <p>page content</p>
      </Layout>
    );

    expect(container.querySelector('.content')).toHaveClass('content', 'index', 'home');
  });

  it('marks the portfolio nav item as selected for portfolio paths', () => {
    render(
      <Layout urlPath="/portfolio/new-homes">
        <p>page content</p>
      </Layout>
    );

    expect(screen.getByText('New Homes')).toHaveClass('selected');
  });
});
