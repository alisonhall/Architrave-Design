import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ImageLayout1Col1Row from '../../components/imageLayout1Col1Row';
import ImageLinkTile from "../../components/imageLinkTile";
import ImageFillerTile from '../../components/imageFillerTile';
import TextBlurb from '../../components/textBlurb';

import image1 from '../../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../../images/New-Homes/KingswayGeorgian-1.jpg';
import image3 from '../../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../../images/New-Homes/CreditRiver-1.jpg';
import image5 from '../../images/New-Homes/KingswayTransitional-1.jpg';
import image6 from '../../images/New-Homes/Oakville-1.jpg';
import image7 from '../../images/New-Homes/FrenchCountry-4.jpg';
import image8 from '../../images/New-Homes/KingswayTraditional-1.jpg';


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomes">
      <ImageLayout1Col1Row>
        <ImageLinkTile dataItem={{
          num: '1',
          linkUrl: '/portfolio/new-homes/hoggs-hollow-traditional',
          text: "Hogg's Hollow Traditional",
          image: image1,
          backgroundPosition: '100% 0%',
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 1.405)'
        }} />
        <ImageLinkTile dataItem={{
          num: '2',
          linkUrl: '/portfolio/new-homes/kingsway-georgian',
          text: "Kingsway Georgian",
          image: image2,
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.74058)'
        }} />
        <ImageFillerTile dataItem={{
          num: '3',
          image: image3,
          width: 'calc(21% - (1.5% * 2))',
          height: 'calc(500px * 0.598266)'
        }} />
        <ImageLinkTile dataItem={{
          num: '4',
          linkUrl: '/portfolio/new-homes/credit-river-classic',
          text: "Credit River",
          image: image4,
          width: 'calc(31% - (1.5% * 2))',
          height: 'calc(500px * 0.598266)'
        }} />
        <TextBlurb dataItem={{
          text: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
        }}/>
        <ImageLinkTile dataItem={{
          num: '5',
          linkUrl: '/portfolio/new-homes/kingsway-transitional',
          text: "Kingsway Transitional",
          image: image5,
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
        <ImageLinkTile dataItem={{
          num: '6',
          linkUrl: '/portfolio/new-homes/oakville-executive-home',
          text: "Oakville Executive",
          image: image6,
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
        <ImageLinkTile dataItem={{
          num: '7',
          linkUrl: '/portfolio/new-homes/classic-centre-hall',
          text: "Classic Centre Hall",
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_300,c_scale,f_auto,q_auto/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg',
          width: 'calc(33.3% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
        <ImageLinkTile dataItem={{
          num: '8',
          linkUrl: '/portfolio/new-homes/hoggs-hollow-french-country',
          text: "Hogg's Hollow French Country",
          image: image7,
          width: 'calc(33.3% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
        <ImageLinkTile dataItem={{
          num: '9',
          linkUrl: '/portfolio/new-homes/kingsway-traditional',
          text: "Kingsway Traditional",
          image: image8,
          backgroundPosition: '30% 40%',
          width: 'calc(33.3% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }} />
      </ImageLayout1Col1Row>
    </section>
  </Layout>
)

export default NewHomes
