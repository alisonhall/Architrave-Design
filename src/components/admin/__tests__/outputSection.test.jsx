import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { DraftProvider, useDraftSection } from '../draftContext';
import OutputSection from '../outputSection';

// A tiny helper to mutate the draft from outside the Projects editor, so this test can
// focus purely on OutputSection's own behaviour (show/hide, generated content).
const IntroTextMutator = () => {
  const [, setIntro] = useDraftSection('defaultIntroductionText');
  return (
    <button type="button" onClick={() => setIntro('A brand new introduction.')}>
      mutate intro
    </button>
  );
};

const LayoutsMutator = () => {
  const [, setLayouts] = useDraftSection('layouts');
  return (
    <button type="button" onClick={() => setLayouts({ unrelated: true })}>
      mutate layouts
    </button>
  );
};

describe('OutputSection', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('shows no files when the draft matches the live site', () => {
    render(
      <DraftProvider>
        <OutputSection />
      </DraftProvider>
    );

    expect(screen.getByText(/no changes yet/i)).toBeInTheDocument();
  });

  it('lists static/app-constants.js once the projects data has changed', () => {
    render(
      <DraftProvider>
        <IntroTextMutator />
        <OutputSection />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('mutate intro'));

    expect(screen.getByText('static/app-constants.js')).toBeInTheDocument();
    expect(screen.getByText(/A brand new introduction\./)).toBeInTheDocument();
  });

  it('does not flag app-constants.js as changed for unrelated draft sections', () => {
    render(
      <DraftProvider>
        <LayoutsMutator />
        <OutputSection />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('mutate layouts'));

    expect(screen.getByText(/no changes yet/i)).toBeInTheDocument();
  });

  it('includes a note about regenerating dependent page snapshots', () => {
    render(
      <DraftProvider>
        <IntroTextMutator />
        <OutputSection />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('mutate intro'));

    expect(screen.getByText(/npm test -- -u/)).toBeInTheDocument();
  });
});
