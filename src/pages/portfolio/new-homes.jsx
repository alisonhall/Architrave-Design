import React from 'react';

import constants from '../../../static/app-constants';
import { buildProjectTile } from '../../../static/helpers';

import Layout from '../../components/layout';
import Seo from '../../components/seo';
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
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/11-Landing-_-Window-seat_y0xb7c.jpg',
      }}
    />
  )
}


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <Seo />
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
            <Column>
              {tiles.classicCentreHall}
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
          {tiles.creditRiverManor}
        </Column>
      </Row>
      <Row height={300}>
        <Column width="39%">
          {tiles.oakvilleExecutiveHome}
        </Column>
        <Column width="22%">
          {tiles.kingswayTransitionalFiller}
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
            <Column width="54%">
              {tiles.kingswayGeorgian}
            </Column>
            <Column width="46%">
              {tiles.classicCentreHall}
            </Column>
          </Row>
          <Row imageHeight={275}>
            <Column width="42%">
              {tiles.creditRiverManor}
            </Column>
            <Column width="21%">
              {tiles.kingswayTransitionalFiller}
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
        <Column width="39%">
          {tiles.oakvilleExecutiveHome}
        </Column>
        <Column width="23%">
          {tiles.kingswayGeorgianFiller}
        </Column>
        <Column width="38%">
          {tiles.traditionalKingswayPark}
        </Column>
      </Row>
    </section>
  </Layout>
)

export default NewHomes
