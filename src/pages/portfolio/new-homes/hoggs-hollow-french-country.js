import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import PrevNextProjectLink from "../../../components/prevNextProjectLink"

import image1 from '../../../images/New-Homes/FrenchCountry-4.jpg';
import image2 from '../../../images/New-Homes/FrenchCountry-2.jpg';
import image3 from '../../../images/New-Homes/FrenchCountry-3.jpg';
import image4 from '../../../images/New-Homes/FrenchCountry-1.jpg';
import image5 from '../../../images/New-Homes/FrenchCountry-7.jpg';
import image6 from '../../../images/New-Homes/FrenchCountry-5.jpg';


const HoggsHollowFrenchCountry = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageLayout1Col1Row>
        <ImageTile dataItem={{
          num: '1',
          image: image1,
          width: 'calc(63% - (1.5% * 2))',
          height: 'calc(500px * 0.78)'
        }} />
        <ImageTile dataItem={{
          num: '2',
          image: image2,
          width: 'calc(37% - (1.5% * 2))',
          height: 'calc(500px * 0.78)'
        }} />
        <ImageTile dataItem={{
          num: '3',
          image: image3,
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 0.58)'
        }} />
        <ImageTile dataItem={{
          num: '4',
          image: image4,
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.58)'
        }} />
        <TextBlurb dataItem={{
          title: "Hogg's Hollow French Country",
          text: "This home captures Hogg's Hollow's dual nature - rustic but refined. The exterior is stone and reclaimed brick, with a richly panelled and classically proportioned interior."
        }} />
        <ImageTile dataItem={{
          num: '5',
          image: image5,
          width: 'calc(63% - (1.5% * 2))',
          height: 'calc(500px * 0.73)'
        }} />
        <ImageTile dataItem={{
          num: '6',
          image: image6,
          width: 'calc(37% - (1.5% * 2))',
          height: 'calc(500px * 0.73)'
        }} />
      </ImageLayout1Col1Row>
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/oakville-executive-home" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/kingsway-traditional" />
    </section>
  </Layout>
)

export default HoggsHollowFrenchCountry;
