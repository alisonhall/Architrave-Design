import React from 'react';

import layoutData from '../../../../static/layouts/credit-river-manor';
import DetailPageLayout from '../../../components/detailPageLayout';

const CreditRiverManor = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default CreditRiverManor;
