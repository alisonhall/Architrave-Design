import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ImageLayout1Col1Row from '../../components/imageLayout1Col1Row';
import ImageLinkTile from '../../components/imageLinkTile';
import TextBlurb from '../../components/textBlurb';

import image1 from '../../images/Renovations-Additions/Lytton-Park-4.jpg';
import image2 from '../../images/Renovations-Additions/Etobicoke-2.jpg';
import image3 from '../../images/Renovations-Additions/Cornwall-1.jpg';
import image4 from '../../images/Renovations-Additions/Rosedale-2.jpg';
import image5 from '../../images/Renovations-Additions/Lorne-Park-4.jpg';


const RenovationsAdditions = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section class="contentWrapper layoutAll layoutRenovations">
      <ImageLayout1Col1Row>
        <ImageLinkTile dataItem={{
          num: '1',
          linkUrl: '/portfolio/renovations-additions/lytton-park-update',
          text: "Lytton Park",
          image: image1,
          backgroundPosition: '50% 40%',
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 1.29)'
        }} />
        <ImageLinkTile dataItem={{
          num: '2',
          linkUrl: '/portfolio/renovations-additions/etobicoke-renewal',
          text: "Etobicoke Restyling",
          image: image2,
          backgroundPosition: '50% 40%',
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.69)'
        }} />
        <ImageLinkTile dataItem={{
          num: '3',
          linkUrl: '/portfolio/renovations-additions/cornwall-heritage-addition',
          text: "Loyalist Addition",
          image: image3,
          backgroundPosition: '50% 40%',
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.53)'
        }} />
        <TextBlurb dataItem={{
          text: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
        }} />
        <ImageLinkTile dataItem={{
          num: '4',
          linkUrl: '/portfolio/renovations-additions/rosedale-revival',
          text: "Rosedale Revival",
          image: image4,
          backgroundPosition: '50% 40%',
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
        <ImageLinkTile dataItem={{
          num: '5',
          linkUrl: '/portfolio/renovations-additions/lorne-park-interior',
          text: "Lorne Park Interior",
          image: image5,
          backgroundPosition: '50% 40%',
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
      </ImageLayout1Col1Row>
    </section>
  </Layout>
)

export default RenovationsAdditions
