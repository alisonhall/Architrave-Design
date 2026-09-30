import React from 'react';

import layoutData from '../../../static/layouts/new-homes';
import ListingPageLayout from '../../components/listingPageLayout';

const NewHomes = (props) => <ListingPageLayout {...layoutData} location={props.location} />;

export default NewHomes;
