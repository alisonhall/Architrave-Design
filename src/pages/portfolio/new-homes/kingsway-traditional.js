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
    title: 'Kingsway Traditional',
    text: 'Set in the heart of The Kingsway, this new family home evokes the character and flavour of the neighbourhood. Local stone and brick outside conceal a double-height foyer, panelled formal rooms and a casual great-room.'
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
    type: 'text-blurb',
    text: ''
  },
  {
    type: 'image-tile',
    num: '5'
  },
  {
    type: 'image-tile',
    num: '6'
  }
]

const KingswayTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio kingswayTraditional">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesKingswayTraditional">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/hoggs-hollow-french-country" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/hoggs-hollow-traditional" />
    </section>
  </Layout>
)

export default KingswayTraditional
