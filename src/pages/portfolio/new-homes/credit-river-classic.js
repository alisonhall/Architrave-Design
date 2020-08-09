import React from 'react';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';
import constants from '../../../../public/app-constants';

import image1 from '../../../images/New-Homes/CreditRiver-3.jpg';
import image2 from '../../../images/New-Homes/CreditRiver-1b.jpg';
import image3 from '../../../images/New-Homes/CreditRiver-10.jpg';
import image4 from '../../../images/New-Homes/CreditRiver-4.jpg';
import image5 from '../../../images/New-Homes/CreditRiver-5.jpg';
import image6 from '../../../images/New-Homes/CreditRiver-7.jpg';
import image7 from '../../../images/New-Homes/CreditRiver-6.jpg';
import image8 from '../../../images/New-Homes/CreditRiver-8.jpg';
import image9 from '../../../images/New-Homes/CreditRiver-9.jpg';
import image10 from '../../../images/New-Homes/CreditRiver-12.jpg';
import image11 from '../../../images/New-Homes/CreditRiver-11.jpg';
import image12 from '../../../images/New-Homes/CreditRiver-13.jpg';

const project = constants.projects.creditRiverClassic;

const CreditRiverClassic = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 1.29)'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.68)'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.54)'
      }} />
      <TextBlurb dataItem={{
        title: 'Credit River Classic',
        text: 'The home owners sought a home suitable for both family living and entertaining on their riverside lot. Rich materials and the finest craftsmanship combine to create an atmosphere of casual elegance.'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 0.6)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        image: image5,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.6)'
      }} />
      <ImageTile dataItem={{
        num: '6',
        image: image6,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 0.6)'
      }} />
      <ImageTile dataItem={{
        num: '7',
        image: image7,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.6)'
      }} />
      <ImageTile dataItem={{
        num: '8',
        image: image8,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.2)'
      }} />
      <ImageTile dataItem={{
        num: '9',
        image: image9,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 1.35)'
      }} />
      <ImageTile dataItem={{
        num: '10',
        image: image10,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.61)'
      }} />
      <ImageTile dataItem={{
        num: '11',
        image: image11,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.664)'
      }} />
      <ImageTile dataItem={{
        num: '12',
        image: image12,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.1)'
      }} />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default CreditRiverClassic;
