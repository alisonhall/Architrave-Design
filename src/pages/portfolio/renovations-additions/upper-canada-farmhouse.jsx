import React from 'react';

import layoutData from '../../../../static/layouts/upper-canada-farmhouse';
import DetailPageLayout from '../../../components/detailPageLayout';

const UpperCanadaFarmhouse = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default UpperCanadaFarmhouse;
