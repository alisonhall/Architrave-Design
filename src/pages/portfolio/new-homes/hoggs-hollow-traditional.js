import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import PrevNextProjectLink from "../../../components/prevNextProjectLink"

import image1 from '../../../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../../../images/New-Homes/HoggsHollowTraditional-1.jpg';
import image3 from '../../../images/New-Homes/HoggsHollowTraditional-2.jpg';
import image4 from '../../../images/New-Homes/HoggsHollowTraditional-3.jpg';
import image5 from '../../../images/New-Homes/HoggsHollowTraditional-5.jpg';


const HoggsHollowTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        backgroundPosition: '100% 0%',
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 1.29)'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.68)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.54)'
      }} />
      <TextBlurb dataItem={{
        title: "Hogg's Hollow Traditional",
        text: "This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight."
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 0.6)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.6)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/kingsway-traditional" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/kingsway-georgian" />
    </section>
  </Layout>
)

export default HoggsHollowTraditional;
