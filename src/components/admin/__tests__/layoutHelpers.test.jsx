import {
  replaceAt,
  removeAt,
  insertAt,
  moveAt,
  moveToIndex,
  makeBlankRow,
  makeBlankColumn,
  makeRowPlacement,
  makeTilePlacement,
  makeBlankTile,
  suggestTileKey,
  computeTileOrder,
  hydrateLayoutData,
  stripLayoutData,
  makeBlankDetailLayout,
  renameTileKeyInLayoutData,
  cloneRowWithNewIds,
  cloneColumnWithNewIds,
  clonePlacementWithNewIds,
  updateRowById,
  updateColumnById,
  flattenLayout,
  findRowById,
  findColumnById,
  updateRowContainer,
  updateRowColumns,
  updateColumnChildren
} from '../layoutHelpers';

describe('array helpers', () => {
  it('replaceAt replaces only the target index', () => {
    expect(replaceAt(['a', 'b', 'c'], 1, 'x')).toEqual(['a', 'x', 'c']);
  });

  it('removeAt removes only the target index', () => {
    expect(removeAt(['a', 'b', 'c'], 1)).toEqual(['a', 'c']);
  });

  it('moveAt swaps adjacent elements', () => {
    expect(moveAt(['a', 'b', 'c'], 0, 1)).toEqual(['b', 'a', 'c']);
    expect(moveAt(['a', 'b', 'c'], 2, -1)).toEqual(['a', 'c', 'b']);
  });

  it('moveAt is a no-op past either end', () => {
    const array = ['a', 'b', 'c'];
    expect(moveAt(array, 0, -1)).toBe(array);
    expect(moveAt(array, 2, 1)).toBe(array);
  });

  it('moveToIndex relocates an item to an arbitrary position, shifting items in between', () => {
    expect(moveToIndex(['a', 'b', 'c', 'd'], 0, 2)).toEqual(['b', 'c', 'a', 'd']);
    expect(moveToIndex(['a', 'b', 'c', 'd'], 3, 0)).toEqual(['d', 'a', 'b', 'c']);
  });

  it('moveToIndex is a no-op when the source and destination are the same', () => {
    const array = ['a', 'b', 'c'];
    expect(moveToIndex(array, 1, 1)).toBe(array);
  });

  it('moveToIndex is a no-op for an out-of-range index', () => {
    const array = ['a', 'b', 'c'];
    expect(moveToIndex(array, -1, 1)).toBe(array);
    expect(moveToIndex(array, 0, 3)).toBe(array);
  });

  it('insertAt inserts a value at the given index, shifting the rest right', () => {
    expect(insertAt(['a', 'b', 'c'], 1, 'x')).toEqual(['a', 'x', 'b', 'c']);
    expect(insertAt(['a', 'b'], 2, 'x')).toEqual(['a', 'b', 'x']);
    expect(insertAt([], 0, 'x')).toEqual(['x']);
  });
});

describe('cloneRowWithNewIds / cloneColumnWithNewIds', () => {
  const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

  it('cloneColumnWithNewIds gives the column and every placement a fresh id, keeping their data', () => {
    const column = { id: 'col1', width: '50%', children: [{ id: 'p1', ...tileRef('a') }] };
    const clone = cloneColumnWithNewIds(column);

    expect(clone.id).not.toBe('col1');
    expect(clone.width).toBe('50%');
    expect(clone.children[0].id).not.toBe('p1');
    expect(clone.children[0].tileKey).toBe('a');
  });

  it('cloneRowWithNewIds gives the row, its columns, and their placements all fresh ids', () => {
    const row = {
      id: 'row1',
      height: 300,
      columns: [{ id: 'col1', children: [{ id: 'p1', ...tileRef('a') }] }]
    };
    const clone = cloneRowWithNewIds(row);

    expect(clone.id).not.toBe('row1');
    expect(clone.height).toBe(300);
    expect(clone.columns[0].id).not.toBe('col1');
    expect(clone.columns[0].children[0].id).not.toBe('p1');
    expect(clone.columns[0].children[0].tileKey).toBe('a');
  });

  it('recursively gives a nested row placement (and everything inside it) fresh ids too', () => {
    const nestedRow = { id: 'nestedRow1', columns: [{ id: 'nestedCol1', children: [{ id: 'p1', ...tileRef('a') }] }] };
    const column = { id: 'col1', children: [{ id: 'placement1', nodeType: 'row', row: nestedRow }] };

    const clone = cloneColumnWithNewIds(column);
    const clonedPlacement = clone.children[0];

    expect(clonedPlacement.id).not.toBe('placement1');
    expect(clonedPlacement.row.id).not.toBe('nestedRow1');
    expect(clonedPlacement.row.columns[0].id).not.toBe('nestedCol1');
    expect(clonedPlacement.row.columns[0].children[0].id).not.toBe('p1');
    expect(clonedPlacement.row.columns[0].children[0].tileKey).toBe('a');
  });

  it('leaves an empty placement\'s data untouched apart from its id', () => {
    const column = { id: 'col1', children: [{ id: 'p1', nodeType: 'empty' }] };
    const clone = cloneColumnWithNewIds(column);

    expect(clone.children[0].nodeType).toBe('empty');
    expect(clone.children[0].id).not.toBe('p1');
  });
});

