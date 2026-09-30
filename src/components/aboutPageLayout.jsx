import React from 'react';
import PropTypes from 'prop-types';

import Layout from './layout';
import Seo from './seo';
import '../scss/_about.scss';

const sectionShape = PropTypes.shape({
  heading: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired
});

/**
 * @description The About page's actual content, with no site chrome — shared verbatim
 * by AboutPageLayout (wrapped in Layout/Seo below) and the admin tool's live preview
 * (rendered bare), so the two can never drift apart. `bio`'s photo and the page's
 * background image are fixed in _about.scss, not part of this data (there's no
 * admin-editable image upload in this tool).
 *
 * @param {Object} param
 * @param {Object} param.intro - { heading, paragraphs }
 * @param {Object} param.bio - { heading, paragraphs }
 * @param {Object} param.approach - { heading, paragraphs }
 */
export const AboutContent = ({ intro, bio, approach }) => (
  <section className="contentWrapper">
    <div className="contentBackground">
      <section className="textContent">
        <h2 className="heading">{intro.heading}</h2>
        {intro.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </section>
      <section className="centerContent">
        <section className="aboutImage" />
        <section className="textBlurb">
          <h2 className="heading">{bio.heading}</h2>
          {bio.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </section>
      </section>
      <section className="textContent">
        <h2 className="heading">{approach.heading}</h2>
        {approach.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </section>
    </div>
  </section>
);

AboutContent.propTypes = {
  intro: sectionShape.isRequired,
  bio: sectionShape.isRequired,
  approach: sectionShape.isRequired
};

/**
 * @description Renders the About page from its content data — the single source of
 * truth read from static/about.js by both this component and the admin tool's About
 * editor.
 *
 * @param {Object} param
 * @param {Object} param.location
 */
const AboutPageLayout = ({ intro, bio, approach, location }) => (
  <Layout urlPath={location.pathname} mainClasses="about">
    <Seo />
    <AboutContent intro={intro} bio={bio} approach={approach} />
  </Layout>
);

AboutPageLayout.propTypes = {
  intro: sectionShape.isRequired,
  bio: sectionShape.isRequired,
  approach: sectionShape.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
};

export default AboutPageLayout;
