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
    title: "Oakville Executive Home",
    text: "Dormers and a low roofline play down the size of this large stone and brick home in Oakville."
  },
  {
    type: 'image-tile',
    num: '2'
  },
  {
    type: 'image-tile',
    num: '3'
  }
]

const OakvilleExecutiveHome = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio oakvilleExecutiveHome">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomesOakvilleExecutiveHome">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/kingsway-transitional" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/hoggs-hollow-french-country" />
    </section>
  </Layout>
)

export default OakvilleExecutiveHome
