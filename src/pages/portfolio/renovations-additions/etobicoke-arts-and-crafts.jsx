import React from 'react';

import layoutData from '../../../../static/layouts/etobicoke-arts-and-crafts';
import DetailPageLayout from '../../../components/detailPageLayout';

const EtobicokeArtsAndCrafts = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default EtobicokeArtsAndCrafts;
