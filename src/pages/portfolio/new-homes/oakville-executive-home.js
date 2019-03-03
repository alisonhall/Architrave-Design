import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio oakvilleExecutiveHome">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesOakvilleExecutiveHome">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Oakville Executive Home</h2>
        <p>Dormers and a low roofline play down the size of this large stone and brick home in Oakville.</p>
      </section>
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
      <Link to="/portfolio/new-homes/kingsway-transitional" class="prevProject">
        <img src={leftArrow} />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/new-homes/hoggs-hollow-french-country" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
