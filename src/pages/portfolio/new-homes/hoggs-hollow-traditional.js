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
    title: "Hogg's Hollow Traditional",
    text: "This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight."
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

const HoggsHollowTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio hoggsHollowTraditional">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesHoggsHollowTraditional">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/kingsway-traditional" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/kingsway-georgian" />
    </section>
  </Layout>
)

export default HoggsHollowTraditional
