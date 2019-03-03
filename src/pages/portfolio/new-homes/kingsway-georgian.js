import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio kingswayGeorgian">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesKingswayGeorgian">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Kingsway Georgian</h2>
        <p>This classic 3-storey Georgian home was built with an attention to detail. Rich cut limestone on the exterior and a beautifully paneled interior make it a home perfect for elegant entertaining or casual family living.</p>
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
      <div class="image image7 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv7"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image8 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv8"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image9 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv9"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image10 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv10"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image11 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv11"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image12 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv12"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/new-homes/hoggs-hollow-traditional" class="prevProject">
        <img src={leftArrow} alt="" />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/new-homes/credit-river-classic" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} alt="" />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
