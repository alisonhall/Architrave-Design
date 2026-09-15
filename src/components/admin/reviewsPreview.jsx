import React from 'react';
import PropTypes from 'prop-types';

import { ReviewsContent } from '../reviewsPageLayout';

/**
 * @description The admin tool's live preview of the Reviews page's content. Wraps the
 * same ReviewsContent the real production page renders (with no site chrome) — there is
 * only one rendering implementation, so the preview can never drift from what ships.
 */
const ReviewsPreview = ({ reviews }) => (
  <div className="adminReviewsPreview">
    <ReviewsContent reviews={reviews} />
  </div>
);

ReviewsPreview.propTypes = {
  reviews: ReviewsContent.propTypes.reviews
};

export default ReviewsPreview;
