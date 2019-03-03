import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio kingswayTraditional">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesKingswayTraditional">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Kingsway Traditional</h2>
        <p>Set in the heart of The Kingsway, this new family home evokes the character and flavour of the neighbourhood. Local stone and brick outside conceal a double-height foyer, panelled formal rooms and a casual great-room.</p>
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
      <div class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurbFiller">
        <p></p>
      </section>
      <div class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image6 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv6"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/new-homes/hoggs-hollow-french-country" class="prevProject">
        <img src={leftArrow} />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/new-homes/hoggs-hollow-traditional" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
