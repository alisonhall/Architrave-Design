import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio upcoming">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutUpcoming">
      <a class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
      </a>
      <a class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
      </a>
      <section class="textBlurb">
        <p class="textOverlay">St. George's Rebuild</p>
        <p class="completionDate">Completion 2019</p>
      </section>
      <a class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
      </a>
      <section class="textBlurb">
        <p class="textOverlay">Oakville New Home</p>
        <p class="completionDate">Completion 2017</p>
      </section>
    </section>
  </Layout>
)

export default ContactUs