describe('node factories', () => {
  it('makeBlankRow has no columns and no fixed size', () => {
    const row = makeBlankRow();
    expect(row.columns).toEqual([]);
    expect(row.height).toBeUndefined();
    expect(row.id).toEqual(expect.any(String));
  });

  it('makeBlankColumn has no children and no fixed width', () => {
    const column = makeBlankColumn();
    expect(column.children).toEqual([]);
    expect(column.width).toBeUndefined();
  });

  it('makeRowPlacement wraps a fresh blank row', () => {
    const placement = makeRowPlacement();
    expect(placement.nodeType).toBe('row');
    expect(placement.row.columns).toEqual([]);
  });

  it('makeTilePlacement references the given tile key', () => {
    const placement = makeTilePlacement('someTile');
    expect(placement).toMatchObject({ nodeType: 'tileRef', tileKey: 'someTile' });
  });

  it('generates unique ids across calls', () => {
    const a = makeBlankRow();
    const b = makeBlankRow();
    expect(a.id).not.toBe(b.id);
  });
});

describe('makeBlankTile', () => {
  it('builds a blank project tile', () => {
    expect(makeBlankTile('project')).toEqual({ kind: 'project', projectKey: '', backgroundPosition: '' });
  });

  it('builds a blank filler tile', () => {
    expect(makeBlankTile('filler')).toEqual({ kind: 'filler', projectKey: '', imageUrl: '' });
  });

  it('builds a blank text tile defaulting to the shared intro text', () => {
    expect(makeBlankTile('text')).toEqual({ kind: 'text', text: '', useIntroText: true });
  });

  it('builds a blank image tile (detail pages)', () => {
    expect(makeBlankTile('image')).toEqual({ kind: 'image', imageUrl: '', backgroundPosition: '', overlayText: '' });
  });

  it('builds a blank description tile with no fields (detail pages)', () => {
    expect(makeBlankTile('description')).toEqual({ kind: 'description' });
  });

  it('builds a blank embed tile with an empty html field (detail pages)', () => {
    expect(makeBlankTile('embed')).toEqual({ kind: 'embed', html: '' });
  });

  it('builds a blank placeholder tile with no fields (detail pages)', () => {
    expect(makeBlankTile('placeholder')).toEqual({ kind: 'placeholder' });
  });
});

describe('suggestTileKey', () => {
  it('uses the project key directly for a project tile', () => {
    expect(suggestTileKey('project', 'creditRiverManor', {})).toBe('creditRiverManor');
  });

  it('appends "Filler" for a filler tile of a project', () => {
    expect(suggestTileKey('filler', 'kingswayGeorgian', {})).toBe('kingswayGeorgianFiller');
  });

  it('falls back to a generic name when there is no project', () => {
    expect(suggestTileKey('text', '', {})).toBe('textTile');
  });

  it('appends a numeric suffix on collision', () => {
    expect(suggestTileKey('project', 'creditRiverManor', { creditRiverManor: {} })).toBe('creditRiverManor2');
  });
});

