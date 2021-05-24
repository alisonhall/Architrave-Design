import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.lorneParkInterior;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  2: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-2_whsiom.jpg'
      }}
    />
  ),
  1: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-1_zlu8rc.jpg'
      }}
    />
  ),
  4: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-4_usn7jd.jpg'
      }}
    />
  ),
  5: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-5_l7ardg.jpg',
        backgroundPosition: '50% 30%'
      }}
    />
  ),
  6: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-6_kwdbb0.jpg',
        backgroundPosition: '50% 30%'
      }}
    />
  )
};

const LorneParkInterior = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={225 + 225}>
        <Column width="23%">
          <Row height={225}>
            <Column>
              {tiles['2']}
            </Column>
          </Row>
          <Row height={225}>
            <Column>
              {tiles['1']}
            </Column>
          </Row>
        </Column>
        <Column width="77%">
          {tiles['4']}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={260}>
        <Column>
          {tiles['5']}
        </Column>
        <Column>
          {tiles['6']}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LorneParkInterior;
