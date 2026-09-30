import React from 'react';

import layoutData from '../../static/layouts/index';
import ListingPageLayout from '../components/listingPageLayout';

const IndexPage = (props) => <ListingPageLayout {...layoutData} location={props.location} />;

export default IndexPage;
