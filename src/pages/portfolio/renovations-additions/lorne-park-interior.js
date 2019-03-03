import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio lorneParkInterior">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutRenovationsLorneParkInterior">
      <a class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <section class="textBlurb">
        <h2>Lorne Park Interior</h2>
        <p>Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch.</p>
      </section>
      <a class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a href="/portfolio/renovations-additions/rosedale-revival.html" class="prevProject"><i class="fa fa-arrow-left"></i><span>Previous Project</span></a>
      <a href="/portfolio/renovations-additions/lytton-park-update.html" class="nextProject"><span>Next Project</span><i class="fa fa-arrow-right"></i></a>
    </section>
  </Layout>
)

export default ContactUs
