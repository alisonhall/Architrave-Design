import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from '../../../components/prevNextProjectLink';

import image1 from '../../../images/New-Homes/KingswayTraditional-1.jpg';
import image2 from '../../../images/New-Homes/KingswayTraditional-2.jpg';
import image3 from '../../../images/New-Homes/KingswayTraditional-3.jpg';
import image4 from '../../../images/New-Homes/KingswayTraditional-4.jpg';
import image5 from '../../../images/New-Homes/KingswayTraditional-6.jpg';
import image6 from '../../../images/New-Homes/KingswayTraditional-5.jpg';

const KingswayTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.26)'
      }} />
      <TextBlurb dataItem={{
        title: 'Traditional Kingsway Park',
        text: 'Set in the heart of Kingsway Park, this home uses traditional proportions and materials to evoke the character of its established neighbourhood.  Inside, a light and contemporary palette of materials makes for relaxed and casual family living.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(34% - (1.5% * 2))',
        height: 'calc(500px * 0.85)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(66% - (1.5% * 2))',
        height: 'calc(500px * 0.85)'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.05)'
      }} />
      <TextBlurbFiller dataItem={{
        width: 'calc(47% - (1.5% * 2))',
        height: '40px',
        float: 'left'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(53% - (1.5% * 2))',
        height: 'calc(500px * 0.54)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '6',
        image: image6,
        width: 'calc(47% - (1.5% * 2))',
        height: 'calc(500px * 0.4)',
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/hoggs-hollow-french-country" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/hoggs-hollow-traditional" />
    </section>
  </Layout>
)

export default KingswayTraditional;
