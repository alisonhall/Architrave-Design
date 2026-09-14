import React, { useState } from 'react';

import { useDraftSection } from './draftContext';
import { LAYOUT_PAGE_CONFIGS } from './seedData';
import TileLibraryEditor from './tileLibraryEditor';
import LayoutTreeEditor from './layoutTreeEditor';
import LayoutPreview from './layoutPreview';

const PAGE_KEYS = Object.keys(LAYOUT_PAGE_CONFIGS);
const LISTING_TILE_KINDS = ['project', 'filler', 'text'];
const DETAIL_TILE_KINDS = ['image', 'description'];

/**
 * @description The Layouts section of the admin tool: pick a portfolio page, manage
 * its reusable tiles, and edit its layout tree(s) with a live preview alongside each.
 * A listing page (index.jsx, new-homes.jsx, etc.) has separate narrow/wide-screen
 * trees sharing one tile library; a detail page has a single tree bound to one project.
 */
const LayoutsEditor = () => {
  const [activePage, setActivePage] = useState(PAGE_KEYS[0]);
  const [layouts, setLayouts] = useDraftSection('layouts');
  const [projects] = useDraftSection('projects');
  const [introText] = useDraftSection('defaultIntroductionText');

  const pageLayout = layouts[activePage];
  const pageConfig = LAYOUT_PAGE_CONFIGS[activePage];
  const isDetailPage = pageConfig?.type === 'detail';
  const boundProject = isDetailPage ? projects[pageConfig.projectKey] : null;

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
        kinds={isDetailPage ? DETAIL_TILE_KINDS : LISTING_TILE_KINDS}
      />

      {isDetailPage ? (
        <section className="adminLayoutsEditor-variant">
          <h3>Layout</h3>
          <div className="adminLayoutsEditor-columns">
            <LayoutTreeEditor
              rows={pageLayout.layout}
              onChange={(rows) => updatePageLayout({ layout: rows })}
              tiles={pageLayout.tiles}
            />
            <LayoutPreview
              rows={pageLayout.layout}
              tiles={pageLayout.tiles}
              projects={projects}
              boundProject={boundProject}
            />
          </div>
        </section>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default LayoutsEditor;
