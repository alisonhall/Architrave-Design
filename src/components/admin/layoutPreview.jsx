import React from 'react';
import PropTypes from 'prop-types';

import { renderLayoutTree } from '../layoutTreeRenderer';

// Stands in for a placement whose tile doesn't resolve (just added via "Add tile", or
// its tile was deleted from the library) — otherwise it would render nothing at all,
// leaving no way to see it or click it to assign a tile. It must still be a real,
// direct child of its column: resolvePlacementClick (layoutClickOverlay.jsx) maps a
// click back to its data by DOM child index. Column passes every child a `dimensions`
// prop via cloneElement (columnHOC.jsx), hence a component (which simply ignores it)
// rather than a bare <div>, which React would warn about an unknown attribute on.
export const UnassignedSlot = () => (
  <div className="adminLayoutPreview-unassigned">Empty slot — click to choose a tile</div>
);

const renderUnresolved = () => <UnassignedSlot />;

/**
 * @description The admin tool's live preview for one layout tree. This wraps the same
 * `renderLayoutTree` the real production pages render through (`listingPageLayout.jsx`
 * / `detailPageLayout.jsx`) — there is only one rendering implementation, so the
 * preview can never drift from what actually ships.
 *
 * @param {Object} param
 * @param {Array} param.rows
 * @param {Object} param.tiles
 * @param {Object} param.projects
 * @param {string} param.introText - used by a listing page's shared-intro text tile
 * @param {Object} param.boundProject - used by a detail page's description tile
 */
const LayoutPreview = ({ rows, tiles, projects, introText, boundProject }) => (
  <div className="adminLayoutPreview">
    {renderLayoutTree({ rows, tiles, projects, introText, boundProject, renderUnresolved })}
  </div>
);

LayoutPreview.propTypes = {
  rows: PropTypes.array.isRequired,
  tiles: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  introText: PropTypes.string,
  boundProject: PropTypes.object
};

LayoutPreview.defaultProps = {
  introText: '',
  boundProject: null
};

export default LayoutPreview;
