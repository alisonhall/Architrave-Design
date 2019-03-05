import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import dataItemSwitcher from "../../../components/dataItemSwitcher";
import PrevNextProjectLink from "../../../components/prevNextProjectLink"

const data = [
  {
    type: 'image-tile',
    num: '1',
    textOverlay: 'Before'
  },
  {
    type: 'image-tile',
    num: '2',
    textOverlay: 'New Facade'
  },
  {
    type: 'text-blurb',
    text: "Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area."
  }
]

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio royalYorkFacelift">
    <SEO />
    <section class="contentWrapper layoutAll layout1">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="" />
      <PrevNextProjectLink direction="next" linkUrl="" />
    </section>
  </Layout>
)

export default ContactUs
