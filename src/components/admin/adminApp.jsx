import React, { useState } from 'react';

import { DraftProvider } from './draftContext';
import OutputPanel from './outputPanel';

const SECTIONS = [
  { key: 'projects', label: 'Projects' },
  { key: 'layouts', label: 'Layouts' },
  { key: 'about', label: 'About' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'output', label: 'Review Changes' }
];

/**
 * @description The admin tool's shell: section navigation over the shared draft state,
 * ending in an output panel that turns the draft into copy-pasteable file contents.
 * Individual section editors (projects/layouts/about/reviews) land in later phases.
 */
const AdminApp = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);

  return (
    <DraftProvider>
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
        </nav>
        <div className="adminApp-content">
          {activeSection === 'output' ? (
            <OutputPanel files={[]} />
          ) : (
            <p className="adminApp-placeholder">
              The {SECTIONS.find((section) => section.key === activeSection).label} editor isn't built yet.
            </p>
          )}
        </div>
      </div>
    </DraftProvider>
  );
};

export default AdminApp;
