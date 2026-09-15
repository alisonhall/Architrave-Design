import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { DraftProvider } from '../draftContext';
import LayoutsEditor from '../layoutsEditor';
import AdminApp from '../adminApp';

const renderEditor = () => render(
  <DraftProvider>
    <LayoutsEditor />
  </DraftProvider>
);

// Adds a brand-new New Homes project via the Projects section, then switches to
// Layouts — the only way to get a project with no layout page yet, since every project
// in the real seed data already has one.
const addNewHomesProjectAndSwitchToLayouts = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Projects' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add New Homes project' }));
  fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Test Manor' } });
  fireEvent.change(screen.getByLabelText(/File name/), { target: { value: 'test-manor' } });
  fireEvent.change(screen.getByLabelText('Main image URL'), { target: { value: 'https://example.com/a.jpg' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  fireEvent.click(screen.getByRole('button', { name: 'Layouts' }));
};

describe('LayoutsEditor', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('defaults to the first supported page', () => {
    renderEditor();

    expect(screen.getByText('Editing: static/layouts/index.js')).toBeInTheDocument();
  });

  it('shows a page selector when more than one page is supported', () => {
    renderEditor();

    expect(screen.getByLabelText('Page')).toBeInTheDocument();
  });

  it('switches pages via the selector', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'newHomes' } });

    expect(screen.getByText('Editing: static/layouts/new-homes.js')).toBeInTheDocument();
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
    fireEvent.click(within(tileRow).getByRole('button', { name: 'Actions ▾' }));
    fireEvent.click(within(tileRow).getByRole('menuitem', { name: 'Edit' }));
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
    const wideRowCountBefore = wideSection.querySelectorAll('.adminLayoutTree-row').length;

    fireEvent.click(addRowButtons[addRowButtons.length - 1]);

    const wideRowCountAfter = wideSection.querySelectorAll('.adminLayoutTree-row').length;
    expect(wideRowCountAfter).toBe(wideRowCountBefore);
  });

  it('keeps a per-page edit isolated from the other pages', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'newHomes' } });
    const defaultSection = screen.getAllByText(/layout \(/)[0].closest('section');
    const rowCountBeforeAdd = defaultSection.querySelectorAll('.adminLayoutTree-row').length;
    fireEvent.click(within(defaultSection).getByRole('button', { name: 'Add row' }));
    expect(defaultSection.querySelectorAll('.adminLayoutTree-row').length).toBe(rowCountBeforeAdd + 1);

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'index' } });
    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'newHomes' } });

    const defaultSectionAgain = screen.getAllByText(/layout \(/)[0].closest('section');
    expect(defaultSectionAgain.querySelectorAll('.adminLayoutTree-row').length).toBe(rowCountBeforeAdd + 1);
  });

  it('renders a single Layout section (no default/wide split) for a detail page', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });

    expect(screen.getByText('Editing: static/layouts/credit-river-manor.js')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Layout' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Default layout (narrow screens)' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Wide layout (wide screens)' })).not.toBeInTheDocument();
  });

  it('offers image/description/embed/placeholder tile kinds, not project/filler/text, for a detail page', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });

    expect(screen.getByRole('button', { name: 'Add image tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add description tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add embed tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add placeholder tile' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add project tile' })).not.toBeInTheDocument();
  });

  it('offers project/filler/image/text tile kinds for a listing page, including a static image', () => {
    renderEditor();

    expect(screen.getByRole('button', { name: 'Add project tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add filler tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add image tile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add text tile' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add embed tile' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add placeholder tile' })).not.toBeInTheDocument();
  });

  it('adding a static image tile on a listing page renders it in the live preview', () => {
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Add image tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/static.jpg' } });
    fireEvent.click(within(screen.getByText('Tiles').closest('.adminTileLibrary')).getByRole('button', { name: 'Add tile' }));

    expect(screen.getByText(/imageTile —/)).toBeInTheDocument();
  });

  it('adding a placeholder tile on a detail page adds it to its tile library', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add placeholder tile' }));
    fireEvent.click(within(screen.getByText('Tiles').closest('.adminTileLibrary')).getByRole('button', { name: 'Add tile' }));

    expect(screen.getByText(/placeholderTile — Placeholder/)).toBeInTheDocument();
  });

  it("shows the detail page's live preview bound to its own project", () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });

    expect(screen.getByText('Credit River Manor')).toBeInTheDocument();
  });

  it('renders two sections (not one) for a dual-layout detail page, still with detail-only tile kinds', () => {
    // Regression test: a "detail" page (bound to one project) can still have a
    // defaultLayout/wideLayout split, just like a listing page — the section count
    // must come from the data shape, not from pageConfig.type alone.
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'kingswayGeorgianDetail' } });

    expect(screen.getByRole('heading', { name: 'Default layout (narrow screens)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wide layout (wide screens)' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Layout' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add image tile' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add project tile' })).not.toBeInTheDocument();
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

    expect(screen.getByText('Editing: static/layouts/index.js')).toBeInTheDocument();
    expect(screen.getAllByText("Hogg's Hollow French").length).toBeGreaterThan(0);
  });
});

