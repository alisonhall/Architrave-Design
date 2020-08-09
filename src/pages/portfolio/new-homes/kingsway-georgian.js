import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import PrevNextProjectLink from "../../../components/prevNextProjectLink"
import TextBlurbFiller from '../../../components/textBlurbFiller';

import image1 from '../../../images/New-Homes/KingswayGeorgian-1.jpg';
import image2 from '../../../images/New-Homes/KingswayGeorgian-2.jpg';
import image3 from '../../../images/New-Homes/KingswayGeorgian-6.jpg';
import image4 from '../../../images/New-Homes/KingswayGeorgian-4.jpg';
import image5 from '../../../images/New-Homes/KingswayGeorgian-8.jpg';
import image6 from '../../../images/New-Homes/KingswayGeorgian-5.jpg';
import image7 from '../../../images/New-Homes/KingswayGeorgian-9.jpg';
import image8 from '../../../images/New-Homes/KingswayGeorgian-10.jpg';
import image9 from '../../../images/New-Homes/KingswayGeorgian-11.jpg';
import image10 from '../../../images/New-Homes/KingswayGeorgian-7.jpg';
import image11 from '../../../images/New-Homes/KingswayGeorgian-12.jpg';
import image12 from '../../../images/New-Homes/KingswayGeorgian-13.jpg';


const KingswayGeorgian = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.5)'
      }} />
      <TextBlurb dataItem={{
        title: 'Kingsway Georgian',
        text: 'This classic 3-storey Georgian home was built with an attention to detail. Rich cut limestone on the exterior and a beautifully paneled interior make it a home perfect for elegant entertaining or casual family living.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(35% - (1.5% * 2))',
        height: 'calc(500px * 0.8)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(65% - (1.5% * 2))',
        height: 'calc(500px * 1.46)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(34% - (1.5% * 2))',
        height: 'calc(500px * 0.8)'
      }} />
      <TextBlurbFiller dataItem={{
        width: 'calc(65% - (1.5% * 2))',
        height: '70px',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(58% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '6',
        image: image6,
        width: 'calc(42% - (1.5% * 2))',
        height: 'calc(500px * 1.08)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '7',
        image: image7,
        width: 'calc(58% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '8',
        image: image8,
        width: 'calc(42% - (1.5% * 2))',
        height: 'calc(500px * 1.08)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '9',
        image: image9,
        width: 'calc(58% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '10',
        image: image10,
        width: 'calc(34% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '11',
        image: image11,
        width: 'calc(32% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '12',
        image: image12,
        width: 'calc(34% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/hoggs-hollow-traditional" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/classic-centre-hall" />
    </section>
  </Layout>
)

export default KingswayGeorgian;
