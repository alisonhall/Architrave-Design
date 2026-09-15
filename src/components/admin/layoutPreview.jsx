import React from 'react';
import PropTypes from 'prop-types';

import { renderLayoutTree } from '../layoutTreeRenderer';

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
    {renderLayoutTree({ rows, tiles, projects, introText, boundProject })}
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
