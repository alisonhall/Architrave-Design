import React from 'react';

import layoutData from '../../../static/layouts/renovations-additions';
import ListingPageLayout from '../../components/listingPageLayout';

const RenovationsAdditions = (props) => <ListingPageLayout {...layoutData} location={props.location} />;

export default RenovationsAdditions;
