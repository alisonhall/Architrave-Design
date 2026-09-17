import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import LayoutPreview from './layoutPreview';
import TileEditPopover from './tileEditPopover';
import LayoutResizeOverlay from './layoutResizeOverlay';
import { resolvePlacementClick } from './layoutClickOverlay';

/**
 * @description Combines the live preview with click-to-edit-in-preview (clicking any
 * tile, or an empty slot, opens a popover anchored to it for editing its fields or
 * assigning a different tile — see layoutClickOverlay.jsx / tileEditPopover.jsx) and
 * drag-to-resize (drag lines at each top-level row's bottom edge and each of its
 * columns' right edge — see layoutResizeOverlay.jsx). Both work the same way: rather
 * than a separate synthetic grid built from data (which has no way to know a row's
 * actual rendered height), they read the real preview's own DOM. One instance covers
 * one layout tree (a page's single `layout`, or one variant of a dual page's
 * `defaultLayout`/`wideLayout`).
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
  const [containerEl, setContainerEl] = useState(null);
  const [selection, setSelection] = useState(null);

  // A plain ref's `.current` isn't safe for LayoutResizeOverlay's first-mount
  // measurement (see its own comment) — this callback ref also stores the node in state,
  // so that component re-measures reactively once it's actually available, rather than on
  // whatever's left over from a stale ref read during the commit phase.
  const setContainer = (node) => {
    containerRef.current = node;
    setContainerEl(node);
  };

  const handleClick = (event) => {
    if (!containerRef.current) return;

    // A project tile renders as a real Gatsby <Link> (see buildProjectTile/imageLinkTile.jsx)
    // — clicking one here must open its edit popover, not navigate away from the admin
    // tool. Using the capture phase (not the usual bubble-phase onClick) means this runs
    // *before* the Link's own onClick, so stopPropagation actually keeps that handler from
    // ever firing rather than merely racing it; preventDefault additionally blocks the
    // browser's native navigation as a backstop.
    if (event.target.closest('a')) {
      event.preventDefault();
      event.stopPropagation();
    }

    const clicked = resolvePlacementClick(event, containerRef.current, rows);
    if (clicked) setSelection(clicked);
  };

  return (
    <div className="adminEditableLayoutPreview" ref={setContainer} onClickCapture={handleClick}>
      <LayoutPreview rows={rows} tiles={tiles} projects={projects} introText={introText} boundProject={boundProject} />
      <LayoutResizeOverlay containerEl={containerEl} rows={rows} onChangeRows={onChangeRows} />
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
