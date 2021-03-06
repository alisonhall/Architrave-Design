import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const NotFoundPage = (props) => (
  <Layout urlPath={props.location.pathname}>
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a page that doesn't exist. Please try a different URL.</p>
  </Layout>
)

export default NotFoundPage
