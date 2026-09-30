import React from 'react';

import layoutData from '../../../../static/layouts/kingsway-transitional';
import DetailPageLayout from '../../../components/detailPageLayout';

const KingswayTransitional = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default KingswayTransitional;
