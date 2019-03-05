import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import dataItemSwitcher from "../../../components/dataItemSwitcher";
import PrevNextProjectLink from "../../../components/prevNextProjectLink"

const data = [
  {
    type: 'image-tile',
    num: '1'
  },
  {
    type: 'image-tile',
    num: '2'
  },
  {
    type: 'image-tile',
    num: '3'
  },
  {
    type: 'text-blurb',
    title: "Lorne Park Interior",
    text: "Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch."
  },
  {
    type: 'image-tile',
    num: '4'
  },
  {
    type: 'image-tile',
    num: '5'
  }
]

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio lorneParkInterior">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsLorneParkInterior">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/rosedale-revival" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/lytton-park-update" />
    </section>
  </Layout>
)

export default ContactUs
