import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio rosedaleRevival">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsRosedaleRevival">
      <div class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <section class="textBlurb">
        <h2>Rosedale Revival</h2>
        <p>This 1917 home was a diamond in the rough. Powercleaning revealed attractive brick under the green paint. A new Edwardian-style bay and dormers gave it a historic character and quality it always lacked.</p>
      </section>
      <div class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">Before</p>
      </div>
      <div class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/renovations-additions/cornwall-heritage-addition" class="prevProject">
        <img src={leftArrow} />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/renovations-additions/lorne-park-interior" class="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
