import React from 'react';

import reviewsData from '../../static/reviews';
import ReviewsPageLayout from '../components/reviewsPageLayout';

const Reviews = (props) => <ReviewsPageLayout reviews={reviewsData} location={props.location} />;

export default Reviews;
