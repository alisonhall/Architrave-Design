import React from 'react';
import PropTypes from 'prop-types';

import { buildProjectTile } from '../../../static/helpers';
import Row from '../rowHOC';
import Column from '../columnHOC';
import Item from '../item';
import { computeTileOrder } from './layoutHelpers';

const renderTile = (tileKey, context) => {
  const { tiles, projects, introText, numbers } = context;
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

  return <Item text={{ copy: tile.useIntroText ? introText : tile.text }} />;
};

const renderPlacement = (placement, context) => {
  if (placement.nodeType === 'tileRef') {
    return <React.Fragment key={placement.id}>{renderTile(placement.tileKey, context)}</React.Fragment>;
  }
  return <RenderedRow key={placement.id} row={placement.row} context={context} />;
};

const RenderedColumn = ({ column, context }) => (
  <Column width={column.width}>
    {column.children.map((child) => renderPlacement(child, context))}
  </Column>
);

RenderedColumn.propTypes = {
  column: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

const RenderedRow = ({ row, context }) => (
  <Row height={row.height} imageHeight={row.imageHeight}>
    {row.columns.map((column) => (
      <RenderedColumn key={column.id} column={column} context={context} />
    ))}
  </Row>
);

RenderedRow.propTypes = {
  row: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};

/**
 * @description Renders one layout variant (defaultLayout or wideLayout) with the real
 * Row/Column/Item/buildProjectTile components, using the draft's own projects data —
 * so edits to a project's image or name show up here immediately too.
 *
 * @param {Object} param
 * @param {Array} param.rows
 * @param {Object} param.tiles
 * @param {Object} param.projects
 * @param {string} param.introText
 */
const LayoutPreview = ({ rows, tiles, projects, introText }) => {
  const numbers = {};
  computeTileOrder(rows, tiles).forEach((tileKey, index) => {
    numbers[tileKey] = tiles[tileKey].num ?? index + 1;
  });
  const context = { tiles, projects, introText, numbers };

  return (
    <div className="adminLayoutPreview">
      {rows.map((row) => (
        <RenderedRow key={row.id} row={row} context={context} />
      ))}
    </div>
  );
};

LayoutPreview.propTypes = {
  rows: PropTypes.array.isRequired,
  tiles: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  introText: PropTypes.string.isRequired
};

export default LayoutPreview;
