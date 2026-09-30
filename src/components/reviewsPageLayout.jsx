import React from 'react';
import PropTypes from 'prop-types';

import constants from '../../static/app-constants';

import Layout from './layout';
import Seo from './seo';
import '../scss/_reviews.scss';

import houzzReviewsLogo from '../images/houzz_logo_reviews.png';

const { houzz } = constants;

const reviewTextProp = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]);

export const ReviewSection = ({ name, projectDate, text }) => {
  const paragraphs = Array.isArray(text) ? text : [text];
  return (
    <section className="review">
      <h3>{name}</h3>
      <h4>Project Date:</h4>
      <h5>{projectDate}</h5>
      {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </section>
  );
};

ReviewSection.propTypes = {
  name: PropTypes.string.isRequired,
  projectDate: PropTypes.string.isRequired,
  text: reviewTextProp.isRequired
};

/**
 * @description The Reviews page's actual content, with no site chrome — shared verbatim
 * by ReviewsPageLayout (wrapped in Layout/Seo below) and the admin tool's live preview
 * (rendered bare), so the two can never drift apart. The Houzz reviews link at the
 * bottom is always present, sourced from static/app-constants.js's `houzz.reviewsUrl`
 * (a fixed site-wide link, not part of the review list itself).
 *
 * @param {Object} param
 * @param {Array} param.reviews - each { name, projectDate, text } — text is a string or
 * an array of strings for a multi-paragraph review
 */
export const ReviewsContent = ({ reviews }) => (
  <section className="contentWrapper clearfix">
    <div className="contentBackground clearfix">
      <section className="textContent">
        {reviews.map((review, index) => <ReviewSection key={index} {...review} />)}
        <section className="textBlurb">
          <p>
            <a href={houzz.reviewsUrl}>
              <img src={houzzReviewsLogo} alt="Houzz Reviews" />
            </a>
          </p>
        </section>
      </section>
    </div>
  </section>
);

ReviewsContent.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    projectDate: PropTypes.string.isRequired,
    text: reviewTextProp.isRequired
  })).isRequired
};

/**
 * @description Renders the Reviews page from its review list — the single source of
 * truth read from static/reviews.js by both this component and the admin tool's
 * Reviews editor.
 *
 * @param {Object} param
 * @param {Array} param.reviews
 * @param {Object} param.location
 */
const ReviewsPageLayout = ({ reviews, location }) => (
  <Layout urlPath={location.pathname} mainClasses="reviews">
    <Seo />
    <ReviewsContent reviews={reviews} />
  </Layout>
);

ReviewsPageLayout.propTypes = {
  reviews: ReviewsContent.propTypes.reviews,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
};

export default ReviewsPageLayout;
