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
    title: 'Credit River Classic',
    subTitle: '(Completion 2016)',
    text: 'The home owners sought a home suitable for both family living and entertaining on their riverside lot. Rich materials and the finest craftsmanship combine to create an atmosphere of casual elegance.'
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
  }
]

const CreditRiverClassic = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio creditRiverClassic">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomesCreditRiverClassic">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/kingsway-georgian" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/kingsway-transitional" />
    </section>
  </Layout>
)

export default CreditRiverClassic
