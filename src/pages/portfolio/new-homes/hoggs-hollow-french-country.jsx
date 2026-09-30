import React from 'react';

import layoutData from '../../../../static/layouts/hoggs-hollow-french-country';
import DetailPageLayout from '../../../components/detailPageLayout';

const HoggsHollowFrenchCountry = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default HoggsHollowFrenchCountry;
