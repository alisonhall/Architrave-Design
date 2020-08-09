import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/Oakville-1.jpg';
import image2 from '../../../images/New-Homes/Oakville-2.jpg';
import image3 from '../../../images/New-Homes/Oakville-3.jpg';

const project = constants.projects.oakvilleExecutiveHome;

const OakvilleExecutiveHome = (props) => (
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
          height: 'calc(500px * 1.2)'
        }}
      />
      <Item
        text={{
          title: 'Oakville Executive Home',
          copy: 'Dormers and a low roofline play down the size of this large stone and brick home in Oakville.'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(62% - (1.5% * 2))',
          height: 'calc(500px * 0.96)'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(38% - (1.5% * 2))',
          height: 'calc(500px * 0.96)'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default OakvilleExecutiveHome;
