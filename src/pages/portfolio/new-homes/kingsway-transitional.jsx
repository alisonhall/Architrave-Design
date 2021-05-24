import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.kingswayTransitional;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  traditionalFrontFacade: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347231/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/1-Traditional-Front-Facade_xapffn.jpg'
      }}
    />
  ),
  modernRear: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347233/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/2-Modern-Rear_juviao.jpg'
      }}
    />
  ),
  banquetteSeating: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347224/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/6-Banquette-seating_oe01cy.jpg'
      }}
    />
  ),
  centralStair: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347216/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/3-Central-Stair_svysch.jpg'
      }}
    />
  ),
  familyRoomKitchen: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347230/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/5._Family-Room-_-Kitchen_ydyxys.jpg'
      }}
    />
  ),
  familyRoom: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347222/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/4-Family-Room_kacy5b.jpg',
      }}
    />
  ),
  vaultedMaster: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347223/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/7-Vaulted-Master_shswjo.jpg'
      }}
    />
  ),
  marbleEnsuite: (
    <Item
      num={8}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347229/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/8-Marble-Ensuite_ev33ah.jpg'
      }}
    />
  )
};

const KingswayTransitional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={630}>
        <Column>
          {tiles.traditionalFrontFacade}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={290}>
        <Column width="42%">
          {tiles.modernRear}
        </Column>
        <Column width="29%">
          {tiles.banquetteSeating}
        </Column>
        <Column width="29%">
          {tiles.centralStair}
        </Column>
      </Row>
      <Row height={340}>
        <Column>
          {tiles.familyRoomKitchen}
        </Column>
        <Column>
          <Row height={260}>
            <Column>
              {tiles.familyRoom}
            </Column>  
          </Row>
          <Row>
            <Column>
              <Item />
            </Column>  
          </Row>
        </Column>
      </Row>
      <Row height={340}>
        <Column width="58%">
          {tiles.vaultedMaster}
        </Column>
        <Column width="42%">
          {tiles.marbleEnsuite}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={450}>
        <Column>
          {tiles.traditionalFrontFacade}
        </Column>
        <Column>
          {tiles.modernRear}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={325}>
        <Column width="40%">
          {tiles.familyRoom}
        </Column>
        <Column width="40%">
          {tiles.familyRoomKitchen}
        </Column>
        <Column width="20%">
          {tiles.banquetteSeating}
        </Column>
      </Row>
      <Row height={350}>
        <Column width="22%">
          {tiles.centralStair}
        </Column>
        <Column width="35%">
          {tiles.marbleEnsuite}
        </Column>
        <Column width="43%">
          {tiles.vaultedMaster}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayTransitional;
