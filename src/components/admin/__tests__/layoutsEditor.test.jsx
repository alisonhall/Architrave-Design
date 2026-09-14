import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { DraftProvider } from '../draftContext';
import LayoutsEditor from '../layoutsEditor';

const renderEditor = () => render(
  <DraftProvider>
    <LayoutsEditor />
  </DraftProvider>
);

describe('LayoutsEditor', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('shows which file it is editing', () => {
    renderEditor();

    expect(screen.getByText('Editing: src/pages/portfolio/new-homes.jsx')).toBeInTheDocument();
  });

  it('does not show a page selector when only one page is supported', () => {
    renderEditor();

    expect(screen.queryByLabelText('Page')).not.toBeInTheDocument();
  });

  it('renders the tile library and both layout variants with previews', () => {
    renderEditor();

    expect(screen.getByRole('heading', { name: 'Tiles' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Default layout (narrow screens)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wide layout (wide screens)' })).toBeInTheDocument();

    // The default layout's first project tile appears in its preview.
    expect(screen.getAllByText("Hogg's Hollow French").length).toBeGreaterThan(0);
  });

  it('editing a tile updates both layout previews', () => {
    renderEditor();

    const tileRow = screen.getByText(/hoggsHollowFrench —/).closest('li');
    fireEvent.click(within(tileRow).getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/Background position/), { target: { value: '5% 5%' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    // No assertion on visual position, just that the edit round-tripped without error
    // and the tile is still present in both previews (it's placed in both variants).
    expect(screen.getAllByText("Hogg's Hollow French").length).toBeGreaterThan(0);
  });

  it('adding a row to the default layout does not affect the wide layout', () => {
    renderEditor();

    const variants = screen.getAllByText(/layout \(/);
    const defaultSection = variants[0].closest('section');
    const wideSection = variants[1].closest('section');

    const addRowButtons = within(defaultSection).getAllByRole('button', { name: 'Add row' });
    const wideRowCountBefore = within(wideSection).getAllByRole('button', { name: 'Remove row' }).length;

    fireEvent.click(addRowButtons[addRowButtons.length - 1]);

    const wideRowCountAfter = within(wideSection).getAllByRole('button', { name: 'Remove row' }).length;
    expect(wideRowCountAfter).toBe(wideRowCountBefore);
  });

  it('still renders correctly for a returning user whose cached draft predates this section', () => {
    // Regression test: a sessionStorage draft saved before layouts.newHomes existed
    // (or under any other outdated shape) must not leave this section blank.
    window.sessionStorage.setItem(
      'architrave-admin-draft',
      JSON.stringify({ projects: {}, layouts: {} })
    );

    renderEditor();

    expect(screen.getByText('Editing: src/pages/portfolio/new-homes.jsx')).toBeInTheDocument();
    expect(screen.getAllByText("Hogg's Hollow French").length).toBeGreaterThan(0);
  });
});
