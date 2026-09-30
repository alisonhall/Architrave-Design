import React from 'react';

import layoutData from '../../../../static/layouts/kingsway-georgian';
import DetailPageLayout from '../../../components/detailPageLayout';

const KingswayGeorgian = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default KingswayGeorgian;
