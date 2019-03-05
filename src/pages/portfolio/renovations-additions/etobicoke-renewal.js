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
    type: 'image-tile',
    num: '4',
    textOverlay: 'Before'
  },
  {
    type: 'image-tile',
    num: '5'
  },
  {
    type: 'text-blurb',
    title: "Etobicoke Facelift",
    text: "This post-war bungalow had been added onto too many times. The exterior proportions were well suited for an Arts-and-Crafts make-over. Inside, custom cabinetry add warmth and character to all the rooms."
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
  <Layout urlPath={props.location.pathname} mainClasses="portfolio etobicokeRenewal">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsEtobicokeRenewal">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/lytton-park-update" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/cornwall-heritage-addition" />
    </section>
  </Layout>
)

export default ContactUs
