import React from 'react';
import PropTypes from 'prop-types';

import { AboutContent } from '../aboutPageLayout';

/**
 * @description The admin tool's live preview of the About page's content. Wraps the
 * same AboutContent the real production page renders (with no site chrome) — there is
 * only one rendering implementation, so the preview can never drift from what ships.
 */
const AboutPreview = ({ intro, bio, approach }) => (
  <div className="adminAboutPreview">
    <AboutContent intro={intro} bio={bio} approach={approach} />
  </div>
);

const sectionShape = PropTypes.shape({
  heading: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired
});

AboutPreview.propTypes = {
  intro: sectionShape.isRequired,
  bio: sectionShape.isRequired,
  approach: sectionShape.isRequired
};

export default AboutPreview;
