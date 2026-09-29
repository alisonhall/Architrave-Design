import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import {
  DraftProvider,
  useDraftSection,
  useDraftMeta,
  useDraftUpdate,
  useDraftDispatch,
  historyReducer,
  loadInitialDraft,
  draftHasChanges,
  contentJSON,
  sameContent,
  HISTORY_LIMIT,
  TYPING_MERGE_WINDOW
} from '../draftContext';
import { seedDraft, SEED_VERSION } from '../seedData';
import { hydrateLayoutData } from '../layoutHelpers';
import { hydrateReviews } from '../reviewsHelpers';
import indexLayout from '../../../../static/layouts/index';
import reviewsData from '../../../../static/reviews';

const STORAGE_KEY = 'architrave-admin-draft';

const IntroProbe = () => {
  const [defaultIntroductionText, setIntroductionText] = useDraftSection('defaultIntroductionText');
  return (
    <div>
      <p>intro:{defaultIntroductionText}</p>
      <button type="button" onClick={() => setIntroductionText('Updated intro copy')}>
        update
      </button>
    </div>
  );
};

describe('DraftProvider', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('seeds state from seedData when sessionStorage is empty', () => {
    render(
      <DraftProvider>
        <IntroProbe />
      </DraftProvider>
    );

    expect(screen.getByText(`intro:${seedDraft.defaultIntroductionText}`)).toBeInTheDocument();
  });

  it('updates a section via useDraftSection and persists it to sessionStorage', () => {
    render(
      <DraftProvider>
        <IntroProbe />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('update'));

    expect(screen.getByText('intro:Updated intro copy')).toBeInTheDocument();

    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY));
    expect(stored.defaultIntroductionText).toBe('Updated intro copy');
  });

  it('hydrates from a previously persisted draft of the current seed version', () => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...seedDraft, defaultIntroductionText: 'Persisted from a prior session', __seedVersion: SEED_VERSION })
    );

    render(
      <DraftProvider>
        <IntroProbe />
      </DraftProvider>
    );

    expect(screen.getByText('intro:Persisted from a prior session')).toBeInTheDocument();
  });

  it('falls back to seed data when sessionStorage holds invalid JSON', () => {
    window.sessionStorage.setItem(STORAGE_KEY, '{not valid json');

    render(
      <DraftProvider>
        <IntroProbe />
      </DraftProvider>
    );

    expect(screen.getByText(`intro:${seedDraft.defaultIntroductionText}`)).toBeInTheDocument();
  });

  it('discards a persisted draft saved under an older seed version, rather than shallow-merging it', () => {
    // Simulates a returning user whose cached draft predates a new seed section (e.g.
    // layouts.newHomes didn't exist yet) — shallow-merging that stale draft would
    // silently clobber the new section with nothing, leaving that part of the UI blank.
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...seedDraft, layouts: {}, defaultIntroductionText: 'Stale pre-migration draft' })
    );

    render(
      <DraftProvider>
        <IntroProbe />
      </DraftProvider>
    );

    expect(screen.getByText(`intro:${seedDraft.defaultIntroductionText}`)).toBeInTheDocument();
  });

  it('always persists the current seed version alongside the draft', () => {
    render(
      <DraftProvider>
        <IntroProbe />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('update'));

    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY));
    expect(stored.__seedVersion).toBe(SEED_VERSION);
  });
});

