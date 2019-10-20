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
    title: "Rosedale Revival",
    text: "This 1917 home was a diamond in the rough. Powercleaning revealed attractive brick under the green paint. A new Edwardian-style bay and dormers gave it a historic character and quality it always lacked."
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

const RosedaleRevival = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio rosedaleRevival">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsRosedaleRevival">
      {data.map(item => dataItemSwitcher(item))}
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/cornwall-heritage-addition" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/lorne-park-interior" />
    </section>
  </Layout>
)

export default RosedaleRevival;
