import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import dataItemSwitcher from "../components/dataItemSwitcher"

const data = [
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/hoggs-hollow-traditional',
    text: "Hogg's Hollow Traditional",
    num: '1'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/kingsway-georgian',
    text: 'Kingsway Georgian',
    num: '2'
  },
  {
    type: 'image-filler',
    num: '3'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/credit-river-classic',
    text: 'Credit River',
    num: '4'
  },
  {
    type: 'text-blurb',
    text: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/etobicoke-renewal',
    text: 'Etobicoke Facelift',
    num: '5'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/renovations-additions/lytton-park-update',
    text: 'Lytton Park Update',
    num: '6'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/kingsway-transitional',
    text: 'Kingsway Transitional',
    num: '7'
  },
  {
    type: 'image-filler',
    num: '8'
  },
  {
    type: 'image-filler',
    num: '9'
  }
]

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <SEO />
    <section class="contentWrapper layoutAll layoutHome">
      {data.map(item => dataItemSwitcher(item))}
    </section>
  </Layout>
)

export default IndexPage
