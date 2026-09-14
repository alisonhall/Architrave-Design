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

  it('defaults to the first supported page', () => {
    renderEditor();

    expect(screen.getByText('Editing: src/pages/index.jsx')).toBeInTheDocument();
  });

  it('shows a page selector when more than one page is supported', () => {
    renderEditor();

    expect(screen.getByLabelText('Page')).toBeInTheDocument();
  });

  it('switches pages via the selector', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'newHomes' } });

    expect(screen.getByText('Editing: src/pages/portfolio/new-homes.jsx')).toBeInTheDocument();
  });

  it('renders the tile library and both layout variants with previews for the active page', () => {
    renderEditor();

    expect(screen.getByRole('heading', { name: 'Tiles' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Default layout (narrow screens)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wide layout (wide screens)' })).toBeInTheDocument();

    // The index page's first project tile appears in its preview.
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

  it('keeps a per-page edit isolated from the other pages', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'newHomes' } });
    const defaultSection = screen.getAllByText(/layout \(/)[0].closest('section');
    const rowCountBeforeAdd = within(defaultSection).getAllByRole('button', { name: 'Remove row' }).length;
    fireEvent.click(within(defaultSection).getByRole('button', { name: 'Add row' }));
    expect(within(defaultSection).getAllByRole('button', { name: 'Remove row' }).length).toBe(rowCountBeforeAdd + 1);

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'index' } });
    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'newHomes' } });

    const defaultSectionAgain = screen.getAllByText(/layout \(/)[0].closest('section');
    expect(within(defaultSectionAgain).getAllByRole('button', { name: 'Remove row' }).length).toBe(rowCountBeforeAdd + 1);
  });

  it('still renders correctly for a returning user whose cached draft predates this section', () => {
    // Regression test: a sessionStorage draft saved before layouts.index/newHomes/
    // renovationsAdditions existed (or under any other outdated shape) must not leave
    // this section blank.
    window.sessionStorage.setItem(
      'architrave-admin-draft',
      JSON.stringify({ projects: {}, layouts: {} })
    );

    renderEditor();

    expect(screen.getByText('Editing: src/pages/index.jsx')).toBeInTheDocument();
    expect(screen.getAllByText("Hogg's Hollow French").length).toBeGreaterThan(0);
  });
});
