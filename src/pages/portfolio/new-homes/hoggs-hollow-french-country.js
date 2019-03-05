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
    num: '4'
  },
  {
    type: 'text-blurb',
    title: "Hogg's Hollow French Country",
    text: "This home captures Hogg's Hollow's dual nature - rustic but refined. The exterior is stone and reclaimed brick, with a richly panelled and classically proportioned interior."
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

const HoggsHollowFrenchCountry = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio hoggsHollowFrenchCountry">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesHoggsHollowFrenchCountry">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/oakville-executive-home" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/kingsway-traditional" />
    </section>
  </Layout>
)

export default HoggsHollowFrenchCountry
