import React from 'react';

import constants from '../../../static/app-constants';
import { buildProjectTile } from '../../../static/helpers';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/rowHOC';
import Column from '../../components/columnHOC';
import Item from '../../components/item';

const { projects, defaultIntroductionText } = constants;

const tiles = {
  description: (
    <Item
      text={{
        copy: defaultIntroductionText
      }}
    />
  ),
  hoggsHollowFrench: buildProjectTile(projects.hoggsHollowFrench, 1, { backgroundPosition: '100% 0%' }),
  kingswayGeorgian: buildProjectTile(projects.kingswayGeorgian, 2),
  kingswayTransitionalFiller: (
    <Item
      num={3}
      project={projects.kingswayTransitional}
      isFiller
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347224/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/6-Banquette-seating_oe01cy.jpg'
      }}
    />
  ),
  creditRiverManorFiller: (
    <Item
      num={3}
      project={projects.creditRiverManor}
      isFiller
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg'
      }}
    />
  ),
  creditRiverManor: buildProjectTile(projects.creditRiverManor, 4),
  kingswayTransitional: buildProjectTile(projects.kingswayTransitional, 5),
  oakvilleExecutiveHome: buildProjectTile(projects.oakvilleExecutiveHome, 6),
  classicCentreHall: buildProjectTile(projects.classicCentreHall, 7),
  traditionalKingswayPark: buildProjectTile(projects.traditionalKingswayPark, 9, { backgroundPosition: '30% 40% ' }),
  kingswayGeorgianFiller: (
    <Item
      num={10}
      project={projects.kingswayGeorgian}
      isFiller
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/5-Main-Hall_txsam1.jpg'
      }}
    />
  ),
  kingswayGeorgianFiller2: (
    <Item
      num={10}
      project={projects.kingswayGeorgian}
      isFiller
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/9-Breakfast-Banquette_plhghs.jpg'
      }}
    />
  )
}


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomes defaultLayout">
      <Row height={705}>
        <Column width="48%">
          {tiles.hoggsHollowFrench}
        </Column>
        <Column width="52%">
          <Row height={370}>
            <Column>
              {tiles.kingswayGeorgian}
            </Column>
          </Row>
          <Row imageHeight={705 - 370}>
            <Column width="40%">
              {tiles.kingswayTransitionalFiller}
            </Column>
            <Column width="60%">
              {tiles.creditRiverManor}
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={300}>
        <Column width="48%">
          {tiles.kingswayTransitional}
        </Column>
        <Column width="52%">
          {tiles.oakvilleExecutiveHome}
        </Column>
      </Row>
      <Row height={300}>
        <Column width="39%">
          {tiles.classicCentreHall}
        </Column>
        <Column width="22%">
          {tiles.kingswayGeorgianFiller}
        </Column>
        <Column width="39%">
          {tiles.traditionalKingswayPark}
        </Column>
      </Row>
    </section>
    <section className="contentWrapper layoutAll layoutHome wideLayout">
      <Row height={550}>
        <Column width="48%">
          {tiles.hoggsHollowFrench}
        </Column>
        <Column>
          <Row imageHeight={275}>
            <Column width="37%">
              {tiles.kingswayGeorgian}
            </Column>
            <Column width="21%">
              {tiles.kingswayTransitionalFiller}
            </Column>
            <Column width="42%">
              {tiles.oakvilleExecutiveHome}
            </Column>
          </Row>
          <Row imageHeight={275}>
            <Column width="42%">
              {tiles.creditRiverManor}
            </Column>
            <Column width="21%">
              {tiles.creditRiverManorFiller}
            </Column>
            <Column width="37%">
              {tiles.kingswayTransitional}
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={300}>
        <Column width="37%">
          {tiles.classicCentreHall}
        </Column>
        <Column width="15%">
          {tiles.kingswayGeorgianFiller2}
        </Column>
        <Column width="15%">
          {tiles.kingswayGeorgianFiller}
        </Column>
        <Column width="33%">
          {tiles.traditionalKingswayPark}
        </Column>
      </Row>
    </section>
  </Layout>
)

export default NewHomes
