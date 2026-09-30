import React from 'react';

import layoutData from '../../../../static/layouts/royal-york-facelift';
import DetailPageLayout from '../../../components/detailPageLayout';

const RoyalYorkFacelift = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default RoyalYorkFacelift;
