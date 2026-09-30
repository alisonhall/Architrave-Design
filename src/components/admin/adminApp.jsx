import React, { useEffect, useState } from 'react';

import { DraftProvider, useDraftMeta } from './draftContext';
import ProjectsEditor from './projectsEditor';
import LayoutsEditor from './layoutsEditor';
import AboutEditor from './aboutEditor';
import ReviewsEditor from './reviewsEditor';
import OutputSection from './outputSection';

const SECTIONS = [
  { key: 'projects', label: 'Projects' },
  { key: 'layouts', label: 'Layouts' },
  { key: 'about', label: 'About' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'output', label: 'Review Changes' }
];

const SECTION_CONTENT = {
  projects: <ProjectsEditor />,
  layouts: <LayoutsEditor />,
  about: <AboutEditor />,
  reviews: <ReviewsEditor />,
  output: <OutputSection />
};

// Somewhere the browser's own undo applies instead (typing in a field) — the draft's
// undo shortcut stays out of the way there.
const isTextEntry = (element) => Boolean(element) && (
  ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) || element.isContentEditable
);

/**
 * @description Ctrl/Cmd+Z undoes the last draft edit; Ctrl/Cmd+Shift+Z or Ctrl+Y redoes
 * it — except while typing in a field, where those keys belong to the field.
 */
const useUndoShortcuts = ({ undo, redo }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey || isTextEntry(event.target)) return;
      const key = event.key.toLowerCase();
      if (key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((key === 'z' && event.shiftKey) || (key === 'y' && event.ctrlKey && !event.metaKey)) {
        event.preventDefault();
        redo();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
};

/**
 * @description Asks before leaving the page while the draft has changes: it lives only
 * in this tab, so closing it loses all of them. (Browsers show their own generic wording,
 * and ask on a reload too, even though a reload keeps the draft.)
 */
const useLeaveWarning = (hasChanges) => {
  useEffect(() => {
    if (!hasChanges) return undefined;
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);
};

const Notices = () => {
  const { saveFailed, discardedStoredDraft, staleContent, dismissNotice } = useDraftMeta();

  return (
    <>
      {saveFailed && (
        <div className="adminNotice adminNotice--error" role="alert">
          Your changes couldn&apos;t be saved in this browser tab (its storage is full or unavailable), so
          they&apos;ll be lost if the page is refreshed. Apply them from Review Changes before leaving.
        </div>
      )}
      {discardedStoredDraft && (
        <div className="adminNotice" role="status">
          Your previous draft couldn&apos;t be restored — the admin tool has been updated since it was saved — so
          you&apos;re starting from the site as it is now.
          <button type="button" onClick={() => dismissNotice('discarded')}>Dismiss</button>
        </div>
      )}
      {staleContent && (
        <div className="adminNotice adminNotice--warning" role="status">
          The site&apos;s content has been updated since this draft was started. Review Changes shows your
          draft&apos;s whole version of each file, so applying it would undo those updates too — check each file
          carefully, or discard your changes and start again.
          <button type="button" onClick={() => dismissNotice('staleContent')}>Dismiss</button>
        </div>
      )}
    </>
  );
};

const AdminShell = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  const { canUndo, canRedo, undo, redo, reset, hasChanges } = useDraftMeta();

  useUndoShortcuts({ undo, redo });
  useLeaveWarning(hasChanges);

  const discardAll = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Discard all your changes and go back to the site as it is now? You can still undo this.')) reset();
  };

  return (
    <div className="adminApp">
      <nav className="adminApp-nav">
        {SECTIONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={key === activeSection ? 'active' : ''}
            onClick={() => setActiveSection(key)}
          >
            {label}
          </button>
        ))}
        <div className="adminApp-history">
          <button type="button" onClick={undo} disabled={!canUndo} title="Undo (Ctrl/⌘+Z)">Undo</button>
          <button type="button" onClick={redo} disabled={!canRedo} title="Redo (Ctrl/⌘+Shift+Z)">Redo</button>
          <button type="button" onClick={discardAll} disabled={!hasChanges}>Discard all changes</button>
        </div>
      </nav>
      <div className="adminApp-content">
        <Notices />
        {SECTION_CONTENT[activeSection]}
      </div>
    </div>
  );
};

/**
 * @description The admin tool's shell: section navigation over the shared draft state,
 * ending in an output panel that turns the draft into copy-pasteable file contents —
 * plus undo/redo and "Discard all changes" for the whole draft, and notices about its
 * state (unsaved, restored from an outdated session, etc.).
 */
const AdminApp = () => (
  <DraftProvider>
    <AdminShell />
  </DraftProvider>
);

export default AdminApp;
