import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio lyttonParkUpdate">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsLyttonParkUpdate">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Lytton Park Update</h2>
        <p>This lovely old home was full of charm and detail, but inside it was dark and lacked modern amenities. A new addition provided more space, while new windows and arches open the inside to light and views.</p>
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
      <Link to="/portfolio/renovations-additions/lorne-park-interior" class="prevProject">
        <img src={leftArrow} />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/renovations-additions/etobicoke-renewal" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
