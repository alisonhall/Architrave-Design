import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import Seo from '../../../components/seo';
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
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224718/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/wllgq8z17m_qlavce.jpg'
      }}
    />
  ),
  frontAlternative: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224720/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/t3me2mc9ik_so4o4x.jpg'
      }}
    />
  ),
  modernRear: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347233/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/2-Modern-Rear_juviao.jpg'
      }}
    />
  ),
  entrancewayDining: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224738/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/inzkd3co1u_k78khw.jpg'
      }}
    />
  ),
  entrance: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224731/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/9ynkmnemea_xi4jy3.jpg'
      }}
    />
  ),
  entranceHallway: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224712/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/wyiw0roxqk_pdosis.jpg'
      }}
    />
  ),
  livingRoomKitchen: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224715/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/wpmfr17qls_cwaye2.jpg'
      }}
    />
  ),
  livingRoom: (
    <Item
      num={8}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224733/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/8a5rn0jhm9_yayhnq.jpg'
      }}
    />
  ),
  kitchen: (
    <Item
      num={9}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224735/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/9yil46v4lj_s8tjbi.jpg'
      }}
    />
  ),
  breakfastTable: (
    <Item
      num={10}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224715/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/vkdzuxidqt_qcdfzk.jpg'
      }}
    />
  ),
  staircase: (
    <Item
      num={11}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224730/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/nb2m6t67mu_intdkd.jpg'
      }}
    />
  ),
  upstairsHallway: (
    <Item
      num={12}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224736/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/tfeivoj6j0_ztt97m.jpg'
      }}
    />
  ),
  masterBedroom: (
    <Item
      num={13}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224733/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/5ezfxtm9pp_cdqizs.jpg'
      }}
    />
  ),
  bedroomDoors: (
    <Item
      num={14}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224726/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/5wxqms5oi8_ohgn7k.jpg'
      }}
    />
  ),
  bathroomSinks: (
    <Item
      num={15}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224713/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/2wl8dux9ys_pirdbm.jpg'
      }}
    />
  ),
  bathroomTub: (
    <Item
      num={16}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224735/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/qih7wzw9i8_egspcu.jpg'
      }}
    />
  )
};

const KingswayTransitional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <Seo />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={340}>
        <Column>
          {tiles.traditionalFrontFacade}
        </Column>
        <Column>
          {tiles.frontAlternative}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={400}>
        <Column width="50%">
          {tiles.modernRear}
        </Column>
        <Column width="50%">
          <Row height={350}>
            <Column>
              {tiles.entrancewayDining}
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
        <Column>{tiles.entrance}</Column>
        <Column>{tiles.entranceHallway}</Column>
      </Row>
      <Row height={340}>
        <Column>{tiles.livingRoomKitchen}</Column>
        <Column>{tiles.livingRoom}</Column>
      </Row>
      <Row height={340}>
        <Column>{tiles.kitchen}</Column>
        <Column>{tiles.breakfastTable}</Column>
      </Row>
      <Row height={340}>
        <Column>{tiles.staircase}</Column>
        <Column>{tiles.upstairsHallway}</Column>
      </Row>
      <Row height={340}>
        <Column>{tiles.masterBedroom}</Column>
        <Column>{tiles.bedroomDoors}</Column>
      </Row>
      <Row height={340}>
        <Column>{tiles.bathroomSinks}</Column>
        <Column>{tiles.bathroomTub}</Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={440}>
        <Column>
          {tiles.traditionalFrontFacade}
        </Column>
        <Column>
          {tiles.frontAlternative}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={500}>
        <Column width="50%">
          {tiles.modernRear}
        </Column>
        <Column width="50%">
          <Row height={400}>
            <Column>
              {tiles.entrancewayDining}
            </Column>
          </Row>
          <Row>
            <Column>
              <Item />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row height={440}>
        <Column>{tiles.entrance}</Column>
        <Column>{tiles.entranceHallway}</Column>
      </Row>
      <Row height={440}>
        <Column>{tiles.livingRoomKitchen}</Column>
        <Column>{tiles.livingRoom}</Column>
      </Row>
      <Row height={440}>
        <Column>{tiles.kitchen}</Column>
        <Column>{tiles.breakfastTable}</Column>
      </Row>
      <Row height={440}>
        <Column>{tiles.staircase}</Column>
        <Column>{tiles.upstairsHallway}</Column>
      </Row>
      <Row height={440}>
        <Column>{tiles.masterBedroom}</Column>
        <Column>{tiles.bedroomDoors}</Column>
      </Row>
      <Row height={440}>
        <Column>{tiles.bathroomSinks}</Column>
        <Column>{tiles.bathroomTub}</Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayTransitional;