describe('computeTileOrder', () => {
  const tiles = {
    a: { kind: 'project', projectKey: 'a' },
    b: { kind: 'project', projectKey: 'b' },
    c: { kind: 'text', useIntroText: true },
    d: { kind: 'image', imageUrl: 'https://example.com/d.jpg' },
    e: { kind: 'description' }
  };

  it('lists tile keys in document order, skipping text tiles', () => {
    const rows = [
      { id: 'r1', columns: [{ id: 'c1', children: [{ id: 'p1', nodeType: 'tileRef', tileKey: 'b' }] }] },
      { id: 'r2', columns: [{ id: 'c2', children: [{ id: 'p2', nodeType: 'tileRef', tileKey: 'c' }] }] },
      { id: 'r3', columns: [{ id: 'c3', children: [{ id: 'p3', nodeType: 'tileRef', tileKey: 'a' }] }] }
    ];

    expect(computeTileOrder(rows, tiles)).toEqual(['b', 'a']);
  });

  it('numbers image tiles but skips description tiles (detail pages)', () => {
    const rows = [
      { id: 'r1', columns: [{ id: 'c1', children: [{ id: 'p1', nodeType: 'tileRef', tileKey: 'd' }] }] },
      { id: 'r2', columns: [{ id: 'c2', children: [{ id: 'p2', nodeType: 'tileRef', tileKey: 'e' }] }] }
    ];

    expect(computeTileOrder(rows, tiles)).toEqual(['d']);
  });

  it('descends into nested rows', () => {
    const rows = [
      {
        id: 'r1',
        columns: [
          {
            id: 'c1',
            children: [
              {
                id: 'nested',
                nodeType: 'row',
                row: { id: 'inner', columns: [{ id: 'ic1', children: [{ id: 'ip1', nodeType: 'tileRef', tileKey: 'a' }] }] }
              }
            ]
          }
        ]
      }
    ];

    expect(computeTileOrder(rows, tiles)).toEqual(['a']);
  });

  it('only counts the first placement of a repeated tile', () => {
    const rows = [
      {
        id: 'r1',
        columns: [
          { id: 'c1', children: [{ id: 'p1', nodeType: 'tileRef', tileKey: 'a' }] },
          { id: 'c2', children: [{ id: 'p2', nodeType: 'tileRef', tileKey: 'a' }] }
        ]
      }
    ];

    expect(computeTileOrder(rows, tiles)).toEqual(['a']);
  });
});

describe('hydrateLayoutData / stripLayoutData', () => {
  const rawData = {
    mainClasses: 'portfolio',
    sectionClassName: 'contentWrapper layoutAll layoutProject',
    projectKey: 'someProject',
    tiles: { a: { kind: 'image', num: 1, imageUrl: 'https://example.com/a.jpg' } },
    layout: [
      {
        height: 300,
        columns: [
          {
            width: '50%',
            children: [
              { nodeType: 'tileRef', tileKey: 'a' },
              { nodeType: 'row', row: { columns: [{ children: [{ nodeType: 'empty' }] }] } }
            ]
          }
        ]
      }
    ]
  };

  it('adds an id to every row, column, and placement, including nested rows', () => {
    const hydrated = hydrateLayoutData(rawData);
    const row = hydrated.layout[0];
    const column = row.columns[0];
    const [tileRefPlacement, nestedRowPlacement] = column.children;

    expect(row.id).toEqual(expect.any(String));
    expect(column.id).toEqual(expect.any(String));
    expect(tileRefPlacement.id).toEqual(expect.any(String));
    expect(nestedRowPlacement.id).toEqual(expect.any(String));
    expect(nestedRowPlacement.row.id).toEqual(expect.any(String));
    expect(nestedRowPlacement.row.columns[0].id).toEqual(expect.any(String));
    expect(nestedRowPlacement.row.columns[0].children[0].id).toEqual(expect.any(String));
  });

  it('leaves non-tree fields untouched', () => {
    const hydrated = hydrateLayoutData(rawData);
    expect(hydrated.mainClasses).toBe('portfolio');
    expect(hydrated.projectKey).toBe('someProject');
    expect(hydrated.tiles).toEqual(rawData.tiles);
  });

  it('hydrates whichever tree fields are present (single vs dual)', () => {
    const dual = { tiles: {}, defaultLayout: [], wideLayout: [] };
    const hydrated = hydrateLayoutData(dual);
    expect(hydrated.defaultLayout).toEqual([]);
    expect(hydrated.wideLayout).toEqual([]);
    expect(hydrated.layout).toBeUndefined();
  });

  it('stripLayoutData removes every id added by hydrateLayoutData, round-tripping exactly', () => {
    const hydrated = hydrateLayoutData(rawData);
    const stripped = stripLayoutData(hydrated);
    expect(stripped).toEqual(rawData);
  });

  it('stripLayoutData leaves data with no ids unchanged', () => {
    expect(stripLayoutData(rawData)).toEqual(rawData);
  });
});

describe('makeBlankDetailLayout', () => {
  it('builds a blank single-tree layout bound to the given project, with just a description tile', () => {
    const layout = makeBlankDetailLayout('someProject');

    expect(layout.mainClasses).toBe('portfolio');
    expect(layout.projectKey).toBe('someProject');
    expect(layout.tiles).toEqual({ description: { kind: 'description' } });
    expect(layout.layout).toEqual([]);
    expect(layout.defaultLayout).toBeUndefined();
  });

  it('is already hydrated, ready to drop into a draft (round-trips cleanly through stripLayoutData)', () => {
    const layout = makeBlankDetailLayout('someProject');
    expect(stripLayoutData(layout)).toEqual({
      mainClasses: 'portfolio',
      sectionClassName: 'contentWrapper layoutAll layoutProject',
      projectKey: 'someProject',
      tiles: { description: { kind: 'description' } },
      layout: []
    });
  });
});

