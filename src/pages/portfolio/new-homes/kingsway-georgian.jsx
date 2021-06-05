import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.kingswayGeorgian;

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
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/1-Front-Facade_eohlwb.jpg',
      }}
    />
  ),
  cutStonePortico: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347138/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/2-Cut-Stone_Portico_doxm8y.jpg',
      }}
    />
  ),
  backGarden: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/3-Back-Garden_bczadu.jpg',
      }}
    />
  ),
  familyRoom: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347145/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/7-Family-Room_lh91x1.jpg',
      }}
    />
  ),
  kitchen: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/8-Kitchen_mrd8z9.jpg',
      }}
    />
  ),
  mainHall: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/5-Main-Hall_txsam1.jpg',
      }}
    />
  ),
  islandServery: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/10-Island-_-Servery_whpyxm.jpg',
      }}
    />
  ),
  sittingRoom: (
    <Item
      num={8}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347140/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/6-Sitting-Room_et7o9z.jpg',
      }}
    />
  ),
  breakfastBanquette: (
    <Item
      num={9}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/9-Breakfast-Banquette_plhghs.jpg',
      }}
    />
  ),
  landingWindowSeat: (
    <Item
      num={10}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/11-Landing-_-Window-seat_y0xb7c.jpg',
      }}
    />
  ),
  freestandingTub: (
    <Item
      num={11}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/13-Freestanding-Tub_oo8ylx.jpg',
      }}
    />
  ),
  thirdFloorGuestSuite: (
    <Item
      num={12}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347151/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/15-Third-Floor-Guest-Suite_my5izk.jpg',
      }}
    />
  ),
  marbleFoyer: (
    <Item
      num={13}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347139/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/4-Marble-Foyer_ogejte.jpg'
      }}
    />
  ),
  ensuiteWithHisHersVanities: (
    <Item
      num={14}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347146/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/12-Ensuite-with-His-_-Hers-Vanities_x1h75n.jpg'
      }}
    />
  ),
  jackNJillBathroom: (
    <Item
      num={15}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/14-Jack_n_Jill-Bathroom_lxvxyl.jpg'
      }}
    />
  )
}

const KingswayGeorgian = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={750}>
        <Column>
          {tiles.frontFacade}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row>
        <Column width="35%">
          <Row height={400}>
            <Column>
              {tiles.cutStonePortico}
            </Column>
          </Row>
          <Row>
            <Column>
              {tiles.backGarden}
            </Column>
          </Row>
        </Column>
        <Column width="65%">
          <Row height={700}>
            <Column>
              {tiles.mainHall}
            </Column>
          </Row>
          <Row>
            <Column>
              <Item />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column width="58%">
          <Row height={350}>
            <Column>
              {tiles.familyRoom}
            </Column>
          </Row>
          <Row height={350}>
            <Column>
              {tiles.kitchen}
            </Column>
          </Row>
          <Row height={350}>
            <Column>
              {tiles.islandServery}
            </Column>
          </Row>
        </Column>
        <Column width="42%">
          <Row height={540}>
            <Column>
              {tiles.sittingRoom}
            </Column>
          </Row>
          <Row height={540}>
            <Column>
              {tiles.breakfastBanquette}
            </Column>
          </Row>
        </Column>
      </Row>
      <Row height={350}>
        <Column width="34%">
          {tiles.landingWindowSeat}
        </Column>
        <Column width="32%">
          {tiles.freestandingTub}
        </Column>
        <Column width="34%">
          {tiles.thirdFloorGuestSuite}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={500}>
        <Column width="45%">
          {tiles.frontFacade}
        </Column>
        <Column width="25%">
          {tiles.cutStonePortico}
        </Column>
        <Column width="30%">
          {tiles.backGarden}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={350}>
        <Column width="20%">
          {tiles.marbleFoyer}
        </Column>
        <Column width="20%">
          {tiles.sittingRoom}
        </Column>
        <Column width="20%">
          {tiles.mainHall}
        </Column>
        <Column width="40%">
          <Row height={275}>
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
      <Row height={325}>
        <Column width="17%">
          {tiles.breakfastBanquette}
        </Column>
        <Column width="43%">
          {tiles.kitchen}
        </Column>
        <Column width="40%">
          {tiles.islandServery}
        </Column>
      </Row>
      <Row height={400}>
        <Column width="27%">
          {tiles.landingWindowSeat}
        </Column>
        <Column width="23%">
          {tiles.ensuiteWithHisHersVanities}
        </Column>
        <Column width="23%">
          {tiles.jackNJillBathroom}
        </Column>
        <Column width="27%">
          {tiles.thirdFloorGuestSuite}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayGeorgian;