describe('historyReducer', () => {
  const start = () => ({ past: [], present: { a: 1, b: 1 }, future: [], lastEdit: null });
  const set = (section, value, batch, time) => ({ type: 'SET_SECTION', section, value, batch, time });

  it('records each separate edit as its own undo step, and undo/redo walk through them', () => {
    let state = historyReducer(start(), set('a', 2, 1, 0));
    state = historyReducer(state, set('b', 2, 2, 5000));
    expect(state.past).toEqual([{ a: 1, b: 1 }, { a: 2, b: 1 }]);

    state = historyReducer(state, { type: 'UNDO' });
    expect(state.present).toEqual({ a: 2, b: 1 });
    state = historyReducer(state, { type: 'UNDO' });
    expect(state.present).toEqual({ a: 1, b: 1 });
    expect(historyReducer(state, { type: 'UNDO' })).toBe(state);

    state = historyReducer(state, { type: 'REDO' });
    expect(state.present).toEqual({ a: 2, b: 1 });
    state = historyReducer(state, { type: 'REDO' });
    expect(state.present).toEqual({ a: 2, b: 2 });
    expect(historyReducer(state, { type: 'REDO' })).toBe(state);
  });

  it('folds edits from the same click (same batch) into one step, across sections', () => {
    let state = historyReducer(start(), set('a', 2, 7, 0));
    state = historyReducer(state, { type: 'SET_SECTIONS', values: { b: 3 }, batch: 7, time: 0 });
    expect(state.past).toEqual([{ a: 1, b: 1 }]);
    expect(state.present).toEqual({ a: 2, b: 3 });
  });

  it('folds quick successive edits to the same single section (typing) into one step, but not slower ones', () => {
    let state = historyReducer(start(), set('a', 2, 1, 0));
    state = historyReducer(state, set('a', 3, 2, TYPING_MERGE_WINDOW - 1));
    expect(state.past).toHaveLength(1);

    state = historyReducer(state, set('a', 4, 3, 2 * TYPING_MERGE_WINDOW + 10));
    expect(state.past).toHaveLength(2);

    // A different section right away is a new step too.
    state = historyReducer(state, set('b', 9, 4, 2 * TYPING_MERGE_WINDOW + 20));
    expect(state.past).toHaveLength(3);
  });

  it('never folds into a step reached by undo/redo', () => {
    let state = historyReducer(start(), set('a', 2, 1, 0));
    state = historyReducer(state, { type: 'UNDO' });
    state = historyReducer(state, set('a', 5, 1, 1));
    expect(state.past).toEqual([{ a: 1, b: 1 }]);
    expect(state.future).toEqual([]);
  });

  it('a new edit clears anything that could have been redone', () => {
    let state = historyReducer(start(), set('a', 2, 1, 0));
    state = historyReducer(state, { type: 'UNDO' });
    expect(state.future).toHaveLength(1);
    state = historyReducer(state, set('b', 2, 2, 5000));
    expect(state.future).toEqual([]);
  });

  it('keeps at most HISTORY_LIMIT steps', () => {
    let state = start();
    for (let i = 0; i < HISTORY_LIMIT + 5; i += 1) state = historyReducer(state, set('a', i + 10, i, i * 5000));
    expect(state.past).toHaveLength(HISTORY_LIMIT);
  });

  it('RESET goes back to the seed as an undoable step, and does nothing when already there', () => {
    let state = historyReducer(start(), { type: 'RESET', batch: 1, time: 0 });
    expect(state.present).toBe(seedDraft);
    expect(state.past).toEqual([{ a: 1, b: 1 }]);
    expect(historyReducer(state, { type: 'RESET', batch: 2, time: 5000 })).toBe(state);
  });

  it('ignores unknown actions and no-op edits', () => {
    const state = start();
    expect(historyReducer(state, { type: 'NOPE' })).toBe(state);
  });
});

