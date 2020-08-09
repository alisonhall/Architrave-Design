import React from 'react';

import constants from '../../../../public/app-constants';
import image1 from '../../../images/Renovations-Additions/Cornwall-1.jpg';
import image2 from '../../../images/Renovations-Additions/Cornwall-2.jpg';
import image3 from '../../../images/Renovations-Additions/Cornwall-3.jpg';
import image4 from '../../../images/Renovations-Additions/Cornwall-4.jpg';
import image5 from '../../../images/Renovations-Additions/Cornwall-5.jpg';
import image6 from '../../../images/Renovations-Additions/Cornwall-6.jpg';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';;

const project = constants.projects.cornwallHeritageAddition;

const CornwallHeritageAddition = (props) => (
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
          height: 'calc(500px * 1.24)'
        }}
      />
      <Item
        text={{
          title: 'Loyalist Farmhouse Addition',
          copy: 'A modern addition to this charming 1820’s home mirrors it’s proportions but more than doubles the living space. The ground floor is a country kitchen, topped by a vaulted master with sweeping views.'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        styles={{
          width: 'calc(62% - (1.5% * 2))',
          height: 'calc(500px * 1.62)'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(38% - (1.5% * 2))',
          height: 'calc(500px * 0.97)'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        styles={{
          width: 'calc(38% - (1.5% * 2))',
          height: 'calc(500px * 0.58)'
        }}
      />
      <Item
        num={5}
        image={{
          image: image5
        }}
        styles={{
          width: 'calc(62% - (1.5% * 2))',
          height: 'calc(500px * 0.7)'
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        styles={{
          width: 'calc(38% - (1.5% * 2))',
          height: 'calc(500px * 0.7)'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default CornwallHeritageAddition;
