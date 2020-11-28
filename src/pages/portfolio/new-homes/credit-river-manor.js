import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import PrevNextProjectLink from "../../../components/prevNextProjectLink"

const CreditRiverClassic = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageLayout1Col1Row>
        <ImageTile dataItem={{
          num: '1',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347266/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg',
          width: 'calc(50% - (1.5% * 2))',
          height: '380px'
        }} />
        <ImageTile dataItem={{
          num: '2',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1606592704/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_2_dzqicp.jpg',
          width: 'calc(50% - (1.5% * 2))',
          height: '380px'
        }} />
        <TextBlurb dataItem={{
          title: 'Credit River Manor',
          text: 'Meticulous detail and the finest craftsmanship combine to make this spacious home a show-piece. Stonework by Gino Gentile is topped with a slate roof and imported copper details. Inside, a two-storey front foyer cascades down to a wood-beamed family room and a coffered kitchen.'
        }} />
        <ImageTile dataItem={{
          num: '3',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1606592703/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_4_jt4uq1.jpg',
          width: 'calc(50% - (1.5% * 2))',
          height: '380px'
        }} />
        <ImageTile dataItem={{
          num: '4',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/3-Two-Story-Front-Foyer_lkcpir.jpg',
          width: 'calc(25% - (1.5% * 2))',
          height: '380px'
        }} />
        <ImageTile dataItem={{
          num: '5',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg',
          width: 'calc(25% - (1.5% * 2))',
          height: '380px'
        }} />
        <ImageTile dataItem={{
          num: '6',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/2-Front-Foyer_y8wodd.jpg',
          width: 'calc(38% - (1.5% * 2))',
          height: '290px'
        }} />
        <ImageTile dataItem={{
          num: '7',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347190/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/7-Hallway-Arch_nsi6eb.jpg',
          width: 'calc(24% - (1.5% * 2))',
          height: '290px'
        }} />
        <ImageTile dataItem={{
          num: '8',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/5-Sitting-Room_dt8nwa.jpg',
          width: 'calc(38% - (1.5% * 2))',
          height: '290px'
        }} />
        <ImageTile dataItem={{
          num: '9',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347192/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/6-Dining-Room_n7r1av.jpg',
          width: 'calc(33.33% - (1.5% * 2))',
          height: '230px'
        }} />
        <ImageTile dataItem={{
          num: '10',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/9-Kitchen-_-Breakfast-Bay_k8qrcz.jpg',
          width: 'calc(33.33% - (1.5% * 2))',
          height: '230px'
        }} />
        <ImageTile dataItem={{
          num: '11',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/8-Family-Room-with-Custom-Mantel_vvgqso.jpg',
          width: 'calc(33.33% - (1.5% * 2))',
          height: '230px'
        }} />
        <ImageTile dataItem={{
          num: '12',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/11-Upper-Hall_yfoloe.jpg',
          width: 'calc(20% - (1.5% * 2))',
          height: '290px'
        }} />
        <ImageTile dataItem={{
          num: '12',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347210/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/12-Vaulted-Master_z9t3hj.jpg',
          width: 'calc(45% - (1.5% * 2))',
          height: '290px'
        }} />
        <ImageTile dataItem={{
          num: '12',
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_600,c_scale,f_auto,q_auto/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/13-Bedroom_nesbsz.jpg',
          width: 'calc(35% - (1.5% * 2))',
          height: '290px'
        }} />
      </ImageLayout1Col1Row>
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/new-homes/classic-centre-hall" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/new-homes/kingsway-transitional" />
    </section>
  </Layout>
)

export default CreditRiverClassic;
