import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio cornwallHeritageAddition">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsCornwallHeritageAddition">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Loyalist Farmhouse Addition</h2>
        <p>A modern addition to this charming 1820’s home mirrors it’s proportions but more than doubles the living space. The ground floor is a country kitchen, topped by a vaulted master with sweeping views.</p>
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
      <div class="image image7 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv7"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/renovations-additions/etobicoke-renewal" class="prevProject">
        <img src={leftArrow} alt="" />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/renovations-additions/rosedale-revival" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} alt="" />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
