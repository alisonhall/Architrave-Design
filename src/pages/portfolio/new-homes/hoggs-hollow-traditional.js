import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../../../images/New-Homes/HoggsHollowTraditional-1.jpg';
import image3 from '../../../images/New-Homes/HoggsHollowTraditional-2.jpg';
import image4 from '../../../images/New-Homes/HoggsHollowTraditional-3.jpg';
import image5 from '../../../images/New-Homes/HoggsHollowTraditional-5.jpg';

const project = constants.projects.hoggsHollowTraditional;

const HoggsHollowTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Item
        num={1}
        image={{
          image: image1,
          backgroundPosition: '100% 0%'
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
          title: "Hogg's Hollow Traditional",
          copy: "This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight."
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
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default HoggsHollowTraditional;
