import React from 'react';

import layoutData from '../../../../static/layouts/lytton-park-manor';
import DetailPageLayout from '../../../components/detailPageLayout';

const LyttonParkManor = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default LyttonParkManor;
