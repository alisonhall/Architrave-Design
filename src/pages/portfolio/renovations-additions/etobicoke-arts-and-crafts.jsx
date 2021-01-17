import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/Renovations-Additions/Etobicoke-2.jpg';
import image2 from '../../../images/Renovations-Additions/Etobicoke-7.jpg';
import image3 from '../../../images/Renovations-Additions/Etobicoke-6.jpg';
import image4 from '../../../images/Renovations-Additions/Etobicoke-1.jpg';
import image5 from '../../../images/Renovations-Additions/Etobicoke-5.jpg';
import image6 from '../../../images/Renovations-Additions/Etobicoke-4.jpg';
import image7 from '../../../images/Renovations-Additions/Etobicoke-8.jpg';

const project = constants.projects.etobicokeRenewal;

const EtobicokeRenewal = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Item
        num={1}
        image={{
          image: image1
        }}
        styles={{
          width: 'calc(62% - (1.5% * 2))',
          height: '480px'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(38% - (1.5% * 2))',
          height: '215px',
          float: 'right'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(38% - (1.5% * 2))',
          height: '505px',
          float: 'right'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        text={{
          copy: 'Before'
        }}
        styles={{
          width: 'calc(31% - (1.5% * 2))',
          height: '240px'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(31% - (1.5% * 2))',
          height: '240px'
        }}
      />
      <Item
        text={{
          title: project.projectName,
          copy: project.projectDescription
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '390px'
        }}
      />
      <Item
        num={7}
        image={{
          image: image7
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '390px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default EtobicokeRenewal;