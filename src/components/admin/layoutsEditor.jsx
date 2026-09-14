import React, { useState } from 'react';

import { useDraftSection } from './draftContext';
import { LAYOUT_PAGE_CONFIGS } from './seedData';
import TileLibraryEditor from './tileLibraryEditor';
import LayoutTreeEditor from './layoutTreeEditor';
import LayoutPreview from './layoutPreview';

const PAGE_KEYS = Object.keys(LAYOUT_PAGE_CONFIGS);

/**
 * @description The Layouts section of the admin tool: pick a portfolio listing page,
 * manage its reusable tiles, and edit its default (narrow-screen) and wide-screen
 * layout trees, each with a live preview alongside it.
 */
const LayoutsEditor = () => {
  const [activePage, setActivePage] = useState(PAGE_KEYS[0]);
  const [layouts, setLayouts] = useDraftSection('layouts');
  const [projects] = useDraftSection('projects');
  const [introText] = useDraftSection('defaultIntroductionText');

  const pageLayout = layouts[activePage];
  const pageConfig = LAYOUT_PAGE_CONFIGS[activePage];

  const updatePageLayout = (updates) => setLayouts({ ...layouts, [activePage]: { ...pageLayout, ...updates } });

  if (!pageLayout) return null;

  return (
    <div className="adminLayoutsEditor">
      {PAGE_KEYS.length > 1 && (
        <label>
          Page
          <select value={activePage} onChange={(e) => setActivePage(e.target.value)}>
            {PAGE_KEYS.map((key) => (
              <option key={key} value={key}>{LAYOUT_PAGE_CONFIGS[key].label}</option>
            ))}
          </select>
        </label>
      )}

      <p className="adminLayoutsEditor-target">Editing: {pageConfig.filePath}</p>

      <TileLibraryEditor
        tiles={pageLayout.tiles}
        onChange={(tiles) => updatePageLayout({ tiles })}
        projects={projects}
      />

      <section className="adminLayoutsEditor-variant">
        <h3>Default layout (narrow screens)</h3>
        <div className="adminLayoutsEditor-columns">
          <LayoutTreeEditor
            rows={pageLayout.defaultLayout}
            onChange={(rows) => updatePageLayout({ defaultLayout: rows })}
            tiles={pageLayout.tiles}
          />
          <LayoutPreview
            rows={pageLayout.defaultLayout}
            tiles={pageLayout.tiles}
            projects={projects}
            introText={introText}
          />
        </div>
      </section>

      <section className="adminLayoutsEditor-variant">
        <h3>Wide layout (wide screens)</h3>
        <div className="adminLayoutsEditor-columns">
          <LayoutTreeEditor
            rows={pageLayout.wideLayout}
            onChange={(rows) => updatePageLayout({ wideLayout: rows })}
            tiles={pageLayout.tiles}
          />
          <LayoutPreview
            rows={pageLayout.wideLayout}
            tiles={pageLayout.tiles}
            projects={projects}
            introText={introText}
          />
        </div>
      </section>
    </div>
  );
};

export default LayoutsEditor;
