import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import Seo from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.lyttonParkManor;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  newRearAddition: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347342/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/2-New-Rear-Addition_lsnrso.jpg'
      }}
    />
  ),
  sandstoneAndBrickFront: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347346/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/1-Sandstone-and-Brick-Front_ftxidf.jpg'
      }}
    />
  ),
  newEatInKitchen: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/5-New-Eat-in-Kitchen_oho9g6.jpg'
      }}
    />
  ),
  newLandingStairsToMasterSuite: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347340/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/4-New-Landing-_-Stairs-to-Master-Suite_jydo7j.jpg'
      }}
    />
  ),
  frontHallway: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/3-Front-Hallway_tasjdc.jpg'
      }}
    />
  )
};

const LyttonParkManor = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <Seo />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={600}>
        <Column>
          {tiles.sandstoneAndBrickFront}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={350 + 310}>
        <Column width="46%">
          <Row height={350}>
            <Column>
              {tiles.newRearAddition}
            </Column>
          </Row>
          <Row height={310}>
            <Column>
              {tiles.newEatInKitchen}
            </Column>
          </Row>
        </Column>
        <Column width="54%">
          {tiles.newLandingStairsToMasterSuite}
        </Column>
      </Row>
      <Row height={450}>
        <Column>
          {tiles.frontHallway}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={400}>
        <Column width="40%">
          {tiles.sandstoneAndBrickFront}
        </Column>
        <Column width="20%">
          {tiles.newLandingStairsToMasterSuite}
        </Column>
        <Column width="40%">
          {tiles.newRearAddition}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={450}>
        <Column width="45%">
          {tiles.newEatInKitchen}
        </Column>
        <Column width="55%">
          {tiles.frontHallway}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LyttonParkManor;
