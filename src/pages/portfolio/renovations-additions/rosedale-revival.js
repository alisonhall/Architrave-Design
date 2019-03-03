import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio rosedaleRevival">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutRenovationsRosedaleRevival">
      <a class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <section class="textBlurb">
        <h2>Rosedale Revival</h2>
        <p>This 1917 home was a diamond in the rough. Powercleaning revealed attractive brick under the green paint. A new Edwardian-style bay and dormers gave it a historic character and quality it always lacked.</p>
      </section>
      <a class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">Before</p>
      </a>
      <a class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a href="/portfolio/renovations-additions/cornwall-heritage-addition.html" class="prevProject"><i class="fa fa-arrow-left"></i><span>Previous Project</span></a>
      <a href="/portfolio/renovations-additions/lorne-park-interior.html" class="nextProject"><span>Next Project</span><i class="fa fa-arrow-right"></i></a>
    </section>
  </Layout>
)

export default ContactUs
