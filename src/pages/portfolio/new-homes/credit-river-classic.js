import React from "react"
import { Link } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import leftArrow from "../../../images/arrow-left-solid.svg"
import rightArrow from "../../../images/arrow-right-solid.svg"

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio creditRiverClassic">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomesCreditRiverClassic">
      <div className="image image1 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv1"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image2 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv2"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image3 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv3"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <section className="textBlurb">
        <h2>Credit River Classic</h2>
        <h3>(Completion 2016)</h3>
        <p>The home owners sought a home suitable for both family living and entertaining on their riverside lot. Rich materials and the finest craftsmanship combine to create an atmosphere of casual elegance.</p>
      </section>
      <div className="image image4 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv4"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image5 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv5"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image6 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv6"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image7 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv7"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image8 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv8"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image9 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv9"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image10 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv10"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image11 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv11"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <div className="image image12 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv12"></div>
        </div>
        <p className="textOverlay"></p>
      </div>
      <Link to="/portfolio/new-homes/kingsway-georgian" className="prevProject">
        <img src={leftArrow} />
        <span>Previous Project</span>
      </Link>
      <Link to="/portfolio/new-homes/kingsway-transitional" className="nextProject">
        <span>Next Project</span>
        <img src={rightArrow} />
      </Link>
    </section>
  </Layout>
)

export default ContactUs
