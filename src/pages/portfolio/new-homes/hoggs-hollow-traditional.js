import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio hoggsHollowTraditional">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesHoggsHollowTraditional">
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
        <h2>Hogg's Hollow Traditional</h2>
        <p>This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight.</p>
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
      <Link to="/portfolio/new-homes/kingsway-traditional" class="prevProject">
        <img src={leftArrow} alt="" />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/new-homes/kingsway-georgian" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} alt="" />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
