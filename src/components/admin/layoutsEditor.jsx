import React, { useState } from 'react';

import { useDraftSection } from './draftContext';
import { LAYOUT_PAGE_CONFIGS } from './seedData';
import { makeBlankDetailLayout, renameTileKeyInLayoutData } from './layoutHelpers';
import TileLibraryEditor from './tileLibraryEditor';
import LayoutTreeEditor from './layoutTreeEditor';
import EditableLayoutPreview from './editableLayoutPreview';

const LISTING_TILE_KINDS = ['project', 'filler', 'image', 'text'];
const DETAIL_TILE_KINDS = ['image', 'description', 'embed', 'placeholder'];
const DETAIL_PROJECT_TYPES = ['new-homes', 'renovations-additions'];
const FOLDER_LABELS = { 'new-homes': 'New Homes', 'renovations-additions': 'Renovations & Additions' };

/**
 * @description The Layouts section of the admin tool: pick a portfolio page, manage
 * its reusable tiles, and edit its layout tree(s) with a live preview alongside each.
 * Two independent things vary per page: whether it's bound to one project (a "detail"
 * page — tile kinds image/description/embed/placeholder, a bound-project description
 * tile) or shares projects broadly (a "listing" page — tile kinds
 * project/filler/image/text); and whether it has one tree (`layout`) or two
 * (`defaultLayout`/`wideLayout`) — a detail page can be either shape, so the tree-count
 * is read from the data itself, not from the page type.
 *
 * A page can also be created here from scratch: picking a New Homes/Renovations
 * project that doesn't have one yet starts it from a blank layout (see
 * makeBlankDetailLayout) and registers it in draft.newLayoutPages, so it behaves
 * exactly like an already-committed page for the rest of the session — outputSection.jsx
 * additionally generates its fixed wrapper page file and a test scaffold for it.
 */
