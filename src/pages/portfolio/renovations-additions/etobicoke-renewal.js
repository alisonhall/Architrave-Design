import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="portfolio etobicokeRenewal">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutRenovationsEtobicokeRenewal">
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
      <a class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay">Before</p>
      </a>
      <a class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <section class="textBlurb">
        <h2>Etobicoke Facelift</h2>
        <p>This post-war bungalow had been added onto too many times. The exterior proportions were well suited for an Arts-and-Crafts make-over. Inside, custom cabinetry add warmth and character to all the rooms.</p>
      </section>
      <a class="image image6 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv6"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a class="image image7 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv7"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a href="/portfolio/renovations-additions/lytton-park-update.html" class="prevProject"><i class="fa fa-arrow-left"></i><span>Previous Project</span></a>
      <a href="/portfolio/renovations-additions/cornwall-heritage-addition.html" class="nextProject"><span>Next Project</span><i class="fa fa-arrow-right"></i></a>
    </section>
  </Layout>
)

export default ContactUs
