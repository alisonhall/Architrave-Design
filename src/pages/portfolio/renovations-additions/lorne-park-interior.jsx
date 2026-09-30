import React from 'react';

import layoutData from '../../../../static/layouts/lorne-park-interior';
import DetailPageLayout from '../../../components/detailPageLayout';

const LorneParkInterior = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default LorneParkInterior;
