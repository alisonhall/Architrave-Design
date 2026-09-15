import React from 'react';

import { useDraftState } from './draftContext';
import { seedDraft, LAYOUT_PAGE_CONFIGS } from './seedData';
import { generateAppConstants } from './generators/appConstantsGenerator';
import { generateLayoutData } from './generators/layoutGenerator';
import OutputPanel from './outputPanel';

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

const appConstantsChanged = (draft) =>
  APP_CONSTANTS_FIELDS.some((field) => JSON.stringify(draft[field]) !== JSON.stringify(seedDraft[field]));

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
        "Any page whose snapshot renders project tiles (e.g. the home, new-homes, or reviews page tests) may need its snapshot updated afterward with `npm test -- -u` — review the diff before committing it. If a layout below still references a project you deleted, fix that layout first — the generated page would fail to render."
    });
  }

  Object.keys(LAYOUT_PAGE_CONFIGS).forEach((pageKey) => {
    const pageConfig = LAYOUT_PAGE_CONFIGS[pageKey];
    const pageLayout = draft.layouts[pageKey];
    if (!pageLayout) return;
    if (JSON.stringify(pageLayout) === JSON.stringify(seedDraft.layouts[pageKey])) return;

    files.push({
      path: pageConfig.dataFilePath,
      content: generateLayoutData(pageLayout),
      note: "This is plain data — the real page's own file never needs to change. Its snapshot test (if any) will need updating afterward with `npm test -- -u` — review the diff before committing it."
    });
  });

  return <OutputPanel files={files} />;
};

export default OutputSection;
