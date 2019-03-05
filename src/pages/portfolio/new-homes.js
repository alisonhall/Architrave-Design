import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import dataItemSwitcher from "../../components/dataItemSwitcher";

const data = [
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/hoggs-hollow-traditional',
    text: "Hogg's Hollow Traditional",
    num: '1',
    imageUrl: '../images/New-Homes/HoggsHollowTraditional-4.jpg',
    backgroundPosition: '100% 0%',
    width: 'calc(48% - (1.5% * 2))',
    height: 'calc(500px * 0.6)'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/kingsway-georgian',
    text: "Kingsway Georgian",
    num: '2'
  },
  {
    type: 'image-filler',
    num: '3'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/credit-river-classic',
    text: "Credit River",
    num: '4'
  },
  {
    type: 'text-blurb',
    text: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/kingsway-transitional',
    text: "Kingsway Transitional",
    num: '5'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/oakville-executive-home',
    text: "Oakville Executive",
    num: '6'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/hoggs-hollow-french-country',
    text: "Hogg's Hollow French Country",
    num: '7'
  },
  {
    type: 'image-link',
    linkUrl: '/portfolio/new-homes/kingsway-traditional',
    text: "Kingsway Traditional",
    num: '8'
  }
]

const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section class="contentWrapper layoutAll layoutNewHomes">
      {data.map(item => dataItemSwitcher(item))}
    </section>
  </Layout>
)

export default NewHomes
