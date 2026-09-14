import React from 'react';
import PropTypes from 'prop-types';

import { buildProjectTile } from '../../../static/helpers';
import Row from '../rowHOC';
import Column from '../columnHOC';

/**
 * @description Renders a project exactly as it appears on the site — using the real
 * buildProjectTile/Row/Column/Item components — so edits in the form are reflected
 * pixel-for-pixel rather than in an approximation.
 *
 * @param {Object} param
 * @param {Object} param.project
 */
const ProjectPreview = ({ project }) => (
  <div className="adminProjectPreview">
    <Row height={300}>
      <Column width="48%">
        {buildProjectTile(project, 1)}
      </Column>
    </Row>
  </div>
);

ProjectPreview.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string,
    mainImageUrl: PropTypes.string
  }).isRequired
};

export default ProjectPreview;
