import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactUs = () => (
  <Layout mainClasses="contact">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper clearfix">
      <div class="contentBackground clearfix">
        <section class="textBlurb">
          <p><a href="mailto:architravedesign@rogers.com"><i class="fa fa-envelope"></i>architravedesign@rogers.com</a></p>
          <p><i class="fa fa-phone"></i>Toronto: 416-207-8881</p>
          <p><i class="fa fa-phone"></i>Mississauga & Oakville: 905-599-3097</p>
        </section>
      </div>
    </section>
  </Layout>
)

export default ContactUs
