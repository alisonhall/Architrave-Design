import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <SEO />
    <section class="contentWrapper layoutAll layoutHome">
      <Link to="/portfolio/new-homes/hoggs-hollow-traditional" class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay">Hogg's Hollow Traditional</p>
      </Link>
      <Link to="/portfolio/new-homes/kingsway-georgian" class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">Kingsway Georgian</p>
      </Link>
      <div class="image image3 clearfix imageFiller">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3 filler"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <Link to="/portfolio/new-homes/credit-river-classic" class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay">Credit River</p>
      </Link>
      <section class="textBlurb">
        <p>	Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.</p>
      </section>
      <Link to="/portfolio/renovations-additions/etobicoke-renewal" class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay">Etobicoke Facelift</p>
      </Link>
      <Link to="/portfolio/renovations-additions/lytton-park-update" class="image image6 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv6"></div>
        </div>
        <p class="textOverlay">Lytton Park Update</p>
      </Link>
      <Link to="/portfolio/new-homes/kingsway-transitional" class="image image7 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv7"></div>
        </div>
        <p class="textOverlay">Kingsway Transitional</p>
      </Link>
      <div class="image image8 clearfix imageFiller">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv8 filler"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
      <div class="image image9 clearfix imageFiller">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv9 filler"></div>
        </div>
        <p class="textOverlay"></p>
      </div>
    </section>
  </Layout>
)

export default IndexPage
