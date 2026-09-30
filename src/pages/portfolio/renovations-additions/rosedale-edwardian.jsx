import React from 'react';

import layoutData from '../../../../static/layouts/rosedale-edwardian';
import DetailPageLayout from '../../../components/detailPageLayout';

const RosedaleEdwardian = (props) => <DetailPageLayout {...layoutData} location={props.location} />;

export default RosedaleEdwardian;
