import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio lorneParkInterior">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsLorneParkInterior">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Lorne Park Interior</h2>
        <p>Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch.</p>
      </section>
      <div class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/renovations-additions/rosedale-revival" class="prevProject">
        <img src={leftArrow} alt="" />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/renovations-additions/lytton-park-update" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} alt="" />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