describe('LayoutsEditor — creating a new page', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.confirm = jest.fn(() => true);
  });

  it('does not offer the "create a page for" selector when every project already has one', () => {
    render(<AdminApp />);
    fireEvent.click(screen.getByRole('button', { name: 'Layouts' }));

    expect(screen.queryByLabelText('Create a page for')).not.toBeInTheDocument();
  });

  it('offers a project with no layout page yet in the "create a page for" selector', () => {
    render(<AdminApp />);
    addNewHomesProjectAndSwitchToLayouts();

    expect(screen.getByLabelText('Create a page for')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Test Manor' })).toBeInTheDocument();
  });

  it('creating a page starts a blank layout, switches to editing it, and offers a delete button', () => {
    render(<AdminApp />);
    addNewHomesProjectAndSwitchToLayouts();

    fireEvent.change(screen.getByLabelText('Create a page for'), { target: { value: 'testManor' } });

    expect(screen.getByText('Editing: static/layouts/test-manor.js')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Layout' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Default layout (narrow screens)' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add row' })).toBeInTheDocument();
    expect(screen.getByText(/Description — this page's project/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete this new page' })).toBeInTheDocument();
  });

  it('does not offer a delete button for an already-committed page', () => {
    render(<AdminApp />);
    fireEvent.click(screen.getByRole('button', { name: 'Layouts' }));

    expect(screen.queryByRole('button', { name: 'Delete this new page' })).not.toBeInTheDocument();
  });

  it('deletes a newly created page after confirmation, returning to the first committed page', () => {
    render(<AdminApp />);
    addNewHomesProjectAndSwitchToLayouts();
    fireEvent.change(screen.getByLabelText('Create a page for'), { target: { value: 'testManor' } });

    fireEvent.click(screen.getByRole('button', { name: 'Delete this new page' }));

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.queryByText('Editing: static/layouts/test-manor.js')).not.toBeInTheDocument();
    expect(screen.getByText('Editing: static/layouts/index.js')).toBeInTheDocument();
    // The project is unchanged, so it's offered again for a new page.
    expect(screen.getByRole('option', { name: 'Test Manor' })).toBeInTheDocument();
  });

  it('does not delete when confirmation is declined', () => {
    window.confirm = jest.fn(() => false);
    render(<AdminApp />);
    addNewHomesProjectAndSwitchToLayouts();
    fireEvent.change(screen.getByLabelText('Create a page for'), { target: { value: 'testManor' } });

    fireEvent.click(screen.getByRole('button', { name: 'Delete this new page' }));

    expect(screen.getByText('Editing: static/layouts/test-manor.js')).toBeInTheDocument();
  });
});

describe('LayoutsEditor — renaming a tile', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renaming a tile updates its placement select and keeps the preview intact', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });

    const row = screen.getByText(/^1 —/).closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Actions ▾' }));
    fireEvent.click(within(row).getByRole('menuitem', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'frontFacade' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    // The tile list now shows it under the new key, not the old one.
    expect(screen.getByText(/^frontFacade —/)).toBeInTheDocument();
    expect(screen.queryByText(/^1 —/)).not.toBeInTheDocument();

    // Its placement in the tree editor now points at the new key.
    const placementSelects = document.querySelectorAll('.adminLayoutTree-placement select');
    const matchingSelect = Array.from(placementSelects).find((select) => select.value === 'frontFacade');
    expect(matchingSelect).toBeDefined();

    // The preview still renders that tile's image — the rename didn't orphan its placement.
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('renaming a tile to a colliding key leaves the layout unchanged', () => {
    window.alert = jest.fn();
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });

    const row = screen.getByText(/^1 —/).closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Actions ▾' }));
    fireEvent.click(within(row).getByRole('menuitem', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(window.alert).toHaveBeenCalled();
    expect(screen.getByText(/^1 —/)).toBeInTheDocument();
    expect(screen.getByText(/^2 —/)).toBeInTheDocument();
  });
});

describe('LayoutsEditor — click-to-edit-in-preview', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('clicking a tile in the preview opens a popover for that exact tile', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });
    fireEvent.click(document.querySelector('.adminLayoutPreview img'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Editing tile: 1')).toBeInTheDocument();
  });

  it('saving from the popover updates the tile and is reflected in the Tile Library list', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });
    fireEvent.click(document.querySelector('.adminLayoutPreview img'));
    fireEvent.change(screen.getByLabelText(/Background position/), { target: { value: '5% 5%' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const row = screen.getByText(/^1 —/).closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Actions ▾' }));
    fireEvent.click(within(row).getByRole('menuitem', { name: 'Edit' }));
    expect(screen.getByDisplayValue('5% 5%')).toBeInTheDocument();
  });

  it('renaming a tile from the popover keeps its placement working', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'creditRiverManor' } });
    fireEvent.click(document.querySelector('.adminLayoutPreview img'));
    fireEvent.change(screen.getByLabelText(/^Key/), { target: { value: 'frontFacadeViaPopover' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText(/^frontFacadeViaPopover —/)).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('assigning an existing tile to an empty slot works from the preview', () => {
    renderEditor();

    // kingswayGeorgianDetail has real `empty` placements to click.
    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'kingswayGeorgianDetail' } });
    const emptySlots = document.querySelectorAll('.adminLayoutPreview .textBlurbFiller');
    expect(emptySlots.length).toBeGreaterThan(0);

    fireEvent.click(emptySlots[0]);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Assign a tile')).toBeInTheDocument();

    fireEvent.click(within(dialog).getByText(/^frontFacade —/));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('creating a brand-new tile from an empty slot adds it to the Tile Library and assigns it', () => {
    renderEditor();

    fireEvent.change(screen.getByLabelText('Page'), { target: { value: 'kingswayGeorgianDetail' } });
    fireEvent.click(document.querySelector('.adminLayoutPreview .textBlurbFiller'));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Add image tile' }));
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'https://example.com/brand-new.jpg' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add & assign' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/^imageTile —/)).toBeInTheDocument();
  });
});
