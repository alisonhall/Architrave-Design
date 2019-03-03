import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio hoggsHollowTraditional">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutNewHomesHoggsHollowTraditional">
      <a class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
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
      <section class="textBlurb">
        <h2>Hogg's Hollow Traditional</h2>
        <p>This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight.</p>
      </section>
      <a class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a href="/portfolio/new-homes/kingsway-traditional" class="prevProject"><i class="fa fa-arrow-left"></i><span>Previous Project</span></a>
      <a href="/portfolio/new-homes/kingsway-georgian" class="nextProject"><span>Next Project</span><i class="fa fa-arrow-right"></i></a>
    </section>
  </Layout>
)

export default ContactUs