describe('loadInitialDraft', () => {
  beforeEach(() => window.sessionStorage.clear());
  afterEach(() => jest.restoreAllMocks());

  it('reports a stored draft it had to discard (older seed version, or unreadable)', () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ __seedVersion: SEED_VERSION - 1 }));
    expect(loadInitialDraft()).toMatchObject({ draft: seedDraft, discarded: true });

    window.sessionStorage.setItem(STORAGE_KEY, '{nope');
    expect(loadInitialDraft()).toMatchObject({ draft: seedDraft, discarded: true });
  });

  it('flags a restored draft started before the site\'s content last changed', () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ __seedVersion: SEED_VERSION, __seedFingerprint: 'old', reviews: [] }));
    expect(loadInitialDraft()).toMatchObject({ discarded: false, staleContent: true, draft: expect.objectContaining({ reviews: [] }) });
  });

  it('doesn\'t flag a draft saved before fingerprints were recorded', () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ __seedVersion: SEED_VERSION }));
    expect(loadInitialDraft()).toMatchObject({ discarded: false, staleContent: false });
  });

  it('starts fresh when storage can\'t be read at all', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(loadInitialDraft()).toMatchObject({ draft: seedDraft, discarded: false, staleContent: false });
  });
});

describe('draftHasChanges', () => {
  it('is false for the seed itself, or an identical copy of it, and true once anything differs', () => {
    expect(draftHasChanges(seedDraft)).toBe(false);
    expect(draftHasChanges(JSON.parse(JSON.stringify(seedDraft)))).toBe(false);
    expect(draftHasChanges({ ...seedDraft, reviews: [] })).toBe(true);
  });
});

describe('DraftProvider — history and status', () => {
  const MetaProbe = () => {
    const meta = useDraftMeta();
    const [intro, setIntro] = useDraftSection('defaultIntroductionText');
    const update = useDraftUpdate();
    return (
      <div>
        <p>intro:{intro}</p>
        <p>{`undo:${meta.canUndo} redo:${meta.canRedo} changed:${meta.hasChanges} saveFailed:${meta.saveFailed}`}</p>
        <button type="button" onClick={() => setIntro('Edited')}>edit</button>
        <button type="button" onClick={() => update({ defaultIntroductionText: 'Both', reviews: [] })}>update</button>
        <button type="button" onClick={meta.undo}>undo</button>
        <button type="button" onClick={meta.redo}>redo</button>
        <button type="button" onClick={meta.reset}>reset</button>
      </div>
    );
  };

  beforeEach(() => window.sessionStorage.clear());
  afterEach(() => jest.restoreAllMocks());

  it('undoes, redoes and resets through useDraftMeta, reporting what\'s possible', () => {
    render(<DraftProvider><MetaProbe /></DraftProvider>);
    expect(screen.getByText('undo:false redo:false changed:false saveFailed:false')).toBeInTheDocument();

    fireEvent.click(screen.getByText('edit'));
    expect(screen.getByText('intro:Edited')).toBeInTheDocument();
    expect(screen.getByText('undo:true redo:false changed:true saveFailed:false')).toBeInTheDocument();

    fireEvent.click(screen.getByText('undo'));
    expect(screen.getByText(`intro:${seedDraft.defaultIntroductionText}`)).toBeInTheDocument();
    expect(screen.getByText('undo:false redo:true changed:false saveFailed:false')).toBeInTheDocument();

    fireEvent.click(screen.getByText('redo'));
    expect(screen.getByText('intro:Edited')).toBeInTheDocument();

    fireEvent.click(screen.getByText('reset'));
    expect(screen.getByText(`intro:${seedDraft.defaultIntroductionText}`)).toBeInTheDocument();
    fireEvent.click(screen.getByText('undo'));
    expect(screen.getByText('intro:Edited')).toBeInTheDocument();
  });

  it('a multi-section update is a single undo step', () => {
    render(<DraftProvider><MetaProbe /></DraftProvider>);
    fireEvent.click(screen.getByText('update'));
    fireEvent.click(screen.getByText('undo'));
    expect(screen.getByText(`intro:${seedDraft.defaultIntroductionText}`)).toBeInTheDocument();
    expect(screen.getByText(/undo:false/)).toBeInTheDocument();
  });

  it('reports when the draft couldn\'t be saved, and clears that once a save works again', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceededError'); });
    render(<DraftProvider><MetaProbe /></DraftProvider>);
    expect(screen.getByText(/saveFailed:true/)).toBeInTheDocument();

    setItem.mockRestore();
    fireEvent.click(screen.getByText('edit'));
    expect(screen.getByText(/saveFailed:false/)).toBeInTheDocument();
  });

  it('persists the content fingerprint alongside the seed version', () => {
    render(<DraftProvider><MetaProbe /></DraftProvider>);
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY));
    expect(typeof stored.__seedFingerprint).toBe('string');
  });

  it('useDraftMeta refuses to work outside a DraftProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<MetaProbe />)).toThrow(/within a DraftProvider/);
  });

