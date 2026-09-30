import React from 'react';

import layoutData from '../../../../static/layouts/hoggs-hollow-french';
import DetailPageLayout from '../../../components/detailPageLayout';

const HoggsHollowTraditional = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default HoggsHollowTraditional;
