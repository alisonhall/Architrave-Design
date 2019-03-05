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
    title: 'Kingsway Georgian',
    text: 'This classic 3-storey Georgian home was built with an attention to detail. Rich cut limestone on the exterior and a beautifully paneled interior make it a home perfect for elegant entertaining or casual family living.'
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
  },
  {
    type: 'image-tile',
    num: '7'
  },
  {
    type: 'image-tile',
    num: '8'
  },
  {
    type: 'image-tile',
    num: '9'
  },
  {
    type: 'image-tile',
    num: '10'
  },
  {
    type: 'image-tile',
    num: '11'
  },
  {
    type: 'image-tile',
    num: '12'
  },
]

const KingswayGeorgian = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio kingswayGeorgian">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesKingswayGeorgian">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/hoggs-hollow-traditional" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/credit-river-classic" />
    </section>
  </Layout>
)

export default KingswayGeorgian