describe('draft hooks outside a DraftProvider', () => {
  it('refuse to work', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const Probe = () => { useDraftSection('reviews'); return null; };
    expect(() => render(<Probe />)).toThrow(/useDraftState must be used within a DraftProvider/);
    jest.restoreAllMocks();
  });
});
});

describe('useDraftDispatch outside a DraftProvider', () => {
  it('refuses to work', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const Probe = () => { useDraftDispatch(); return null; };
    expect(() => render(<Probe />)).toThrow(/useDraftDispatch must be used within a DraftProvider/);
    jest.restoreAllMocks();
  });
});

describe('comparing content, not editor-only ids', () => {
  // What a page reload does: the same committed data hydrated again, with new random ids.
  const reloaded = () => ({
    ...JSON.parse(JSON.stringify(seedDraft)),
    layouts: { ...seedDraft.layouts, index: hydrateLayoutData(indexLayout) },
    reviews: hydrateReviews(reviewsData)
  });

  it('sees the same data with different ids as the same content', () => {
    const again = reloaded();
    expect(JSON.stringify(again.layouts.index)).not.toBe(JSON.stringify(seedDraft.layouts.index));
    expect(sameContent(again.layouts.index, seedDraft.layouts.index)).toBe(true);
    expect(sameContent(again.reviews, seedDraft.reviews)).toBe(true);
    expect(contentJSON(again)).toBe(contentJSON(seedDraft));
  });

  it('so an untouched draft restored after a reload has no changes', () => {
    expect(draftHasChanges(reloaded())).toBe(false);
  });

  it('while a real change still counts', () => {
    const edited = reloaded();
    edited.reviews = edited.reviews.slice(1);
    expect(draftHasChanges(edited)).toBe(true);
  });
});

describe('DraftProvider — a draft started before the site\'s content changed', () => {
  const StaleProbe = () => {
    const { staleContent, reset } = useDraftMeta();
    return (
      <div>
        <p>{`stale:${staleContent}`}</p>
        <button type="button" onClick={reset}>reset</button>
      </div>
    );
  };

  beforeEach(() => window.sessionStorage.clear());

  it('stays flagged on every later load, not just the first, until it no longer differs from the site', () => {
    const stored = { ...JSON.parse(JSON.stringify(seedDraft)), reviews: [], __seedVersion: SEED_VERSION, __seedFingerprint: 'older' };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    const first = render(<DraftProvider><StaleProbe /></DraftProvider>);
    expect(screen.getByText('stale:true')).toBeInTheDocument();
    expect(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)).__seedFingerprint).toBe('older');
    first.unmount();

    // A second refresh.
    const second = render(<DraftProvider><StaleProbe /></DraftProvider>);
    expect(screen.getByText('stale:true')).toBeInTheDocument();

    // Discarding the old draft makes it plain current content — nothing left to warn about.
    fireEvent.click(screen.getByText('reset'));
    expect(screen.getByText('stale:false')).toBeInTheDocument();
    expect(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)).__seedFingerprint).not.toBe('older');
    second.unmount();
  });

  it('isn\'t flagged when the old draft has no changes of its own (it can\'t undo anything)', () => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...seedDraft, __seedVersion: SEED_VERSION, __seedFingerprint: 'older' }));
    render(<DraftProvider><StaleProbe /></DraftProvider>);
    expect(screen.getByText('stale:false')).toBeInTheDocument();
  });
});
