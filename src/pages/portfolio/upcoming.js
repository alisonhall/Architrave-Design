import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Upcoming = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio upcoming">
    <SEO />
    <section className="contentWrapper layoutAll layoutUpcoming">
      <div className="image image2 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv2"></div>
        </div>
      </div>
      <div className="image image4 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv4"></div>
        </div>
      </div>
      <section className="textBlurb">
        <p className="textOverlay">St. George's Rebuild</p>
        <p className="completionDate">Completion 2019</p>
      </section>
      <div className="image image1 clearfix">
        <div className="shadowOverlay clearfix">
          <div className="imageDiv imageDiv1"></div>
        </div>
      </div>
      <section className="textBlurb">
        <p className="textOverlay">Oakville New Home</p>
        <p className="completionDate">Completion 2017</p>
      </section>
    </section>
  </Layout>
)

export default Upcoming
