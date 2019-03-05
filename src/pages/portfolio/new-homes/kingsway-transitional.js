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
    title: 'Kingsway Transitional',
    text: 'The clients sought a street face that would fit with an established traditional neighbourhood. Contrasting that, the interior uses glass, steel and rich woods to create a light-filled contemporary feel.'
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
    type: 'text-blurb',
    text: ''
  },
  {
    type: 'image-tile',
    num: '7'
  },
  {
    type: 'image-tile',
    num: '8'
  }
]

const KingswayTransitional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio kingswayTransitional">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesKingswayTransitional">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/credit-river-classic" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/oakville-executive-home" />
    </section>
  </Layout>
)

export default KingswayTransitional
