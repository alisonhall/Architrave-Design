import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/KingswayTraditional-1.jpg';
import image2 from '../../../images/New-Homes/KingswayTraditional-2.jpg';
import image3 from '../../../images/New-Homes/KingswayTraditional-3.jpg';
import image4 from '../../../images/New-Homes/KingswayTraditional-4.jpg';
import image5 from '../../../images/New-Homes/KingswayTraditional-6.jpg';
import image6 from '../../../images/New-Homes/KingswayTraditional-5.jpg';

const project = constants.projects.kingswayTraditional;

const KingswayTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Item
        num={1}
        image={{
          image: image1
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '630px'
        }}
      />
      <Item
        text={{
          title: 'Kingsway Traditional',
          copy: 'Set in the heart of The Kingsway, this new family home evokes the character and flavour of the neighbourhood. Local stone and brick outside conceal a double-height foyer, panelled formal rooms and a casual great-room.'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(34% - (1.5% * 2))',
          height: '425px'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(66% - (1.5% * 2))',
          height: '425px'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '525px'
        }}
      />
      <Item
        styles={{
          width: 'calc(47% - (1.5% * 2))',
          height: '40px',
          float: 'left'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(53% - (1.5% * 2))',
          height: '270px',
          float: 'right'
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        styles={{
          width: 'calc(47% - (1.5% * 2))',
          height: '200px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayTraditional;
