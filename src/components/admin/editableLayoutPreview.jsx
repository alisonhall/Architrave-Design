import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import LayoutPreview from './layoutPreview';
import TileEditPopover from './tileEditPopover';
import { resolvePlacementClick } from './layoutClickOverlay';

/**
 * @description Combines the live preview with click-to-edit-in-preview: clicking any
 * tile (or an empty slot) opens a popover, anchored to it, for editing its fields or
 * assigning a different tile — see layoutClickOverlay.jsx (click resolution) /
 * tileEditPopover.jsx (the popover itself) — rather than scrolling to find it in a
 * separate list. One instance covers one layout tree (a page's single `layout`, or one
 * variant of a dual page's `defaultLayout`/`wideLayout`).
 *
 * @param {Object} param
 * @param {Array} param.rows
 * @param {Object} param.tiles
 * @param {Object} param.projects
 * @param {string} [param.introText]
 * @param {Object} [param.boundProject]
 * @param {Array} param.kinds - tile kinds this page supports adding
 * @param {Function} param.onChangeRows - called with the updated `rows` for this tree
 * @param {Function} param.onChangeTiles - called with the updated `tiles` map
 * @param {Function} param.onCreateTileAndAssign - called with (key, values, rows) to add a tile and assign it in one atomic update
 * @param {Function} [param.onRenameTile]
 */
const EditableLayoutPreview = ({
  rows,
  tiles,
  projects,
  introText,
  boundProject,
  kinds,
  onChangeRows,
  onChangeTiles,
  onCreateTileAndAssign,
  onRenameTile
}) => {
  const containerRef = useRef(null);
  const [selection, setSelection] = useState(null);

  const handleClick = (event) => {
    if (!containerRef.current) return;
    const clicked = resolvePlacementClick(event, containerRef.current, rows);
    if (clicked) setSelection(clicked);
  };

  return (
    <div className="adminEditableLayoutPreview" ref={containerRef} onClick={handleClick}>
      <LayoutPreview rows={rows} tiles={tiles} projects={projects} introText={introText} boundProject={boundProject} />
      <TileEditPopover
        selection={selection}
        tiles={tiles}
        onChangeTiles={onChangeTiles}
        onRenameTile={onRenameTile}
        onAssignRows={onChangeRows}
        onCreateTileAndAssign={onCreateTileAndAssign}
        projects={projects}
        kinds={kinds}
        onClose={() => setSelection(null)}
      />
    </div>
  );
};

EditableLayoutPreview.propTypes = {
  rows: PropTypes.array.isRequired,
  tiles: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  introText: PropTypes.string,
  boundProject: PropTypes.object,
  kinds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeRows: PropTypes.func.isRequired,
  onChangeTiles: PropTypes.func.isRequired,
  onCreateTileAndAssign: PropTypes.func.isRequired,
  onRenameTile: PropTypes.func
};

EditableLayoutPreview.defaultProps = {
  introText: '',
  boundProject: null,
  onRenameTile: null
};

export default EditableLayoutPreview;
