import React from 'react';

import layoutData from '../../../../static/layouts/oakville-executive-home';
import DetailPageLayout from '../../../components/detailPageLayout';

const OakvilleExecutiveHome = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default OakvilleExecutiveHome;
