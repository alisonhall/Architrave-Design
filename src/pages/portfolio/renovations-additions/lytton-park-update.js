import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from "../../../components/prevNextProjectLink";

import image1 from '../../../images/Renovations-Additions/Lytton-Park-2.jpg';
import image2 from '../../../images/Renovations-Additions/Lorne-Park-2.jpg';
import image3 from '../../../images/Renovations-Additions/Lorne-Park-4.jpg';
import image4 from '../../../images/Renovations-Additions/Lorne-Park-5.jpg';
import image5 from '../../../images/Renovations-Additions/Lorne-Park-3.jpg';

const LyttonParkUpdate = (props) => (
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
        title: 'Lytton Park Update',
        text: 'This lovely old home was full of charm and detail, but inside it was dark and lacked modern amenities. A new addition provided more space, while new windows and arches open the inside to light and views.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(54% - (1.5% * 2))',
        height: 'calc(500px * 0.7)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(46% - (1.5% * 2))',
        height: 'calc(500px * 1.4)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(54% - (1.5% * 2))',
        height: 'calc(500px * 0.62)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 0.9)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/etobicoke-renewal" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/princess-margaret-facelift" />
    </section>
  </Layout>
)

export default LyttonParkUpdate;
