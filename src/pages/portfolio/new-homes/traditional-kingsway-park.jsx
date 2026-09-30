import React from 'react';

import layoutData from '../../../../static/layouts/traditional-kingsway-park';
import DetailPageLayout from '../../../components/detailPageLayout';

const TraditionalKingswayPark = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default TraditionalKingswayPark;
