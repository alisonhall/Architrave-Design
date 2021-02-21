import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from '../../../components/prevNextProjectLink';

const PrincessMargaretFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/2-Addition-_-_Re-facing_xddgjt.jpg',
        width: 'calc(66% - (1.5% * 2))',
        height: 'calc(500px * 0.9)',
        backgroundPosition: '50% 30%'
      }} />
      <ImageTile dataItem={{
        num: '2',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347397/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/1-Original-1970-Sidesplit_vrexby.jpg',
        width: 'calc(33% - (1.5% * 2))',
        height: '213px',
        textOverlay: 'Before'
      }} />
      <ImageTile dataItem={{
        num: '3',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347402/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/3-New-Second-Floor_sxdhhx.jpg',
        width: 'calc(33% - (1.5% * 2))',
        height: '213px'
      }} />
      <TextBlurb dataItem={{
        title: 'Princess Margaret Modern',
        text: 'This sixties era side-split needed a complete update inside and out. The main level was opened up, and a second floor master suite added. Stone and contemporary wood cladding combine to give the exterior a new modern look.'
      }} />
      <ImageTile dataItem={{
        num: '4',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1602535094/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/4_hxynkz.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1602535095/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/6_g3yq1e.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <ImageTile dataItem={{
        num: '6',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1602535092/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/8_rzkvl5.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <ImageTile dataItem={{
        num: '7',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1602535092/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/9_o4ahxq.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/lytton-park-manor" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/upper-canada-farmhouse" />
    </section>
  </Layout>
)

export default PrincessMargaretFacelift;
