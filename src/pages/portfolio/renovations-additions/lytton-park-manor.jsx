import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/Renovations-Additions/Lytton-Park-2.jpg';
import image2 from '../../../images/Renovations-Additions/Lytton-Park-1.jpg';
import image3 from '../../../images/Renovations-Additions/Lytton-Park-4.jpg';
import image4 from '../../../images/Renovations-Additions/Lytton-Park-5.jpg';
import image5 from '../../../images/Renovations-Additions/Lytton-Park-3.jpg';

const project = constants.projects.lyttonParkUpdate;

const LyttonParkUpdate = (props) => (
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
          height: '600px'
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
          width: 'calc(54% - (1.5% * 2))',
          height: '350px'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(46% - (1.5% * 2))',
          height: '700px',
          float: 'right'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        styles={{
          width: 'calc(54% - (1.5% * 2))',
          height: '310px'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '450px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LyttonParkUpdate;