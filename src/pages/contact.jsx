import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import EmailIcon from '../images/email-icon.svg';
import PhoneIcon from '../images/phone-icon.svg';
import '../scss/_contact.scss';

const Contact = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="contact">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textBlurb">
          <div className="item email">
            <img className="icon email-icon" src={EmailIcon} alt="" />
            <p><a href="mailto:architravedesign@rogers.com"><i className="fa fa-envelope"></i>architravedesign@rogers.com</a></p>
          </div>
          <div className="item phone">
            <img className="icon phone-icon" src={PhoneIcon} alt="" />
            <p>Toronto: <a href="tel:4162078881">416-207-8881</a></p>
          </div>
          <div className="item phone">
            <img className="icon phone-icon" src={PhoneIcon} alt="" />
            <p>Mississauga & Oakville: <a href="tel:9055993097">905-599-3097</a></p>
          </div>
        </section>
      </div>
    </section>
    <p className="visually-hidden">
      Icon by <a href="https://freeicons.io/profile/3">freeicons</a> on <a href="https://freeicons.io">freeicons.io</a>
    </p>
  </Layout>
)

export default Contact
