import React from 'react';

import { useDraftState, sameContent } from './draftContext';
import { seedDraft, pageConfigsFor } from './seedData';
import { generateAppConstants } from './generators/appConstantsGenerator';
import { generateLayoutData } from './generators/layoutGenerator';
import { generateNewPageFile } from './generators/newPageGenerator';
import { generateTestScaffold } from './generators/testScaffoldGenerator';
import { generateAboutData } from './generators/aboutGenerator';
import { generateReviewsData } from './generators/reviewsGenerator';
import OutputPanel from './outputPanel';
import { findLayoutProblems } from './draftProblems';

const APP_CONSTANTS_FIELDS = [
  'projects',
  'newProjectsOrder',
  'renovationProjectsOrder',
  'upcomingProjectsOrder',
  'unusedNewProjects',
  'unusedRenovationProjects',
  'unusedUpcomingProjects',
  'defaultIntroductionText'
];

// Page snapshot tests are kept current by the "Update snapshots" job in
// .github/workflows/pr-checks.yml, which runs on pull requests only.
const SNAPSHOT_NOTE = 'Commit these changes to a branch and open a pull request: its checks update (or create) the affected snapshot tests automatically in a follow-up commit — look over that commit before merging. Committed straight to master instead, those tests fail until someone runs `npm test -- -u` locally.';

const appConstantsChanged = (draft) =>
  APP_CONSTANTS_FIELDS.some((field) => !sameContent(draft[field], seedDraft[field]));

/**
 * @description Reads the current draft and turns it into the list of files the output
 * panel should show — only files whose relevant draft data has actually changed from
 * the live site's content are included.
 */
const OutputSection = () => {
  const draft = useDraftState();
  const files = [];

  if (appConstantsChanged(draft)) {
    files.push({
      path: 'static/app-constants.js',
      content: generateAppConstants(draft),
      note:
        `Pages that show project tiles (e.g. the home, new-homes, or reviews pages) will have their snapshot tests updated too. ${SNAPSHOT_NOTE}`
    });
  }

  if (!sameContent(draft.aboutContent, seedDraft.aboutContent)) {
    files.push({
      path: 'static/about.js',
      content: generateAboutData(draft.aboutContent),
      note: `This is plain data — the real about page's own file never needs to change. ${SNAPSHOT_NOTE}`
    });
  }

  if (!sameContent(draft.reviews, seedDraft.reviews)) {
    files.push({
      path: 'static/reviews.js',
      content: generateReviewsData(draft.reviews),
      note: `This is plain data — the real reviews page's own file never needs to change. ${SNAPSHOT_NOTE}`
    });
  }

  const pageConfigs = pageConfigsFor(draft.newLayoutPages, draft.deletedPages);

  Object.keys(pageConfigs).forEach((pageKey) => {
    const pageConfig = pageConfigs[pageKey];
    const pageLayout = draft.layouts[pageKey];
    if (!pageLayout) return;
    if (sameContent(pageLayout, seedDraft.layouts[pageKey])) return;

    files.push({
      path: pageConfig.dataFilePath,
      content: generateLayoutData(pageLayout),
      problems: findLayoutProblems(pageLayout, draft.projects),
      note: `This is plain data — the real page's own file never needs to change. ${SNAPSHOT_NOTE}`
    });

    if (pageConfig.isNew) {
      files.push({
        path: `src/pages/portfolio/${pageConfig.folder}/${pageConfig.slug}.jsx`,
        content: generateNewPageFile(pageConfig),
        note: 'A brand-new page — this fixed wrapper file never needs to change again once created.'
      });
      files.push({
        path: `src/pages/portfolio/${pageConfig.folder}/__tests__/${pageConfig.slug}.test.jsx`,
        content: generateTestScaffold(pageConfig),
        note: `The page's snapshot file doesn't exist yet — the pull request checks create it. ${SNAPSHOT_NOTE}`
      });
    }
  });

  // A deleted page's files, except any a page created since is writing afresh (same
  // project re-added, same file name) — those are being replaced, not deleted.
  const writtenPaths = new Set(files.map((file) => file.path));
  Object.values(draft.deletedPages || {}).forEach(({ label, files: pageFiles }) => {
    pageFiles.filter((path) => !writtenPaths.has(path)).forEach((path) => {
      files.push({
        path,
        deleted: true,
        note: `Part of ${label}, whose project was deleted — the site won't build while this page's files remain.`
      });
    });
  });

  return <OutputPanel files={files} />;
};

export default OutputSection;
