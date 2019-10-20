import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from "../../../components/prevNextProjectLink";

import image1 from '../../../images/New-Homes/KingswayTransitional-1.jpg';
import image2 from '../../../images/New-Homes/KingswayTransitional-2.jpg';
import image3 from '../../../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../../../images/New-Homes/KingswayTransitional-3.jpg';
import image5 from '../../../images/New-Homes/KingswayTransitional-5.jpg';
import image6 from '../../../images/New-Homes/KingswayTransitional-4.jpg';
import image7 from '../../../images/New-Homes/KingswayTransitional-7.jpg';
import image8 from '../../../images/New-Homes/KingswayTransitional-8.jpg';

const KingswayTransitional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio kingswayTransitional">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomesKingswayTransitional">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.26)'
      }} />
      <TextBlurb dataItem={{
        title: 'Kingsway Transitional',
        text: 'The clients sought a street face that would fit with an established traditional neighbourhood. Contrasting that, the interior uses glass, steel and rich woods to create a light-filled contemporary feel.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(42% - (1.5% * 2))',
        height: 'calc(500px * 0.58)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(29% - (1.5% * 2))',
        height: 'calc(500px * 0.58)'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(29% - (1.5% * 2))',
        height: 'calc(500px * 0.58)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.68)'
      }} />
      <ImageTile dataItem={{
        num: '6',
        image: image6,
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.52)'
      }} />
      <TextBlurbFiller dataItem={{
        width: 'calc(50% - (1.5% * 2))',
        height: '40px',
        float: 'left'
      }} />
      <ImageTile dataItem={{
        num: '7',
        image: image7,
        width: 'calc(58% - (1.5% * 2))',
        height: 'calc(500px * 0.68)'
      }} />
      <ImageTile dataItem={{
        num: '8',
        image: image8,
        width: 'calc(42% - (1.5% * 2))',
        height: 'calc(500px * 0.68)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/credit-river-classic" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/oakville-executive-home" />
    </section>
  </Layout>
)

export default KingswayTransitional;
