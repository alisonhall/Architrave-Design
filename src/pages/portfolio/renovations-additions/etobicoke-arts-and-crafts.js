import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from "../../../components/prevNextProjectLink";

import image1 from '../../../images/Renovations-Additions/Etobicoke-2.jpg';
import image2 from '../../../images/Renovations-Additions/Etobicoke-7.jpg';
import image3 from '../../../images/Renovations-Additions/Etobicoke-6.jpg';
import image4 from '../../../images/Renovations-Additions/Etobicoke-1.jpg';
import image5 from '../../../images/Renovations-Additions/Etobicoke-5.jpg';
import image6 from '../../../images/Renovations-Additions/Etobicoke-4.jpg';
import image7 from '../../../images/Renovations-Additions/Etobicoke-8.jpg';

const EtobicokeRenewal = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(62% - (1.5% * 2))',
        height: 'calc(500px * 0.96)'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(38% - (1.5% * 2))',
        height: 'calc(500px * 0.43)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(38% - (1.5% * 2))',
        height: 'calc(500px * 1.01)',
        float: 'right'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        textOverlay: 'Before',
        width: 'calc(31% - (1.5% * 2))',
        height: 'calc(500px * 0.48)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(31% - (1.5% * 2))',
        height: 'calc(500px * 0.48)'
      }} />
      <TextBlurb dataItem={{
        title: 'Etobicoke Arts and Crafts',
        text: 'This post-war bungalow had been marred with characterless additions, but the proportions were ideally suited for a make-over in period Arts-and-Crafts style. The interior was rebuilt with warm wood, custom cabinetry and plenty of glass. '
      }} />
      <ImageTile dataItem={{
        num: '6',
        image: image6,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 0.78)'
      }} />
      <ImageTile dataItem={{
        num: '7',
        image: image7,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.78)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/rosedale-edwardian" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/lytton-park-manor" />
    </section>
  </Layout>
)

export default EtobicokeRenewal;