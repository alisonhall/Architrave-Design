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

const NewHomesLayoutMutator = () => {
  const [layouts, setLayouts] = useDraftSection('layouts');
  return (
    <button
      type="button"
      onClick={() => setLayouts({
        ...layouts,
        newHomes: { ...layouts.newHomes, defaultLayout: [] }
      })}
    >
      mutate new-homes layout
    </button>
  );
};

const NewPageAdder = () => {
  const [layouts, setLayouts] = useDraftSection('layouts');
  const [newLayoutPages, setNewLayoutPages] = useDraftSection('newLayoutPages');
  const addPage = () => {
    setNewLayoutPages({
      ...newLayoutPages,
      testManorDetail: {
        key: 'testManorDetail',
        label: 'Test Manor (New Homes detail page)',
        dataFile: true,
        dataFilePath: 'static/layouts/test-manor.js',
        type: 'detail',
        projectKey: 'testManor',
        folder: 'new-homes',
        slug: 'test-manor',
        isNew: true
      }
    });
    setLayouts({
      ...layouts,
      testManorDetail: {
        mainClasses: 'portfolio',
        sectionClassName: 'contentWrapper layoutAll layoutProject',
        projectKey: 'testManor',
        tiles: { description: { kind: 'description' } },
        layout: []
      }
    });
  };
  return <button type="button" onClick={addPage}>add new page</button>;
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

  it('lists the new-homes.jsx page once its layout has actually changed', () => {
    render(
      <DraftProvider>
        <NewHomesLayoutMutator />
        <OutputSection />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('mutate new-homes layout'));

    expect(screen.getByText('static/layouts/new-homes.js')).toBeInTheDocument();
  });

  it('does not list new-homes.jsx when only unrelated draft data changes', () => {
    render(
      <DraftProvider>
        <IntroTextMutator />
        <OutputSection />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('mutate intro'));

    expect(screen.queryByText('static/layouts/new-homes.js')).not.toBeInTheDocument();
  });

  it('lists the data file, wrapper page, and test scaffold for a brand-new page', () => {
    render(
      <DraftProvider>
        <NewPageAdder />
        <OutputSection />
      </DraftProvider>
    );

    fireEvent.click(screen.getByText('add new page'));

    expect(screen.getByText('static/layouts/test-manor.js')).toBeInTheDocument();
    expect(screen.getByText('src/pages/portfolio/new-homes/test-manor.jsx')).toBeInTheDocument();
    expect(screen.getByText('src/pages/portfolio/new-homes/__tests__/test-manor.test.jsx')).toBeInTheDocument();
  });
});
