import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="contact">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textBlurb">
          <p><a href="mailto:architravedesign@rogers.com"><i className="fa fa-envelope"></i>architravedesign@rogers.com</a></p>
          <p><i className="fa fa-phone"></i>Toronto: <a href="tel:4162078881">416-207-8881</a></p>
          <p><i className="fa fa-phone"></i>Mississauga & Oakville: <a href="tel:9055993097">905-599-3097</a></p>
        </section>
      </div>
    </section>
  </Layout>
)

export default Contact
