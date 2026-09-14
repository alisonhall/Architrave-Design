let idCounter = 0;
/**
 * @description A unique-enough id for a layout tree node, used only as a React key and
 * to address nodes for editing — never emitted by the generator.
 */
export const makeId = (prefix) => {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Math.random().toString(36).slice(2, 8)}`;
};

export const replaceAt = (array, index, value) => array.map((item, i) => (i === index ? value : item));
export const removeAt = (array, index) => array.filter((_, i) => i !== index);
export const moveAt = (array, index, delta) => {
  const target = index + delta;
  if (target < 0 || target >= array.length) return array;
  const next = [...array];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

export const makeBlankRow = () => ({ id: makeId('row'), height: undefined, imageHeight: undefined, columns: [] });
export const makeBlankColumn = () => ({ id: makeId('column'), width: undefined, children: [] });
export const makeRowPlacement = () => ({ id: makeId('placement'), nodeType: 'row', row: makeBlankRow() });
export const makeTilePlacement = (tileKey) => ({ id: makeId('placement'), nodeType: 'tileRef', tileKey });

export const makeBlankTile = (kind) => {
  if (kind === 'project') return { kind: 'project', projectKey: '', backgroundPosition: '' };
  if (kind === 'filler') return { kind: 'filler', projectKey: '', imageUrl: '' };
  return { kind: 'text', text: '', useIntroText: true };
};

/**
 * @description Suggests a tile key from a project name/kind that doesn't collide with
 * any existing tile key, following the live site's own naming convention (e.g.
 * "kingswayTransitionalFiller" for a filler tile of the Kingsway Transitional project).
 */
export const suggestTileKey = (kind, projectKey, existingTiles) => {
  const base = kind === 'filler' && projectKey ? `${projectKey}Filler` : projectKey || `${kind}Tile`;
  if (!existingTiles[base]) return base;

  let suffix = 2;
  while (existingTiles[`${base}${suffix}`]) suffix += 1;
  return `${base}${suffix}`;
};

/**
 * @description Walks a layout's rows in document order and returns the tile keys in
 * the order they're first placed — this is the numbering the real site's Item
 * components use (num=1, 2, 3, ...) for a staggered fade-in animation on the first few
 * tiles. Only "image" tiles (project/filler) are numbered; text tiles never are.
 *
 * @param {Array} rows
 * @param {Object} tiles
 */
export const computeTileOrder = (rows, tiles) => {
  const order = [];
  const seen = new Set();

  const visitChildren = (children) => {
    children.forEach((child) => {
      if (child.nodeType === 'row') {
        visitColumns(child.row.columns);
      } else if (child.nodeType === 'tileRef' && !seen.has(child.tileKey)) {
        const tile = tiles[child.tileKey];
        if (tile && tile.kind !== 'text') {
          seen.add(child.tileKey);
          order.push(child.tileKey);
        } else if (tile) {
          seen.add(child.tileKey);
        }
      }
    });
  };

  const visitColumns = (columns) => columns.forEach((column) => visitChildren(column.children));

  rows.forEach((row) => visitColumns(row.columns));
  return order;
};
