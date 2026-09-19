import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { DraftProvider, useDraftSection } from '../draftContext';
import { seedDraft, SEED_VERSION } from '../seedData';

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
