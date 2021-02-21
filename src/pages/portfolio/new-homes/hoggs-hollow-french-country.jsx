import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/FrenchCountry-4.jpg';
import image2 from '../../../images/New-Homes/FrenchCountry-2.jpg';
import image3 from '../../../images/New-Homes/FrenchCountry-3.jpg';
import image4 from '../../../images/New-Homes/FrenchCountry-1.jpg';
import image5 from '../../../images/New-Homes/FrenchCountry-7.jpg';
import image6 from '../../../images/New-Homes/FrenchCountry-5.jpg';

const project = constants.projects.hoggsHollowFrenchCountry;

const HoggsHollowFrenchCountry = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="390px">
        <Column width="63%">
          <Item
            num={1}
            image={{
              image: image1
            }}
            styles={{
              width: 'calc(63% - (1.5% * 2))',
              height: '390px'
            }}
          />
        </Column>
        <Column width="37%">
          <Item
            num={2}
            image={{
              image: image2
            }}
            styles={{
              width: 'calc(37% - (1.5% * 2))',
              height: '390px'
            }}
          />
        </Column>
      </Row>
      <Row height="290px">
        <Column width="48%">
          <Item
            num={3}
            image={{
              image: image3
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '290px'
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={4}
            image={{
              image: image4
            }}
            styles={{
              width: 'calc(52% - (1.5% * 2))',
              height: '290px'
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Item
            text={{
              title: project.projectName,
              copy: project.projectDescription
            }}
          />
        </Column>
      </Row>
      <Row height="365px">
        <Column width="63%">
          <Item
            num={5}
            image={{
              image: image5
            }}
            styles={{
              width: 'calc(63% - (1.5% * 2))',
              height: '365px'
            }}
          />
        </Column>
        <Column width="37%">
          <Item
            num={6}
            image={{
              image: image6
            }}
            styles={{
              width: 'calc(37% - (1.5% * 2))',
              height: '365px'
            }}
          />
        </Column>
      </Row>
      
      
      
      
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default HoggsHollowFrenchCountry;
