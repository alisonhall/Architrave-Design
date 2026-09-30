import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';

import AdminApp from '../adminApp';
import { seedDraft, SEED_VERSION } from '../seedData';

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

describe('AdminApp — undo, redo and discarding changes', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.sessionStorage.clear();
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  // Separate clicks are separate undo steps in a real browser because a turn of the
  // event loop passes between them; here, that has to be let happen explicitly.
  const nextTurn = () => act(() => { jest.runOnlyPendingTimers(); });

  const newHomes = () => within(screen.getByRole('heading', { name: 'New Homes' }).closest('section'));
  const hideFirstShown = () => {
    const shownList = newHomes().getAllByRole('list')[0];
    const firstRow = within(shownList).getAllByRole('listitem')[0];
    const name = firstRow.querySelector('.adminProjectsEditor-name').textContent;
    fireEvent.click(within(firstRow).getByRole('button', { name: 'Hide' }));
    return name;
  };
  const shownNames = () => within(newHomes().getAllByRole('list')[0])
    .getAllByRole('listitem').map((row) => row.querySelector('.adminProjectsEditor-name').textContent);

  it('starts with nothing to undo, redo or discard', () => {
    render(<AdminApp />);
    ['Undo', 'Redo', 'Discard all changes'].forEach((name) => expect(screen.getByRole('button', { name })).toBeDisabled());
  });

  it('undoes and redoes an edit from the buttons — one step even though it changed two lists', () => {
    render(<AdminApp />);
    const before = shownNames();
    const hidden = hideFirstShown();
    expect(shownNames()).not.toContain(hidden);
    nextTurn();

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(shownNames()).toEqual(before);
    expect(screen.getByRole('button', { name: 'Undo' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Redo' }));
    expect(shownNames()).not.toContain(hidden);
  });

  it('Ctrl/Cmd+Z undoes and Ctrl/Cmd+Shift+Z or Ctrl+Y redoes — but not while typing in a field', () => {
    render(<AdminApp />);
    const hidden = hideFirstShown();
    nextTurn();

    fireEvent.keyDown(screen.getByRole('textbox', { name: /introduction/i }), { key: 'z', ctrlKey: true });
    expect(shownNames()).not.toContain(hidden);

    fireEvent.keyDown(document.body, { key: 'z', metaKey: true });
    expect(shownNames()).toContain(hidden);
    fireEvent.keyDown(document.body, { key: 'Z', ctrlKey: true, shiftKey: true });
    expect(shownNames()).not.toContain(hidden);
    fireEvent.keyDown(document.body, { key: 'z', ctrlKey: true });
    fireEvent.keyDown(document.body, { key: 'y', ctrlKey: true });
    expect(shownNames()).not.toContain(hidden);

    // Other shortcuts are left alone.
    fireEvent.keyDown(document.body, { key: 'z' });
    fireEvent.keyDown(document.body, { key: 'z', ctrlKey: true, altKey: true });
    fireEvent.keyDown(document.body, { key: 's', ctrlKey: true });
    expect(shownNames()).not.toContain(hidden);
  });

  it('"Discard all changes" asks first, goes back to the site as it is, and can itself be undone', () => {
    render(<AdminApp />);
    const before = shownNames();
    const hidden = hideFirstShown();
    nextTurn();

    window.confirm = jest.fn(() => false);
    fireEvent.click(screen.getByRole('button', { name: 'Discard all changes' }));
    expect(shownNames()).not.toContain(hidden);

    window.confirm = jest.fn(() => true);
    fireEvent.click(screen.getByRole('button', { name: 'Discard all changes' }));
    expect(shownNames()).toEqual(before);
    expect(screen.getByRole('button', { name: 'Discard all changes' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(shownNames()).not.toContain(hidden);
  });

  it('asks before leaving the page only while there are changes', () => {
    render(<AdminApp />);
    const leave = () => {
      const event = new Event('beforeunload', { cancelable: true });
      window.dispatchEvent(event);
      return event.defaultPrevented;
    };

    expect(leave()).toBe(false);
    hideFirstShown();
    expect(leave()).toBe(true);
  });
});

describe('AdminApp — notices about the draft', () => {
  const STORAGE_KEY = 'architrave-admin-draft';

  beforeEach(() => window.sessionStorage.clear());
  afterEach(() => jest.restoreAllMocks());

  it('warns when changes can\'t be saved in the tab', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceededError'); });
    render(<AdminApp />);
    expect(screen.getByRole('alert')).toHaveTextContent('couldn\'t be saved in this browser tab');
  });

  it('says so (dismissibly) when a stored draft couldn\'t be restored', () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ __seedVersion: SEED_VERSION - 1 }));
    render(<AdminApp />);

    expect(screen.getByText(/previous draft couldn.t be restored/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText(/previous draft couldn.t be restored/)).not.toBeInTheDocument();
  });

  it('warns (dismissibly) when the draft predates the site\'s current content', () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...seedDraft, reviews: [], __seedVersion: SEED_VERSION, __seedFingerprint: 'older' }));
    render(<AdminApp />);

    expect(screen.getByText(/content has been updated since this draft was started/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText(/content has been updated/)).not.toBeInTheDocument();
  });
});

describe('AdminApp — the project edit form when its project disappears', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.sessionStorage.clear();
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('closes instead of crashing when Redo deletes the project being edited', () => {
    render(<AdminApp />);
    const nextTurn = () => act(() => { jest.runOnlyPendingTimers(); });
    const row = () => within(screen.getByRole('heading', { name: 'New Homes' }).closest('section'))
      .getAllByText("Hogg's Hollow French")[0].closest('li');

    fireEvent.click(within(row()).getByRole('button', { name: 'Delete' }));
    nextTurn();
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    nextTurn();
    fireEvent.click(within(row()).getByRole('button', { name: 'Edit' }));
    expect(screen.getByRole('heading', { name: "Editing: Hogg's Hollow French" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Redo' }));

    expect(screen.queryByRole('heading', { name: /^Editing:/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo' })).toBeEnabled();
  });
});
