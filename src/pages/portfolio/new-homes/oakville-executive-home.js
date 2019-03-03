import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio oakvilleExecutiveHome">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutNewHomesOakvilleExecutiveHome">
      <a class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <section class="textBlurb">
        <h2>Oakville Executive Home</h2>
        <p>Dormers and a low roofline play down the size of this large stone and brick home in Oakville.</p>
      </section>
      <a class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a href="/portfolio/new-homes/kingsway-transitional" class="prevProject"><i class="fa fa-arrow-left"></i><span>Previous Project</span></a>
      <a href="/portfolio/new-homes/hoggs-hollow-french-country" class="nextProject"><span>Next Project</span><i class="fa fa-arrow-right"></i></a>
    </section>
  </Layout>
)

export default ContactUs
