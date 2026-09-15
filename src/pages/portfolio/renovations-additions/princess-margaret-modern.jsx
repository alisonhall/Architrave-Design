import React from 'react';

import layoutData from '../../../../static/layouts/princess-margaret-modern';
import DetailPageLayout from '../../../components/detailPageLayout';

const PrincessMargaretModern = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default PrincessMargaretModern;
