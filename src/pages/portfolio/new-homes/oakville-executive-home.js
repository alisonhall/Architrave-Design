import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from "../../../components/prevNextProjectLink";

import image1 from '../../../images/New-Homes/Oakville-1.jpg';
import image2 from '../../../images/New-Homes/Oakville-2.jpg';
import image3 from '../../../images/New-Homes/Oakville-3.jpg';

const OakvilleExecutiveHome = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.2)'
      }} />
      <TextBlurb dataItem={{
        title: 'Oakville Executive Home',
        text: 'Dormers and a low roofline play down the size of this large stone and brick home in Oakville.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(62% - (1.5% * 2))',
        height: 'calc(500px * 0.96)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(38% - (1.5% * 2))',
        height: 'calc(500px * 0.96)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/kingsway-transitional" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/hoggs-hollow-french-country" />
    </section>
  </Layout>
)

export default OakvilleExecutiveHome;
