import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio etobicokeRenewal">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsEtobicokeRenewal">
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
      <div class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay">Before</p>
      </div>
      <div class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Etobicoke Facelift</h2>
        <p>This post-war bungalow had been added onto too many times. The exterior proportions were well suited for an Arts-and-Crafts make-over. Inside, custom cabinetry add warmth and character to all the rooms.</p>
      </section>
      <div class="image image6 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv6"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image7 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv7"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/renovations-additions/lytton-park-update" class="prevProject">
        <img src={leftArrow} alt="" />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/renovations-additions/cornwall-heritage-addition" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} alt="" />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
