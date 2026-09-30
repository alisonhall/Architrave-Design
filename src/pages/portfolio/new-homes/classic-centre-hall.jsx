import React from 'react';

import layoutData from '../../../../static/layouts/classic-centre-hall';
import DetailPageLayout from '../../../components/detailPageLayout';

const ClassicCentreHall = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default ClassicCentreHall;
