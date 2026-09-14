import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { DraftProvider, useDraftSection } from '../draftContext';
import { seedDraft } from '../seedData';

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

  it('hydrates from a previously persisted draft on mount', () => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...seedDraft, defaultIntroductionText: 'Persisted from a prior session' })
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
});