describe('renameTileKeyInLayoutData', () => {
  const row = (columns) => ({ columns });
  const column = (children) => ({ children });
  const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

  it('updates a matching tileRef in a single-tree layout', () => {
    const pageLayout = {
      layout: [row([column([tileRef('oldKey')])])]
    };

    const updates = renameTileKeyInLayoutData(pageLayout, 'oldKey', 'newKey');

    expect(updates.layout[0].columns[0].children[0]).toEqual({ nodeType: 'tileRef', tileKey: 'newKey' });
    expect(updates.defaultLayout).toBeUndefined();
    expect(updates.wideLayout).toBeUndefined();
  });

  it('updates matching tileRefs in both trees of a dual-tree layout', () => {
    const pageLayout = {
      defaultLayout: [row([column([tileRef('oldKey')])])],
      wideLayout: [row([column([tileRef('oldKey'), tileRef('otherKey')])])]
    };

    const updates = renameTileKeyInLayoutData(pageLayout, 'oldKey', 'newKey');

    expect(updates.defaultLayout[0].columns[0].children[0].tileKey).toBe('newKey');
    expect(updates.wideLayout[0].columns[0].children[0].tileKey).toBe('newKey');
    expect(updates.wideLayout[0].columns[0].children[1].tileKey).toBe('otherKey');
  });

  it('updates a tileRef nested inside a row placement', () => {
    const pageLayout = {
      layout: [row([column([{ nodeType: 'row', row: row([column([tileRef('oldKey')])]) }])])]
    };

    const updates = renameTileKeyInLayoutData(pageLayout, 'oldKey', 'newKey');

    expect(updates.layout[0].columns[0].children[0].row.columns[0].children[0].tileKey).toBe('newKey');
  });

  it('leaves an empty placement and a non-matching tileRef untouched', () => {
    const pageLayout = {
      layout: [row([column([{ nodeType: 'empty' }, tileRef('unrelatedKey')])])]
    };

    const updates = renameTileKeyInLayoutData(pageLayout, 'oldKey', 'newKey');

    expect(updates.layout[0].columns[0].children[0]).toEqual({ nodeType: 'empty' });
    expect(updates.layout[0].columns[0].children[1].tileKey).toBe('unrelatedKey');
  });
});

