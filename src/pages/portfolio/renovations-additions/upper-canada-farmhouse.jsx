import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.upperCanadaFarmhouse;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  newAddition: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/1-1820_s-Farmhouse-_-New-Addition_qh1ha2.jpg'
      }}
    />
  ),
  sideEntrance: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347367/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/2-Side-Entrance_smshkr.jpg'
      }}
    />
  ),
  entranceHall: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347367/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/3c-Entrance-Hall_szk4bq.jpg'
      }}
    />
  ),
  countryKitchenDiningRoom: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/4-Country-Kitchen-Dining-Room_iqgnfl.jpg'
      }}
    />
  ),
  masterFireplace: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347370/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/6-Master-Fireplace_wjx75m.jpg'
      }}
    />
  ),
  ensuite: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347364/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/7-Ensuite_wb7epo.jpg'
      }}
    />
  ),
  vaultedMasterSuite: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347357/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/5-Vaulted-Master-Suite_gdt5k0.jpg'
      }}
    />
  )
};

const UpperCanadaFarmhouse = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={620}>
        <Column>
          {tiles.newAddition}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={810}>
        <Column width="62%">
          {tiles.sideEntrance}
        </Column>
        <Column width="38%">
          <Row height={485}>
            <Column>
              {tiles.entranceHall}
            </Column>
          </Row>
          <Row height={290}>
            <Column>
              {tiles.countryKitchenDiningRoom}
            </Column>
          </Row>
        </Column>
      </Row>
      <Row height={350}>
        <Column width="62%">
          {tiles.masterFireplace}
        </Column>
        <Column width="38%">
          {tiles.ensuite}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={600}>
        <Column width="60%">
          {tiles.newAddition}
        </Column>
        <Column width="40%">
          {tiles.entranceHall}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={550}>
        <Column width="40%">
          {tiles.sideEntrance}
        </Column>
        <Column width="60%">
          {tiles.countryKitchenDiningRoom}
        </Column>
      </Row>
      <Row height={350}>
        <Column width="35%">
          {tiles.masterFireplace}
        </Column>
        <Column width="40%">
          {tiles.vaultedMasterSuite}
        </Column>
        <Column width="25%">
          {tiles.ensuite}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default UpperCanadaFarmhouse;
