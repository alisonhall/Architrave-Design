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
    title: "Lytton Park Update",
    text: "This lovely old home was full of charm and detail, but inside it was dark and lacked modern amenities. A new addition provided more space, while new windows and arches open the inside to light and views."
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
  }
]

const LyttonParkUpdate = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio lyttonParkUpdate">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsLyttonParkUpdate">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/lorne-park-interior" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/etobicoke-renewal" />
    </section>
  </Layout>
)

export default LyttonParkUpdate;
