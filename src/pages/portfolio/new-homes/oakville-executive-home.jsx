import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.oakvilleExecutiveHome;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  frontFacade: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347328/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/1-Front-Facade_rpftbr.jpg'
      }}
    />
  ),
  threeCarGarage: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347327/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/2-Three-car-Garage_wxoxdf.jpg'
      }}
    />
  ),
  frontEntry: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347331/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/3-Front-Entry_ryc4yl.jpg'
      }}
    />
  )
};

const OakvilleExecutiveHome = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={600}>
        <Column>
          {tiles.frontFacade}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={480}>
        <Column width="62%">
          {tiles.threeCarGarage}
        </Column>
        <Column width="38%">
          {tiles.frontEntry}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default OakvilleExecutiveHome;
