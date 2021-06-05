import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.princessMargaretModern;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  additionRefacing: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/2-Addition-_-_Re-facing_xddgjt.jpg',
        backgroundPosition: '50% 30%'
      }}
    />
  ),
  before: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/1-Original-1970-Sidesplit_vrexby.jpg'
      }}
      text={{
        copy: 'Before'
      }}
    />
  ),
  newSecondFloor: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/3-New-Second-Floor_sxdhhx.jpg'
      }}
    />
  ),
  4: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/4_hxynkz.jpg'
      }}
    />
  ),
  6: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/6_g3yq1e.jpg'
      }}
    />
  ),
  8: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/8_rzkvl5.jpg'
      }}
    />
  ),
  9: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/9_o4ahxq.jpg'
      }}
    />
  )
};

const PrincessMargaretModern = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={450}>
        <Column width="66%">
          {tiles.additionRefacing}
        </Column>
        <Column width="33%">
          {tiles.before}
          {tiles.newSecondFloor}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={375}>
        <Column width="50%">
          {tiles['4']}
        </Column>
        <Column width="50%">
          {tiles['6']}
        </Column>
      </Row>
      <Row height={375}>
        <Column width="50%">
          {tiles['8']}
        </Column>
        <Column width="50%">
          {tiles['9']}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default PrincessMargaretModern;
