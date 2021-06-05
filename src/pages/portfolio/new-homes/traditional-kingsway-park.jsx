import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.traditionalKingswayPark;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  traditionalStoneFront: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347271/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/1-Traditional-Stone-Front_mk1zvn.jpg'
      }}
    />
  ),
  frontFoyer: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347268/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/2-Front-Foyer_uc6wxy.jpg'
      }}
    />
  ),
  diningRoom: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347269/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/3-Dining-Room_hegcnz.jpg'
      }}
    />
  ),
  familyRoomBuiltins: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347269/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/4-Family-Room-Builtins_duyso3.jpg'
      }}
    />
  ),
  familyRoomKitchen: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347270/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/5-Family-_Room-_-Kitchen_nqonjc.jpg'
      }}
    />
  ),
  masterEnsuite: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347270/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/7-Master-Ensuite_g5n9vl.jpg'
      }}
    />
  ),
  kitchenIsland: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347268/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/6-Kitchen-Island_htgx13.jpg'
      }}
    />
  )
};

const TraditionalKingswayPark = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={630}>
        <Column>
          {tiles.traditionalStoneFront}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={425}>
        <Column width="34%">
          {tiles.frontFoyer}
        </Column>
        <Column width="66%">
          {tiles.diningRoom}
        </Column>
      </Row>
      <Row height={525}>
        <Column>
          {tiles.familyRoomBuiltins}
        </Column>
      </Row>
      <Row height={270}>
        <Column width="47%">
          <Row>
            <Column>
              <Item />
            </Column>
          </Row>
          <Row height={200}>
            <Column>
              {tiles.familyRoomKitchen}
            </Column>
          </Row>
        </Column>
        <Column width="53%">
          {tiles.masterEnsuite}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={400}>
        <Column width="44%">
          {tiles.traditionalStoneFront}
        </Column>
        <Column width="20%">
          {tiles.frontFoyer}
        </Column>
        <Column width="36%">
          {tiles.diningRoom}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={325}>
        <Column width="38%">
          {tiles.familyRoomBuiltins}
        </Column>
        <Column width="24%">
          {tiles.kitchenIsland}
        </Column>
        <Column width="38%">
          {tiles.familyRoomKitchen}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default TraditionalKingswayPark;
