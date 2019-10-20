import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from "../../../components/prevNextProjectLink";

import image1 from '../../../images/Renovations-Additions/Lorne-Park-2.jpg';
import image2 from '../../../images/Renovations-Additions/Lorne-Park-4.jpg';
import image3 from '../../../images/Renovations-Additions/Lorne-Park-1.jpg';
import image4 from '../../../images/Renovations-Additions/Lorne-Park-5.jpg';
import image5 from '../../../images/Renovations-Additions/Lorne-Park-6.jpg';

const LorneParkInterior = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio lorneParkInterior">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovationsLorneParkInterior">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(23% - (1.5% * 2))',
        height: 'calc(500px * 0.45)'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(77% - (1.5% * 2))',
        height: 'calc(500px * 0.96)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(23% - (1.5% * 2))',
        height: 'calc(500px * 0.45)'
      }} />
      <TextBlurb dataItem={{
        title: 'Lorne Park Interior',
        text: 'Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch.'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.52)',
        backgroundPosition: '50% 30%'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.52)',
        backgroundPosition: '50% 30%'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/rosedale-revival" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/lytton-park-update" />
    </section>
  </Layout>
)

export default LorneParkInterior;
