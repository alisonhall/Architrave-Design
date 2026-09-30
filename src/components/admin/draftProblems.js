const TREE_LABELS = {
  layout: 'Layout',
  defaultLayout: 'Default layout',
  wideLayout: 'Wide layout'
};

// Where something sits, for a person to find it: e.g. "Wide layout, row 3 › column 2 ›
// row 1".
const describePath = (field, steps) => `${TREE_LABELS[field]}, ${steps.join(' › ')}`;

/**
 * @description Finds everything in one page's layout that would render wrong on the live
 * site — each as { where, problem } — so it can be fixed before the file is applied:
 *
 * - a spot with no tile chosen yet, or pointing at a tile that no longer exists (the
 *   live site renders nothing there);
 * - a tile pointing at a project that doesn't exist (a project tile renders nothing; a
 *   filler loses its project);
 * - a row with no columns, or a column with nothing in it (an empty gap, or a row that
 *   collapses to nothing);
 * - a layout with no rows at all.
 *
 * @param {Object} pageLayout - one page's layout draft
 * @param {Object} projects - the draft's projects
 * @returns {Array} [{ where, problem }]
 */
export const findLayoutProblems = (pageLayout, projects) => {
  const problems = [];
  const { tiles } = pageLayout;

  Object.entries(tiles).forEach(([tileKey, tile]) => {
    if (tile.kind === 'project' && !projects[tile.projectKey]) {
      problems.push({ where: `Tile "${tileKey}"`, problem: 'points at a project that doesn\'t exist, so it shows nothing.' });
    }
    if (tile.kind === 'filler' && tile.projectKey && !projects[tile.projectKey]) {
      problems.push({ where: `Tile "${tileKey}"`, problem: 'points at a project that doesn\'t exist.' });
    }
  });

  const visitRow = (field, row, steps) => {
    if (row.columns.length === 0) {
      problems.push({ where: describePath(field, steps), problem: 'has no columns, so it shows nothing.' });
    }
    row.columns.forEach((column, columnIndex) => {
      const columnSteps = [...steps, `column ${columnIndex + 1}`];
      if (column.children.length === 0) {
        problems.push({ where: describePath(field, columnSteps), problem: 'is empty.' });
      }
      column.children.forEach((placement, placementIndex) => {
        if (placement.nodeType === 'row') {
          visitRow(field, placement.row, [...columnSteps, `row ${placementIndex + 1}`]);
          return;
        }
        if (placement.nodeType !== 'tileRef') return;
        const where = describePath(field, [...columnSteps, `item ${placementIndex + 1}`]);
        if (!placement.tileKey) {
          problems.push({ where, problem: 'is an empty slot with no tile chosen, so it shows nothing.' });
        } else if (!tiles[placement.tileKey]) {
          problems.push({ where, problem: `uses the tile "${placement.tileKey}", which no longer exists.` });
        }
      });
    });
  };

  Object.keys(TREE_LABELS).forEach((field) => {
    const rows = pageLayout[field];
    if (!rows) return;
    if (rows.length === 0) problems.push({ where: TREE_LABELS[field], problem: 'has no rows yet.' });
    rows.forEach((row, rowIndex) => visitRow(field, row, [`row ${rowIndex + 1}`]));
  });

  return problems;
};
