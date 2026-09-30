import { findLayoutProblems } from '../draftProblems';
import { seedDraft } from '../seedData';

const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const projects = { real: { key: 'real', projectName: 'Real' } };

describe('findLayoutProblems', () => {
  it('finds nothing in any of the site\'s committed layouts', () => {
    Object.values(seedDraft.layouts).forEach((layout) => {
      expect(findLayoutProblems(layout, seedDraft.projects)).toEqual([]);
    });
  });

  it('flags spots with no tile chosen, or pointing at a tile that no longer exists', () => {
    const layout = { tiles: { a: { kind: 'image' } }, layout: [{ columns: [{ children: [tileRef('a'), tileRef(''), tileRef('gone'), { nodeType: 'empty' }] }] }] };

    expect(findLayoutProblems(layout, projects)).toEqual([
      { where: 'Layout, row 1 › column 1 › item 2', problem: 'is an empty slot with no tile chosen, so it shows nothing.' },
      { where: 'Layout, row 1 › column 1 › item 3', problem: 'uses the tile "gone", which no longer exists.' }
    ]);
  });

  it('flags project and filler tiles pointing at a project that doesn\'t exist', () => {
    const layout = {
      tiles: {
        ok: { kind: 'project', projectKey: 'real' },
        lost: { kind: 'project', projectKey: 'missing' },
        fillerLost: { kind: 'filler', projectKey: 'missing' },
        fillerFree: { kind: 'filler', projectKey: '' }
      },
      layout: [{ columns: [{ children: [tileRef('ok')] }] }]
    };

    expect(findLayoutProblems(layout, projects)).toEqual([
      { where: 'Tile "lost"', problem: 'points at a project that doesn\'t exist, so it shows nothing.' },
      { where: 'Tile "fillerLost"', problem: 'points at a project that doesn\'t exist.' }
    ]);
  });

  it('flags empty rows, empty columns, and empty layouts, nested ones included, per layout variant', () => {
    const layout = {
      tiles: { a: { kind: 'image' } },
      defaultLayout: [],
      wideLayout: [
        { columns: [] },
        { columns: [{ children: [{ nodeType: 'row', row: { columns: [{ children: [] }] } }] }] }
      ]
    };

    expect(findLayoutProblems(layout, projects)).toEqual([
      { where: 'Default layout', problem: 'has no rows yet.' },
      { where: 'Wide layout, row 1', problem: 'has no columns, so it shows nothing.' },
      { where: 'Wide layout, row 2 › column 1 › row 1 › column 1', problem: 'is empty.' }
    ]);
  });
});
