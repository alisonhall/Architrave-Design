import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio royalYorkFacelift">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layout1">
      <a class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay">Before</p>
      </a>
      <a class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">New Facade</p>
      </a>
      <section class="textBlurb">
        <p>	Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.</p>
      </section>
      <a href="" class="prevProject"><i class="fa fa-arrow-left"></i><span>Previous Project</span></a>
      <a href="" class="nextProject"><span>Next Project</span><i class="fa fa-arrow-right"></i></a>
    </section>
  </Layout>
)

export default ContactUs
