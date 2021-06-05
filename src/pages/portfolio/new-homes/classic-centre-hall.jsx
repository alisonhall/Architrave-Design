import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.classicCentreHall;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  cutStoneFacade: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg'
      }}
    />
  ),
  limestoneDetail: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/2-Limestone-Detail_l6fs59.jpg'
      }}
    />
  ),
  twoStoreyMainHall: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/3-Two-Storey-Main-Hall_ejywhy.jpg'
      }}
    />
  ),
  customKitchen: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/4-Custom-Kitchen_odkxdb.jpg'
      }}
    />
  ),
  familyRoom: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/5-Family-Room_gdmmua.jpg'
      }}
    />
  ),
  entranceway: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/xxKing_Georges_Rd_003_cneudt.jpg'
      }}
    />
  ),
  upperHall: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/7-Upper_Hall_mvytmk.jpg'
      }}
    />
  ),
  homeOffice: (
    <Item
      num={8}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/10-Home-Office_aozszs.jpg'
      }}
    />
  ),
  masterBedroom: (
    <Item
      num={9}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/8-Master-Bedroom_l9mlyp.jpg'
      }}
    />
  ),
  masterEnsuite: (
    <Item
      num={10}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/9-Master-Ensuite_ce0yej.jpg'
      }}
    />
  ),
  jackNJillVanities: (
    <Item
      num={11}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/11-Jack_n_Jill-Vanities_btkar8.jpg'
      }}
    />
  ),
  entraceway360: (
    <iframe title="Entranceway 360 degree interactive panorama" width="100%" height="100%" frameborder="0" allowfullscreen allow="xr-spatial-tracking; gyroscope; accelerometer" scrolling="no" src="https://kuula.co/share/7rcnJ?fs=1&vr=0&zoom=1&sd=1&thumbs=1&info=1&logo=1"></iframe>
  )
};

const ClassicCentreHall = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={332}>
        <Column>
          {tiles.cutStoneFacade}
        </Column>
        <Column>
          {tiles.limestoneDetail}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={500}>
        <Column>
          {tiles.entraceway360}
        </Column>
      </Row>
      <Row height={300}>
        <Column>
          {tiles.entranceway}
        </Column>
        <Column>
          {tiles.customKitchen}
        </Column>
        <Column>
          {tiles.familyRoom}
        </Column>
      </Row>
      <Row height={300}>
        <Column>
          {tiles.twoStoreyMainHall}
        </Column>
        <Column>
          {tiles.upperHall}
        </Column>
        <Column>
          {tiles.homeOffice}
        </Column>
      </Row>
      <Row height={300}>
        <Column>
          {tiles.masterBedroom}
        </Column>
        <Column>
          {tiles.masterEnsuite}
        </Column>
        <Column>
          {tiles.jackNJillVanities}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={450}>
        <Column>
          {tiles.cutStoneFacade}
        </Column>
        <Column>
          {tiles.limestoneDetail}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={500}>
        <Column>
          {tiles.entraceway360}
        </Column>
      </Row>
      <Row height={300}>
        <Column>
          {tiles.entranceway}
        </Column>
        <Column>
          {tiles.customKitchen}
        </Column>
        <Column>
          {tiles.familyRoom}
        </Column>
      </Row>
      <Row height={300}>
        <Column>
          {tiles.upperHall}
        </Column>
        <Column>
          {tiles.twoStoreyMainHall}
        </Column>
        <Column>
          {tiles.homeOffice}
        </Column>
      </Row>
      <Row height={300}>
        <Column>
          {tiles.masterBedroom}
        </Column>
        <Column>
          {tiles.masterEnsuite}
        </Column>
        <Column>
          {tiles.jackNJillVanities}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default ClassicCentreHall;
