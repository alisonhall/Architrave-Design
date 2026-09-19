import { resolvePlacementClick } from '../layoutClickOverlay';

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

// resolvePlacementClick reads the real preview's rendered DOM (data-column-id
// attributes stamped by columnHOC.jsx, populated only from hydrated admin data — see
// layoutClickOverlay.jsx's own doc comment), so these tests build that DOM directly
// rather than rendering the full Row/Column/Item tree.
const buildColumnDom = (columnId, childCount) => {
  const root = document.createElement('div');
  const columnEl = document.createElement('div');
  columnEl.dataset.columnId = columnId;
  for (let i = 0; i < childCount; i += 1) {
    const child = document.createElement('div');
    child.textContent = `child-${i}`;
    columnEl.appendChild(child);
  }
  root.appendChild(columnEl);
  return { root, columnEl };
};

describe('resolvePlacementClick', () => {
  it('resolves a click on a tileRef placement to its tile key', () => {
    const { root, columnEl } = buildColumnDom('col1', 2);
    const rows = [row({}, [{ id: 'col1', width: undefined, children: [tileRef('a'), tileRef('b')] }])];

    const result = resolvePlacementClick({ target: columnEl.children[0] }, root, rows);

    expect(result.tileKey).toBe('a');
    expect(result.isEmpty).toBe(false);
    expect(result.anchor).toBe(columnEl.children[0]);
  });

  it('resolves a click deeper inside a placement (a grandchild element) to the same placement', () => {
    const { root, columnEl } = buildColumnDom('col1', 1);
    const grandchild = document.createElement('span');
    columnEl.children[0].appendChild(grandchild);
    const rows = [row({}, [{ id: 'col1', children: [tileRef('a')] }])];

    const result = resolvePlacementClick({ target: grandchild }, root, rows);

    expect(result.tileKey).toBe('a');
    expect(result.anchor).toBe(columnEl.children[0]);
  });

  it('treats an empty placement as assignable', () => {
    const { root, columnEl } = buildColumnDom('col1', 1);
    const rows = [row({}, [{ id: 'col1', children: [{ nodeType: 'empty' }] }])];

    const result = resolvePlacementClick({ target: columnEl.children[0] }, root, rows);

    expect(result.isEmpty).toBe(true);
    expect(result.tileKey).toBeNull();
  });

  it('treats a tileRef placement with no tileKey yet as assignable', () => {
    const { root, columnEl } = buildColumnDom('col1', 1);
    const rows = [row({}, [{ id: 'col1', children: [{ nodeType: 'tileRef', tileKey: '' }] }])];

    const result = resolvePlacementClick({ target: columnEl.children[0] }, root, rows);

    expect(result.isEmpty).toBe(true);
  });

  it('returns null when the click is outside any column', () => {
    const root = document.createElement('div');
    const outsider = document.createElement('div');
    root.appendChild(outsider);

    expect(resolvePlacementClick({ target: outsider }, root, [])).toBeNull();
  });

  it('returns null when the click lands on the column itself, not one of its children', () => {
    const { root, columnEl } = buildColumnDom('col1', 1);
    const rows = [row({}, [{ id: 'col1', children: [tileRef('a')] }])];

    expect(resolvePlacementClick({ target: columnEl }, root, rows)).toBeNull();
  });

  it('resolves the innermost column for a click inside a nested row', () => {
    const root = document.createElement('div');
    const outerColumn = document.createElement('div');
    outerColumn.dataset.columnId = 'outer';
    const nestedColumn = document.createElement('div');
    nestedColumn.dataset.columnId = 'inner';
    const leaf = document.createElement('div');
    nestedColumn.appendChild(leaf);
    outerColumn.appendChild(nestedColumn);
    root.appendChild(outerColumn);

    const rows = [row({}, [{
      id: 'outer',
      children: [{
        nodeType: 'row',
        row: row({}, [{ id: 'inner', children: [tileRef('nested')] }])
      }]
    }])];

    const result = resolvePlacementClick({ target: leaf }, root, rows);
    expect(result.tileKey).toBe('nested');
  });

  it('getNextRows only replaces the clicked placement, leaving siblings and other columns untouched', () => {
    const { root, columnEl } = buildColumnDom('col1', 2);
    const rows = [
      row({}, [
        { id: 'col1', children: [tileRef('a'), tileRef('b')] },
        { id: 'col2', children: [tileRef('c')] }
      ])
    ];

    const result = resolvePlacementClick({ target: columnEl.children[0] }, root, rows);
    const next = result.getNextRows('renamed');

    expect(next[0].columns[0].children).toEqual([tileRef('renamed'), tileRef('b')]);
    expect(next[0].columns[1].children).toEqual([tileRef('c')]);
  });

  it('getNextRows updates a nested column correctly, leaving the outer row structure intact', () => {
    const root = document.createElement('div');
    const outerColumn = document.createElement('div');
    outerColumn.dataset.columnId = 'outer';
    const nestedColumn = document.createElement('div');
    nestedColumn.dataset.columnId = 'inner';
    const leaf = document.createElement('div');
    nestedColumn.appendChild(leaf);
    outerColumn.appendChild(nestedColumn);
    root.appendChild(outerColumn);

    const rows = [row({ height: 400 }, [{
      id: 'outer',
      children: [{
        nodeType: 'row',
        row: row({}, [{ id: 'inner', children: [tileRef('nested')] }])
      }]
    }])];

    const result = resolvePlacementClick({ target: leaf }, root, rows);
    const next = result.getNextRows('swapped');

    expect(next[0].height).toBe(400);
    expect(next[0].columns[0].children[0].row.columns[0].children[0].tileKey).toBe('swapped');
  });
});
