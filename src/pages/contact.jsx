import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/_contact.scss';

const Contact = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="contact">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textBlurb">
          <p><a href="mailto:architravedesign@rogers.com"><i className="fa fa-envelope"></i>architravedesign@rogers.com</a></p>
          <p><i className="fa fa-phone"></i>Toronto: 416-207-8881</p>
          <p><i className="fa fa-phone"></i>Mississauga & Oakville: 905-599-3097</p>
        </section>
      </div>
    </section>
  </Layout>
)

export default Contact
