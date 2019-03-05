import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import dataItemSwitcher from "../../components/dataItemSwitcher"

const data = [
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/lytton-park-update',
    text: "Lytton Park",
    num: '1'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/etobicoke-renewal',
    text: "Etobicoke Restyling",
    num: '2'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/cornwall-heritage-addition',
    text: "Loyalist Addition",
    num: '3'
  },
  {
    type: 'text-blurb',
    text: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/rosedale-revival',
    text: "Rosedale Revival",
    num: '4'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/lorne-park-interior',
    text: "Lorne Park Interior",
    num: '5'
  },
]

const RenovationsAdditions = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovations">
      {data.map(item => dataItemSwitcher(item))}
    </section>
  </Layout>
)

export default RenovationsAdditions
