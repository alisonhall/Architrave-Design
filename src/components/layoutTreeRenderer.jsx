import React from 'react';

import { buildProjectTile } from '../../static/helpers';
import Row from './rowHOC';
import Column from './columnHOC';
import Item from './item';

/**
 * @description Walks a layout's rows in document order and returns the tile keys in
 * the order they're first placed — this is the numbering the real site's Item
 * components use (num=1, 2, 3, ...) for a staggered fade-in animation on the first few
 * tiles (see item.scss). Only "image" tiles (project/filler/image) are numbered; text
 * and description tiles never are. A tile keeps its own explicit `num` if it has one.
 *
 * @param {Array} rows
 * @param {Object} tiles
 */
const UNNUMBERED_TILE_KINDS = ['text', 'description'];

export const computeTileOrder = (rows, tiles) => {
  const order = [];
  const seen = new Set();

  const visitChildren = (children) => {
    children.forEach((child) => {
      if (child.nodeType === 'row') {
        visitColumns(child.row.columns);
      } else if (child.nodeType === 'tileRef' && !seen.has(child.tileKey)) {
        const tile = tiles[child.tileKey];
        if (tile && !UNNUMBERED_TILE_KINDS.includes(tile.kind)) {
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

const renderTile = (tileKey, context) => {
  const { tiles, projects, introText, numbers, boundProject } = context;
  const tile = tiles[tileKey];
  if (!tile) return null;
  const num = numbers[tileKey];

  if (tile.kind === 'project') {
    const project = projects[tile.projectKey];
    if (!project) return null;
    return buildProjectTile(project, num, { backgroundPosition: tile.backgroundPosition });
  }

  if (tile.kind === 'filler') {
    return (
      <Item
        num={num}
        project={tile.projectKey ? projects[tile.projectKey] : undefined}
        isFiller
        image={{ imageUrl: tile.imageUrl }}
      />
    );
  }

  if (tile.kind === 'image') {
    return (
      <Item
        num={num}
        image={{ imageUrl: tile.imageUrl, backgroundPosition: tile.backgroundPosition }}
        text={tile.overlayText ? { copy: tile.overlayText } : undefined}
      />
    );
  }

  if (tile.kind === 'description') {
    if (!boundProject) return null;
    return <Item text={{ title: boundProject.projectName, copy: boundProject.projectDescription }} />;
  }

  return <Item text={{ copy: tile.useIntroText ? introText : tile.text }} />;
};

// These are plain recursive functions, not components — Row/Column pass sizing to
// their content via React.cloneElement on their *direct* JSX children (see
// rowHOC.jsx/columnHOC.jsx), so nothing may sit between a <Row> and its <Column>s, or
// between a <Column> and its Item(s), or that injection silently drops.
const renderPlacement = (placement, index, context) => {
  const key = placement.id ?? index;
  if (placement.nodeType === 'tileRef') {
    const tile = renderTile(placement.tileKey, context);
    return tile ? React.cloneElement(tile, { key }) : null;
  }
  if (placement.nodeType === 'empty') return <Item key={key} />;
  return renderRow(placement.row, key, context);
};

const renderColumn = (column, key, context) => {
  // Column's own cloneElement-based sizing isn't null-safe (columnHOC.jsx), so a
  // placement that resolves to nothing — a deleted/unbound tile, only possible in the
  // admin's editing states, never in real committed data — must be filtered out here
  // rather than passed through as a literal `null` child.
  const items = column.children
    .map((child, index) => renderPlacement(child, index, context))
    .filter(Boolean);
  return (
    <Column key={key} width={column.width}>
      {items}
    </Column>
  );
};

const renderRow = (row, key, context) => (
  <Row key={key} height={row.height} imageHeight={row.imageHeight}>
    {row.columns.map((column, index) => renderColumn(column, column.id ?? index, context))}
  </Row>
);

/**
 * @description Renders one layout tree (a listing page's defaultLayout/wideLayout, or
 * a detail page's single/default/wide layout) with the real
 * Row/Column/Item/buildProjectTile components. Shared by the real production pages
 * (via listingPageLayout.jsx/detailPageLayout.jsx) and the admin tool's live preview,
 * so the two can never drift apart — there is only one rendering implementation.
 *
 * @param {Object} param
 * @param {Array} param.rows
 * @param {Object} param.tiles
 * @param {Object} param.projects
 * @param {string} param.introText - used by a listing page's shared-intro text tile
 * @param {Object} param.boundProject - used by a detail page's description tile
 */
export const renderLayoutTree = ({ rows, tiles, projects, introText, boundProject }) => {
  const numbers = {};
  computeTileOrder(rows, tiles).forEach((tileKey, index) => {
    numbers[tileKey] = tiles[tileKey].num ?? index + 1;
  });
  const context = { tiles, projects, introText, numbers, boundProject };

  return rows.map((row, index) => renderRow(row, row.id ?? index, context));
};
