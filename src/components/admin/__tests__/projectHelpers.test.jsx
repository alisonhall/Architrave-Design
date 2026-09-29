import {
  slugify,
  camelCase,
  makeUniqueProjectKey,
  getProjectTypeConfig,
  PROJECT_TYPES,
  planProjectDeletion,
  deleteProjectConfirmMessage
} from '../projectHelpers';
import { seedDraft } from '../seedData';
import { countTilePlacements } from '../layoutHelpers';

describe('slugify', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugify('Credit River Manor')).toBe('credit-river-manor');
  });

  it('strips punctuation', () => {
    expect(slugify("Hogg's Hollow French Country")).toBe('hogg-s-hollow-french-country');
  });

  it('trims leading/trailing hyphens from stray punctuation', () => {
    expect(slugify('  --Fancy Project!!--  ')).toBe('fancy-project');
  });
});

describe('camelCase', () => {
  it('lowercases the first word and capitalizes the rest', () => {
    expect(camelCase('Credit River Manor')).toBe('creditRiverManor');
  });

  it('drops punctuation, treating an apostrophe as a word break', () => {
    expect(camelCase("St. George's Rebuild")).toBe('stGeorgeSRebuild');
  });

  it('returns an empty string for input with no usable characters', () => {
    expect(camelCase('!!!')).toBe('');
  });
});

describe('makeUniqueProjectKey', () => {
  it('uses the camelCase form when it is not already taken', () => {
    expect(makeUniqueProjectKey('Brand New Project', {})).toBe('brandNewProject');
  });

  it('appends a numeric suffix on collision', () => {
    const existing = { brandNewProject: {} };
    expect(makeUniqueProjectKey('Brand New Project', existing)).toBe('brandNewProject2');
  });

  it('keeps incrementing the suffix past multiple collisions', () => {
    const existing = { brandNewProject: {}, brandNewProject2: {} };
    expect(makeUniqueProjectKey('Brand New Project', existing)).toBe('brandNewProject3');
  });

  it('falls back to "newProject" when the name has no usable characters', () => {
    expect(makeUniqueProjectKey('!!!', {})).toBe('newProject');
  });
});

describe('getProjectTypeConfig', () => {
  it('finds the config for a known type value', () => {
    expect(getProjectTypeConfig('new-homes')).toEqual(PROJECT_TYPES[0]);
  });

  it('returns undefined for an unknown type value', () => {
    expect(getProjectTypeConfig('not-a-real-type')).toBeUndefined();
  });
});

describe('planProjectDeletion', () => {
  const draft = () => JSON.parse(JSON.stringify(seedDraft));

  it('removes the project, its listing entries, every tile pointing at it (and their spots), and records its committed page', () => {
    const before = draft();
    const { updates, affectedPages, removedPages } = planProjectDeletion(before, 'hoggsHollowFrench');

    expect(updates.projects.hoggsHollowFrench).toBeUndefined();
    expect(updates.newProjectsOrder).not.toContain('hoggsHollowFrench');
    expect(updates.unusedNewProjects).not.toContain('hoggsHollowFrench');

    // Its tile is gone from the listing pages, spots included.
    ['index', 'newHomes'].forEach((pageKey) => {
      expect(updates.layouts[pageKey].tiles.hoggsHollowFrench).toBeUndefined();
      expect(countTilePlacements(updates.layouts[pageKey], 'hoggsHollowFrench')).toBe(0);
    });
    expect(affectedPages.map((page) => page.key)).toEqual(expect.arrayContaining(['index', 'newHomes']));
    const indexPage = affectedPages.find((page) => page.key === 'index');
    expect(indexPage.placements).toBe(countTilePlacements(before.layouts.index, 'hoggsHollowFrench'));

    // Its own detail page is dropped, and its files listed for deletion.
    expect(updates.layouts.hoggsHollowFrenchDetail).toBeUndefined();
    expect(removedPages).toEqual([expect.objectContaining({ key: 'hoggsHollowFrenchDetail', isNew: false })]);
    expect(updates.deletedPages.hoggsHollowFrenchDetail.files).toEqual([
      'static/layouts/hoggs-hollow-french.js',
      'src/pages/portfolio/new-homes/hoggs-hollow-french.jsx',
      'src/pages/portfolio/new-homes/__tests__/hoggs-hollow-french.test.jsx',
      'src/pages/portfolio/new-homes/__tests__/__snapshots__/hoggs-hollow-french.test.jsx.snap'
    ]);

    // Untouched pages keep their very same data.
    expect(updates.layouts.creditRiverManor).toBe(before.layouts.creditRiverManor);
  });

  it('also removes filler tiles pointing at the project', () => {
    const before = draft();
    before.layouts.index.tiles.someFiller = { kind: 'filler', projectKey: 'hoggsHollowFrench', imageUrl: '' };
    const { updates } = planProjectDeletion(before, 'hoggsHollowFrench');
    expect(updates.layouts.index.tiles.someFiller).toBeUndefined();
  });

  it('simply discards a page created this session, rather than listing files to delete', () => {
    const before = draft();
    before.projects.newOne = { key: 'newOne', projectName: 'New One', type: 'new-homes', fileName: 'new-one' };
    before.newLayoutPages = { newOneDetail: { key: 'newOneDetail', label: 'New One page', dataFilePath: 'static/layouts/new-one.js', type: 'detail', projectKey: 'newOne', isNew: true } };
    before.layouts.newOneDetail = { tiles: {}, layout: [] };

    const { updates, removedPages } = planProjectDeletion(before, 'newOne');
    expect(updates.newLayoutPages).toEqual({});
    expect(updates.layouts.newOneDetail).toBeUndefined();
    expect(updates.deletedPages).toEqual({});
    expect(removedPages).toEqual([expect.objectContaining({ key: 'newOneDetail', isNew: true })]);
  });

  it('leaves the listing arrays alone for a project with an unknown type', () => {
    const before = draft();
    before.projects.odd = { key: 'odd', projectName: 'Odd', type: 'nonsense' };
    const { updates, affectedPages, removedPages } = planProjectDeletion(before, 'odd');
    expect(updates.projects.odd).toBeUndefined();
    expect(Object.keys(updates)).toEqual(['projects', 'layouts', 'newLayoutPages', 'deletedPages']);
    expect(affectedPages).toEqual([]);
    expect(removedPages).toEqual([]);
  });
});

describe('deleteProjectConfirmMessage', () => {
  it('is a plain question when nothing else is affected', () => {
    expect(deleteProjectConfirmMessage('Odd', { affectedPages: [], removedPages: [] })).toBe('Delete "Odd"?');
  });

  it('lists every page affected and every page removed', () => {
    const message = deleteProjectConfirmMessage('Hoggs', {
      affectedPages: [{ label: 'Home', placements: 1 }, { label: 'New Homes', placements: 2 }],
      removedPages: [{ label: 'Hoggs page', isNew: false }, { label: 'Draft page', isNew: true }]
    });
    expect(message).toContain('• remove its tile from Home (1 spot)');
    expect(message).toContain('• remove its tile from New Homes (2 spots)');
    expect(message).toContain('• remove its page, Hoggs page — Review Changes will list');
    expect(message).toContain('• discard its new page, Draft page');
  });
});
