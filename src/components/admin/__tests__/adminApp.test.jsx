import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

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
    expect(screen.getByLabelText('Portfolio introduction text')).toBeInTheDocument();
  });

  it('switches sections when a nav button is clicked', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'About' }));

    expect(screen.getByRole('button', { name: 'About' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Projects' })).not.toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Introduction' })).toBeInTheDocument();
  });

  it('renders the about editor in the About section', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'About' }));

    expect(screen.getAllByText('Bill Hall').length).toBeGreaterThan(0);
  });

  it('renders the reviews editor in the Reviews section', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'Reviews' }));

    expect(screen.getAllByText(/Marisa C/).length).toBeGreaterThan(0);
  });

  it('renders the output panel in the Review Changes section', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'Review Changes' }));

    expect(screen.getByText(/no changes yet/i)).toBeInTheDocument();
  });

  it('renders the layouts editor in the Layouts section', () => {
    render(<AdminApp />);

    fireEvent.click(screen.getByRole('button', { name: 'Layouts' }));

    expect(screen.getByText('Editing: static/layouts/index.js')).toBeInTheDocument();
  });

  it('shares draft state between the Projects and Layouts sections', () => {
    render(<AdminApp />);

    const introTextarea = screen.getByLabelText('Portfolio introduction text');
    fireEvent.change(introTextarea, { target: { value: 'Shared intro across sections.' } });

    fireEvent.click(screen.getByRole('button', { name: 'Layouts' }));

    expect(screen.getAllByText('Shared intro across sections.').length).toBeGreaterThan(0);
  });
});

describe('AdminApp — deleting a project', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.confirm = jest.fn(() => true);
  });

  it('removes its tiles from the layouts, drops its page from the Layouts editor, and lists that page\'s files to delete', () => {
    render(<AdminApp />);

    const section = screen.getByRole('heading', { name: 'New Homes' }).closest('section');
    const row = within(section).getAllByText("Hogg's Hollow French")[0].closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Delete' }));
    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('remove its page, Hoggs Hollow French (New Homes detail page)'));

    fireEvent.click(screen.getByRole('button', { name: 'Layouts' }));
    // The home page no longer shows its tile...
    expect(screen.queryByText("Hogg's Hollow French")).not.toBeInTheDocument();
    // ...and its detail page can't be picked any more.
    expect(within(screen.getByLabelText('Page')).queryByRole('option', { name: /Hoggs Hollow French \(New Homes detail page\)/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Review Changes' }));
    expect(screen.getAllByText('Delete this file')).toHaveLength(4);
    expect(screen.getByText('src/pages/portfolio/new-homes/hoggs-hollow-french.jsx')).toBeInTheDocument();
  });
});
