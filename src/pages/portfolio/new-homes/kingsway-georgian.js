import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/KingswayGeorgian-1.jpg';
import image2 from '../../../images/New-Homes/KingswayGeorgian-2.jpg';
import image3 from '../../../images/New-Homes/KingswayGeorgian-6.jpg';
import image4 from '../../../images/New-Homes/KingswayGeorgian-4.jpg';
import image5 from '../../../images/New-Homes/KingswayGeorgian-8.jpg';
import image6 from '../../../images/New-Homes/KingswayGeorgian-5.jpg';
import image7 from '../../../images/New-Homes/KingswayGeorgian-9.jpg';
import image8 from '../../../images/New-Homes/KingswayGeorgian-10.jpg';
import image9 from '../../../images/New-Homes/KingswayGeorgian-11.jpg';
import image10 from '../../../images/New-Homes/KingswayGeorgian-7.jpg';
import image11 from '../../../images/New-Homes/KingswayGeorgian-12.jpg';
import image12 from '../../../images/New-Homes/KingswayGeorgian-13.jpg';

const project = constants.projects.kingswayGeorgian;

const KingswayGeorgian = (props) => (
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
          height: '750px'
        }}
      />
      <Item
        text={{
          title: 'Kingsway Georgian',
          copy: 'This classic 3-storey Georgian home was built with an attention to detail. Rich cut limestone on the exterior and a beautifully paneled interior make it a home perfect for elegant entertaining or casual family living.'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(35% - (1.5% * 2))',
          height: '400px'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(65% - (1.5% * 2))',
          height: '730px',
          float: 'right'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        styles={{
          width: 'calc(34% - (1.5% * 2))',
          height: '400px'
        }}
      />
      <Item
        styles={{
          width: 'calc(65% - (1.5% * 2))',
          height: '70px',
          float: 'right'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(58% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        styles={{
          width: 'calc(42% - (1.5% * 2))',
          height: '540px',
          float: 'right'
        }}
      />
      <Item
        num={7}
        image={{
          image: image7
        }}
        styles={{
          width: 'calc(58% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <Item
        num={8}
        image={{
          image: image8
        }}
        styles={{
          width: 'calc(42% - (1.5% * 2))',
          height: '540px',
          float: 'right'
        }}
      />
      <Item
        num={9}
        image={{
          image: image9
        }}
        styles={{
          width: 'calc(58% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <Item
        num={10}
        image={{
          image: image10
        }}
        styles={{
          width: 'calc(34% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <Item
        num={11}
        image={{
          image: image11
        }}
        styles={{
          width: 'calc(32% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <Item
        num={12}
        image={{
          image: image12
        }}
        styles={{
          width: 'calc(34% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayGeorgian;