describe('tree walking', () => {
  // row1
  //   col1: [tile a, nested row2 [col2: [tile b]], tile c]
  //   col3: []
  // row3
  //   col4: [tile d]
  const tree = () => [
    {
      id: 'row1',
      columns: [
        {
          id: 'col1',
          children: [
            { id: 'p1', nodeType: 'tileRef', tileKey: 'a' },
            { id: 'p2', nodeType: 'row', row: { id: 'row2', columns: [{ id: 'col2', children: [{ id: 'p3', nodeType: 'tileRef', tileKey: 'b' }] }] } },
            { id: 'p4', nodeType: 'tileRef', tileKey: 'c' }
          ]
        },
        { id: 'col3', children: [] }
      ]
    },
    { id: 'row3', columns: [{ id: 'col4', children: [{ id: 'p5', nodeType: 'tileRef', tileKey: 'd' }] }] }
  ];

  describe('flattenLayout', () => {
    it('lists every row and column in document order, tagged with its position', () => {
      const { rows, columns } = flattenLayout(tree());

      expect(rows.map((entry) => entry.row.id)).toEqual(['row1', 'row2', 'row3']);
      expect(rows[0]).toMatchObject({ depth: 0, topLevel: true, index: 0, siblingCount: 2, parentColumnId: null, parentRowId: null });
      expect(rows[1]).toMatchObject({ depth: 1, topLevel: false, index: 1, siblingCount: 3, parentColumnId: 'col1', parentRowId: 'row1' });
      expect(rows[2]).toMatchObject({ depth: 0, topLevel: true, index: 1 });

      expect(columns.map((entry) => entry.column.id)).toEqual(['col1', 'col2', 'col3', 'col4']);
      expect(columns[1]).toMatchObject({ rowId: 'row2', depth: 1, index: 0, siblingCount: 1 });
      expect(columns[2]).toMatchObject({ rowId: 'row1', depth: 0, index: 1, siblingCount: 2 });
    });

    it('returns empty lists for an empty tree', () => {
      expect(flattenLayout([])).toEqual({ rows: [], columns: [] });
    });
  });

  describe('findRowById / findColumnById', () => {
    it('finds top-level and nested nodes', () => {
      expect(findRowById(tree(), 'row2').columns[0].id).toBe('col2');
      expect(findRowById(tree(), 'row3').id).toBe('row3');
      expect(findColumnById(tree(), 'col2').children[0].tileKey).toBe('b');
      expect(findColumnById(tree(), 'col4').id).toBe('col4');
    });

    it('returns null for an unknown id', () => {
      expect(findRowById(tree(), 'nope')).toBeNull();
      expect(findColumnById(tree(), 'nope')).toBeNull();
    });
  });

  describe('updateRowById', () => {
    it('updates a nested row, leaving unrelated branches as the same references', () => {
      const rows = tree();
      const next = updateRowById(rows, 'row2', (row) => ({ ...row, height: 99 }));

      expect(findRowById(next, 'row2').height).toBe(99);
      expect(next[1]).toBe(rows[1]);
      expect(next[0].columns[1]).toBe(rows[0].columns[1]);
      expect(next[0].columns[0].children[0]).toBe(rows[0].columns[0].children[0]);
    });

    it('updates a top-level row', () => {
      const next = updateRowById(tree(), 'row3', (row) => ({ ...row, height: 10 }));
      expect(next[1].height).toBe(10);
    });

    it('returns the very same array when no row matches', () => {
      const rows = tree();
      expect(updateRowById(rows, 'nope', (row) => ({ ...row, height: 1 }))).toBe(rows);
    });
  });

  describe('updateColumnById', () => {
    it('updates a nested column, leaving unrelated branches as the same references', () => {
      const rows = tree();
      const next = updateColumnById(rows, 'col2', (column) => ({ ...column, width: '50%' }));

      expect(findColumnById(next, 'col2').width).toBe('50%');
      expect(next[1]).toBe(rows[1]);
    });

    it('returns the very same array when no column matches', () => {
      const rows = tree();
      expect(updateColumnById(rows, 'nope', (column) => ({ ...column, width: '1%' }))).toBe(rows);
    });
  });

  describe('updateRowColumns / updateColumnChildren', () => {
    it('updateRowColumns applies an op to a nested row\'s columns', () => {
      const next = updateRowColumns(tree(), 'row2', (columns) => [...columns, { id: 'new', children: [] }]);
      expect(findRowById(next, 'row2').columns.map((column) => column.id)).toEqual(['col2', 'new']);
    });

    it('updateColumnChildren applies an op to a column\'s children', () => {
      const next = updateColumnChildren(tree(), 'col3', (children) => [...children, { id: 'x', nodeType: 'empty' }]);
      expect(findColumnById(next, 'col3').children).toEqual([{ id: 'x', nodeType: 'empty' }]);
    });
  });

  describe('updateRowContainer', () => {
    it('applies the op to the top-level rows array for a top-level row', () => {
      const next = updateRowContainer(tree(), 'row3', (list, index) => removeAt(list, index));
      expect(next.map((row) => row.id)).toEqual(['row1']);
    });

    it('applies the op to the parent column\'s children for a nested row', () => {
      const next = updateRowContainer(tree(), 'row2', (list, index) => moveAt(list, index, 1));
      expect(findColumnById(next, 'col1').children.map((child) => child.id)).toEqual(['p1', 'p4', 'p2']);
    });

    it('supplies a clone function matching the level — a whole row at the top, a placement when nested', () => {
      const duplicate = (list, index, clone) => insertAt(list, index + 1, clone(list[index]));

      const topLevel = updateRowContainer(tree(), 'row1', duplicate);
      expect(topLevel).toHaveLength(3);
      expect(topLevel[1].id).not.toBe('row1');
      expect(topLevel[1].columns[0].children[1].row.columns[0].children[0].tileKey).toBe('b');

      const nested = updateRowContainer(tree(), 'row2', duplicate);
      const children = findColumnById(nested, 'col1').children;
      expect(children).toHaveLength(4);
      expect(children[2].nodeType).toBe('row');
      expect(children[2].id).not.toBe('p2');
      expect(children[2].row.id).not.toBe('row2');
    });

    it('returns rows unchanged for an unknown row id', () => {
      const rows = tree();
      expect(updateRowContainer(rows, 'nope', (list) => [])).toBe(rows);
    });
  });

  it('clonePlacementWithNewIds gives a tile placement a fresh id and keeps its tile', () => {
    const clone = clonePlacementWithNewIds({ id: 'p1', nodeType: 'tileRef', tileKey: 'a' });
    expect(clone.id).not.toBe('p1');
    expect(clone.tileKey).toBe('a');
  });
});
