import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const ContactUs = () => (
  <Layout mainClasses="newHomesOverview">
    <SEO title="Architrave Design, Architect | Residential Designs" />
    <section class="contentWrapper layoutAll layoutNewHomes">
      <a href="/portfolio/new-homes/hoggs-hollow-traditional.html" class="image image1 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv1"></div>
        </div>
        <p class="textOverlay">Hogg's Hollow Traditional</p>
      </a>
      <a href="/portfolio/new-homes/kingsway-georgian.html" class="image image2 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv2"></div>
        </div>
        <p class="textOverlay">Kingsway Georgian</p>
      </a>
      <a class="image image3 clearfix imageFiller">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv3 filler"></div>
        </div>
        <p class="textOverlay"></p>
      </a>
      <a href="/portfolio/new-homes/credit-river-classic.html" class="image image4 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv4"></div>
        </div>
        <p class="textOverlay">Credit River</p>
      </a>
      <section class="textBlurb">
        <p>	Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.</p>
      </section>
      <a href="/portfolio/new-homes/kingsway-transitional.html" class="image image5 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv5"></div>
        </div>
        <p class="textOverlay">Kingsway Transitional</p>
      </a>
      <a href="/portfolio/new-homes/oakville-executive-home.html" class="image image6 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv6"></div>
        </div>
        <p class="textOverlay">Oakville Executive</p>
      </a>
      <a href="/portfolio/new-homes/hoggs-hollow-french-country.html" class="image image7 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv7"></div>
        </div>
        <p class="textOverlay">Hogg's Hollow French Country</p>
      </a>
      <a href="/portfolio/new-homes/kingsway-traditional.html" class="image image8 clearfix">
        <div class="shadowOverlay clearfix">
          <div class="imageDiv imageDiv8"></div>
        </div>
        <p class="textOverlay">Kingsway Traditional</p>
      </a>
    </section>
  </Layout>
)

export default ContactUs
