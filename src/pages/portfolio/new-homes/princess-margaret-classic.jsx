import React from 'react';

import layoutData from '../../../../static/layouts/princess-margaret-classic';
import DetailPageLayout from '../../../components/detailPageLayout';

const PrincessMargaretClassic = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default PrincessMargaretClassic;
