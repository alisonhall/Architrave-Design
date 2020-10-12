import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/Renovations-Additions/Lorne-Park-2.jpg';
import image2 from '../../../images/Renovations-Additions/Lorne-Park-4.jpg';
import image3 from '../../../images/Renovations-Additions/Lorne-Park-1.jpg';
import image4 from '../../../images/Renovations-Additions/Lorne-Park-5.jpg';
import image5 from '../../../images/Renovations-Additions/Lorne-Park-6.jpg';

const project = constants.projects.lorneParkInterior;

const LorneParkInterior = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Item
        num={1}
        image={{
          image: image1
        }}
        styles={{
          width: 'calc(23% - (1.5% * 2))',
          height: '225px'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(77% - (1.5% * 2))',
          height: '480px',
          float: 'right'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(23% - (1.5% * 2))',
          height: '225px'
        }}
      />
      <Item
        text={{
          title: project.projectName,
          copy: project.projectDescription
        }}
      />
      <Item
        num={4}
        image={{
          image: image4,
          backgroundPosition: '50% 30%'
        }}
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '260px',
        }}
      />
      <Item
        num={5}
        image={{
          image: image5,
          backgroundPosition: '50% 30%'
        }}
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '260px',
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LorneParkInterior;
