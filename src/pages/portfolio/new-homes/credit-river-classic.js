import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

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
      <Item
        num={1}
        image={{
          image: image1
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '645px'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '340px'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '270px'
        }}
      />
      <Item
        text={{
          title: 'Credit River Classic',
          copy: 'The home owners sought a home suitable for both family living and entertaining on their riverside lot. Rich materials and the finest craftsmanship combine to create an atmosphere of casual elegance.'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={7}
        image={{
          image: image7
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={8}
        image={{
          image: image8
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '600px'
        }}
      />
      <Item
        num={9}
        image={{
          image: image9
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '675px'
        }}
      />
      <Item
        num={10}
        image={{
          image: image10
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '305px'
        }}
      />
      <Item
        num={11}
        image={{
          image: image11
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '332px'
        }}
      />
      <Item
        num={12}
        image={{
          image: image12
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '550px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default CreditRiverClassic;
