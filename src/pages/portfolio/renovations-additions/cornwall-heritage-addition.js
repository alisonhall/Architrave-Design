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
    type: 'text-blurb',
    title: "Loyalist Farmhouse Addition",
    text: "A modern addition to this charming 1820’s home mirrors it’s proportions but more than doubles the living space. The ground floor is a country kitchen, topped by a vaulted master with sweeping views."
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
    type: 'image-tile',
    num: '4'
  },
  {
    type: 'image-tile',
    num: '5'
  },
  {
    type: 'image-tile',
    num: '6'
  },
  {
    type: 'image-tile',
    num: '7'
  }
]

const ContactUs = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio cornwallHeritageAddition">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsCornwallHeritageAddition">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/etobicoke-renewal" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/rosedale-revival" />
    </section>
  </Layout>
)

export default ContactUs
