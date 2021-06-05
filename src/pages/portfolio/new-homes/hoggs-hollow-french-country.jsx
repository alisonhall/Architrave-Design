import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.hoggsHollowFrenchCountry;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  eatInKitchen: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347167/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/4-Eat-in-Kitchen_owcnvf.jpg'
      }}
    />
  ),
  2: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943332/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-2_zo3i9y.jpg'
      }}
    />
  ),
  3: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943418/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-3_ybwxyq.jpg'
      }}
    />
  ),
  1: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943414/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-1_dpiasd.jpg'
      }}
    />
  ),
  livingRoom: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/7-Living-Rm_x76pxj.jpg'
      }}
    />
  ),
  5: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943500/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-5_iumyvo.jpg'
      }}
    />
  )
};

const HoggsHollowFrenchCountry = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={390}>
        <Column width="63%">
          {tiles.eatInKitchen}
        </Column>
        <Column width="37%">
          {tiles['2']}
        </Column>
      </Row>
      <Row height={290}>
        <Column width="48%">
          {tiles['3']}
        </Column>
        <Column width="52%">
          {tiles['1']}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={365}>
        <Column width="63%">
          {tiles.livingRoom}
        </Column>
        <Column width="37%">
          {tiles['5']}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default HoggsHollowFrenchCountry;
