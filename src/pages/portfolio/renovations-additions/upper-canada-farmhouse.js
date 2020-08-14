import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from "../../../components/prevNextProjectLink";

import image1 from '../../../images/Renovations-Additions/Cornwall-1.jpg';
import image2 from '../../../images/Renovations-Additions/Cornwall-2.jpg';
import image3 from '../../../images/Renovations-Additions/Cornwall-3.jpg';
import image4 from '../../../images/Renovations-Additions/Cornwall-4.jpg';
import image5 from '../../../images/Renovations-Additions/Cornwall-5.jpg';
import image6 from '../../../images/Renovations-Additions/Cornwall-6.jpg';

const CornwallHeritageAddition = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.24)'
      }} />
      <TextBlurb dataItem={{
        title: 'Upper Canada Farmhouse',
        text: 'An addition to this charming 1820’s Loyalist farmhouse respects the character of the old, while more than doubling the living space. A flagged centre hall joins old and new, and leads into a sunny country kitchen. Above it is an airy master bedroom with a vaulted ceiling, cozy sitting area, private balcony and sweeping views. '
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(62% - (1.5% * 2))',
        height: 'calc(500px * 1.62)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(38% - (1.5% * 2))',
        height: 'calc(500px * 0.97)'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(38% - (1.5% * 2))',
        height: 'calc(500px * 0.58)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(62% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '6',
        image: image6,
        width: 'calc(38% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/princess-margaret-modern" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/rosedale-edwardian" />
    </section>
  </Layout>
)

export default CornwallHeritageAddition;
