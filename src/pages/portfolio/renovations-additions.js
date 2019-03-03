import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="renosAndAdditionsOverview">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutRenovations">
      <a href="/portfolio/renovations-additions/lytton-park-update.html" class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay">Lytton Park</p>
      </a>
      <a href="/portfolio/renovations-additions/etobicoke-renewal.html" class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">Etobicoke Restyling</p>
      </a>
      <a href="/portfolio/renovations-additions/cornwall-heritage-addition.html" class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay">Loyalist Addition</p>
      </a>
      <section class="textBlurb">
        <p>	Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.</p>
      </section>
      <a href="/portfolio/renovations-additions/rosedale-revival.html" class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay">Rosedale Revival</p>
      </a>
      <a href="/portfolio/renovations-additions/lorne-park-interior.html" class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay">Lorne Park Interior</p>
      </a>
    </section>
  </Layout>
)

export default ContactUs
