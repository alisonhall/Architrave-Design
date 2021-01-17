import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/KingswayTransitional-1.jpg';
import image2 from '../../../images/New-Homes/KingswayTransitional-2.jpg';
import image3 from '../../../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../../../images/New-Homes/KingswayTransitional-3.jpg';
import image5 from '../../../images/New-Homes/KingswayTransitional-5.jpg';
import image6 from '../../../images/New-Homes/KingswayTransitional-4.jpg';
import image7 from '../../../images/New-Homes/KingswayTransitional-7.jpg';
import image8 from '../../../images/New-Homes/KingswayTransitional-8.jpg';

const project = constants.projects.kingswayTransitional;

const KingswayTransitional = (props) => (
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
          title: project.projectName,
          copy: project.projectDescription
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(42% - (1.5% * 2))',
          height: '290px'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(29% - (1.5% * 2))',
          height: '290px'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        styles={{
          width: 'calc(29% - (1.5% * 2))',
          height: '290px'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '340px'
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '260px'
        }}
      />
      <Item
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '40px',
          float: 'left'
        }}
      />
      <Item
        num={7}
        image={{
          image: image7
        }}
        styles={{
          width: 'calc(58% - (1.5% * 2))',
          height: '340px'
        }}
      />
      <Item
        num={8}
        image={{
          image: image8
        }}
        styles={{
          width: 'calc(42% - (1.5% * 2))',
          height: '340px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayTransitional;