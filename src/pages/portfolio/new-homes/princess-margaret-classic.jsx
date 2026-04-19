import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import Seo from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.princessMargaretClassic;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  frontFacadeWithGarage: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209319/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/1_x7zkiz.jpg',
        backgroundPosition: '100% 0%'
      }}
    />
  ),
  frontFacade: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209319/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/2_ah1ebs.jpg',
        backgroundPosition: '35% 40%'
      }}
    />
  ),
  pool: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209319/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/3_bf2mb2.jpg',
        backgroundPosition: '100% 100%'
      }}
    />
  ),
  couch: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209318/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/4_im2bye.jpg',
        backgroundPosition: '50% 70%'
      }}
    />
  ),
  entranceStairway: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209318/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/5_fzrdsw.jpg',
        backgroundPosition: '0% 100%'
      }}
    />
  ),
  diningTable: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209343/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/6_uimiia.jpg',
        backgroundPosition: '50% 80%'
      }}
    />
  ),
  kitchen: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209343/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/8_uii1fg.jpg',
        backgroundPosition: '20% 80%'
      }}
    />
  ),
  fireplace: (
    <Item
      num={8}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209345/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/10_ldpclf.jpg'
      }}
    />
  ),
  mudroom: (
    <Item
      num={9}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209345/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/11_l5rvhs.jpg'
      }}
    />
  ),
  bedroom: (
    <Item
      num={10}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209345/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/12_goklqz.jpg',
        backgroundPosition: '70% 50%'
      }}
    />
  ),
  kitchen360: (
    <Item
      num={11}
      content={(
        <iframe width="100%" height="500" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/LlHdJ?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>
      )}
    />
  ),
  livingDining360: (
    <Item
      num={12}
      content={(
        <iframe width="100%" height="400" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/LlHdT?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>
      )}
    />
  ),
  upstairs360: (
    <Item
      num={13}
      content={(
        <iframe width="100%" height="400" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/LlHdt?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>
      )}
    />
  )
};

const PrincessMargaretClassic = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <Seo />
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height={450}>
        <Column width="48%">
          {tiles.frontFacadeWithGarage}
        </Column>
        <Column width="52%">
          {tiles.frontFacade}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={500}>
        <Column>
          {tiles.kitchen360}
        </Column>
      </Row>
      <Row height={350}>
        <Column width="62%">
          {tiles.pool}
        </Column>
        <Column width="38%">
          {tiles.couch}
        </Column>
      </Row>
      <Row height={400}>
        <Column>
          {tiles.livingDining360}
        </Column>
        <Column>
          {tiles.upstairs360}
        </Column>
      </Row>
      <Row height={350}>
        <Column width="32%">
          {tiles.entranceStairway}
        </Column>
        <Column width="32%">
          {tiles.diningTable}
        </Column>
        <Column width="32%">
          {tiles.kitchen}
        </Column>
      </Row>
      <Row height={350}>
        <Column width="48%">
          {tiles.fireplace}
        </Column>
        <Column width="26%">
          {tiles.mudroom}
        </Column>
        <Column width="26%">
          {tiles.bedroom}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height={600}>
        <Column width="48%">
          {tiles.frontFacadeWithGarage}
        </Column>
        <Column width="52%">
          {tiles.frontFacade}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={500}>
        <Column>
          {tiles.kitchen360}
        </Column>
      </Row>
      <Row height={480}>
        <Column width="62%">
          {tiles.pool}
        </Column>
        <Column width="38%">
          {tiles.couch}
        </Column>
      </Row>
      <Row height={400}>
        <Column>
          {tiles.livingDining360}
        </Column>
        <Column>
          {tiles.upstairs360}
        </Column>
      </Row>
      <Row height={480}>
        <Column width="32%">
          {tiles.entranceStairway}
        </Column>
        <Column width="32%">
          {tiles.diningTable}
        </Column>
        <Column width="32%">
          {tiles.kitchen}
        </Column>
      </Row>
      <Row height={480}>
        <Column width="48%">
          {tiles.fireplace}
        </Column>
        <Column width="26%">
          {tiles.mudroom}
        </Column>
        <Column width="26%">
          {tiles.bedroom}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default PrincessMargaretClassic;
