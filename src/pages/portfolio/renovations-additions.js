import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovations">
      <Link to="/portfolio/renovations-additions/lytton-park-update" class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay">Lytton Park</p>
      </Link>
      <Link to="/portfolio/renovations-additions/etobicoke-renewal" class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">Etobicoke Restyling</p>
      </Link>
      <Link to="/portfolio/renovations-additions/cornwall-heritage-addition" class="image image3 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3"></div>
        </div>
        <p class="textOverlay">Loyalist Addition</p>
      </Link>
      <section class="textBlurb">
        <p>	Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.</p>
      </section>
      <Link to="/portfolio/renovations-additions/rosedale-revival" class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay">Rosedale Revival</p>
      </Link>
      <Link to="/portfolio/renovations-additions/lorne-park-interior" class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay">Lorne Park Interior</p>
      </Link>
    </section>
  </Layout>
)

export default ContactUs
