import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from '../../../components/prevNextProjectLink';

import image1 from '../../../images/Renovations-Additions/Rosedale-2.jpg';
import image2 from '../../../images/Renovations-Additions/Rosedale-1.jpg';
import image3 from '../../../images/Renovations-Additions/Rosedale-3.jpg';

const RosedaleRevival = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.3)'
      }} />
      <TextBlurb dataItem={{
        title: 'Rosedale Edwardian',
        text: 'The original façade of this 1917 home had been painted over, but careful power washing revealed handsome Toronto brick hidden beneath. With Heritage approval, the front was re-imagined with a bold Edwardian-style bay and copper dormers. '
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 0.75)',
        textOverlay: 'Before'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/upper-canada-farmhouse" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/etobicoke-arts-and-crafts" />
    </section>
  </Layout>
)

export default RosedaleRevival;