const LayoutsEditor = () => {
  const [layouts, setLayouts] = useDraftSection('layouts');
  const [projects] = useDraftSection('projects');
  const [introText] = useDraftSection('defaultIntroductionText');
  const [newLayoutPages, setNewLayoutPages] = useDraftSection('newLayoutPages');

  const pageConfigs = { ...LAYOUT_PAGE_CONFIGS, ...newLayoutPages };
  const pageKeys = Object.keys(pageConfigs);
  const [activePage, setActivePage] = useState(pageKeys[0]);

  const usedProjectKeys = new Set(Object.values(pageConfigs).map((config) => config.projectKey).filter(Boolean));
  const availableProjects = Object.keys(projects).filter(
    (key) => DETAIL_PROJECT_TYPES.includes(projects[key].type) && !usedProjectKeys.has(key)
  );

  const createPage = (projectKey) => {
    const project = projects[projectKey];
    const key = `${projectKey}Detail`;
    const config = {
      key,
      label: `${project.projectName} (${FOLDER_LABELS[project.type]} detail page)`,
      dataFile: true,
      dataFilePath: `static/layouts/${project.fileName}.js`,
      type: 'detail',
      projectKey,
      folder: project.type,
      slug: project.fileName,
      isNew: true
    };
    setNewLayoutPages({ ...newLayoutPages, [key]: config });
    setLayouts({ ...layouts, [key]: makeBlankDetailLayout(projectKey) });
    setActivePage(key);
  };

  const deletePage = (key) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this new page? Its draft layout will be lost.')) return;
    const nextPages = { ...newLayoutPages };
    delete nextPages[key];
    setNewLayoutPages(nextPages);
    const nextLayouts = { ...layouts };
    delete nextLayouts[key];
    setLayouts(nextLayouts);
    setActivePage(Object.keys(LAYOUT_PAGE_CONFIGS)[0]);
  };

  const pageLayout = layouts[activePage];
  const pageConfig = pageConfigs[activePage];
  const isDetailPage = pageConfig?.type === 'detail';
  const boundProject = isDetailPage ? projects[pageConfig.projectKey] : null;

  const updatePageLayout = (updates) => setLayouts({ ...layouts, [activePage]: { ...pageLayout, ...updates } });

  const renameTileKey = (oldKey, newKey, nextTiles) => updatePageLayout({
    tiles: nextTiles,
    ...renameTileKeyInLayoutData(pageLayout, oldKey, newKey)
  });

  // Creating a brand-new tile from the click-to-edit-in-preview popover and assigning
  // it to the clicked slot touches both `tiles` and one tree's `rows` — done here as one
  // atomic updatePageLayout call per field, not two separate ones (see
  // layoutClickOverlay.jsx's own note on why that would silently clobber one of them).
  const createTileAndAssign = (field) => (key, values, rows) => updatePageLayout({
    tiles: { ...pageLayout.tiles, [key]: values },
    [field]: rows
  });

  const isDual = pageLayout ? Boolean(pageLayout.defaultLayout) : false;
  const targetPath = pageConfig?.dataFilePath;

  return (
    <div className="adminLayoutsEditor">
      {pageKeys.length > 1 && (
        <label>
          Page
          <select value={activePage} onChange={(e) => setActivePage(e.target.value)}>
            {pageKeys.map((key) => (
              <option key={key} value={key}>{pageConfigs[key].label}</option>
            ))}
          </select>
        </label>
      )}

      {availableProjects.length > 0 && (
        <label className="adminLayoutsEditor-newPage">
          Create a page for
          <select value="" onChange={(e) => { if (e.target.value) createPage(e.target.value); }}>
            <option value="">Select a project…</option>
            {availableProjects.map((key) => (
              <option key={key} value={key}>{projects[key].projectName}</option>
            ))}
          </select>
        </label>
      )}

      {pageConfig && pageLayout && (
        <>
          <p className="adminLayoutsEditor-target">Editing: {targetPath}</p>
          {pageConfig.isNew && (
            <button type="button" onClick={() => deletePage(activePage)}>Delete this new page</button>
          )}

          <TileLibraryEditor
            tiles={pageLayout.tiles}
            onChange={(tiles) => updatePageLayout({ tiles })}
            onRenameTile={renameTileKey}
            projects={projects}
            kinds={isDetailPage ? DETAIL_TILE_KINDS : LISTING_TILE_KINDS}
          />

          {isDual ? (
            <>
              <section className="adminLayoutsEditor-variant">
                <h3>Default layout (narrow screens)</h3>
                <div className="adminLayoutsEditor-columns">
                  <LayoutTreeEditor
                    rows={pageLayout.defaultLayout}
                    onChange={(rows) => updatePageLayout({ defaultLayout: rows })}
                    tiles={pageLayout.tiles}
                  />
                  <EditableLayoutPreview
                    rows={pageLayout.defaultLayout}
                    tiles={pageLayout.tiles}
                    projects={projects}
                    introText={introText}
                    boundProject={boundProject}
                    kinds={isDetailPage ? DETAIL_TILE_KINDS : LISTING_TILE_KINDS}
                    onChangeRows={(rows) => updatePageLayout({ defaultLayout: rows })}
                    onChangeTiles={(tiles) => updatePageLayout({ tiles })}
                    onCreateTileAndAssign={createTileAndAssign('defaultLayout')}
                    onRenameTile={renameTileKey}
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
                  <EditableLayoutPreview
                    rows={pageLayout.wideLayout}
                    tiles={pageLayout.tiles}
                    projects={projects}
                    introText={introText}
                    boundProject={boundProject}
                    kinds={isDetailPage ? DETAIL_TILE_KINDS : LISTING_TILE_KINDS}
                    onChangeRows={(rows) => updatePageLayout({ wideLayout: rows })}
                    onChangeTiles={(tiles) => updatePageLayout({ tiles })}
                    onCreateTileAndAssign={createTileAndAssign('wideLayout')}
                    onRenameTile={renameTileKey}
                  />
                </div>
              </section>
            </>
          ) : (
            <section className="adminLayoutsEditor-variant">
              <h3>Layout</h3>
              <div className="adminLayoutsEditor-columns">
                <LayoutTreeEditor
                  rows={pageLayout.layout}
                  onChange={(rows) => updatePageLayout({ layout: rows })}
                  tiles={pageLayout.tiles}
                />
                <EditableLayoutPreview
                  rows={pageLayout.layout}
                  tiles={pageLayout.tiles}
                  projects={projects}
                  boundProject={boundProject}
                  kinds={isDetailPage ? DETAIL_TILE_KINDS : LISTING_TILE_KINDS}
                  onChangeRows={(rows) => updatePageLayout({ layout: rows })}
                  onChangeTiles={(tiles) => updatePageLayout({ tiles })}
                  onCreateTileAndAssign={createTileAndAssign('layout')}
                  onRenameTile={renameTileKey}
                />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default LayoutsEditor;
