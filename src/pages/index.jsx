import React from 'react';

import constants from '../../static/app-constants';
import { buildProjectTile } from '../../static/helpers';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Row from '../components/rowHOC';
import Column from '../components/columnHOC';
import Item from '../components/item';

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
  classicCentreHall: buildProjectTile(projects.classicCentreHall, 5),
  kingswayTransitional: buildProjectTile(projects.kingswayTransitional, 6),
  lyttonParkManor: buildProjectTile(projects.lyttonParkManor, 8),
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
  princessMargaretModern: buildProjectTile(projects.princessMargaretModern, 9),
  upperCanadaFarmhouse: buildProjectTile(projects.upperCanadaFarmhouse, 10)
};

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <Seo />
    <section className="contentWrapper layoutAll layoutHome defaultLayout">
      <Row height={702}>
        <Column width="48%">
          {tiles.hoggsHollowFrench}
        </Column>
        <Column width="52%">
          <Row height={386}>
            <Column>
              {tiles.kingswayGeorgian}
            </Column>
          </Row>
          <Row imageHeight={316}>
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
        <Column width="52%">
          {tiles.classicCentreHall}
        </Column>
        <Column width="48%">
          {tiles.princessMargaretModern}
        </Column>
      </Row>
      <Row height={300}>
        <Column width="36%">
          {tiles.lyttonParkManor}
        </Column>
        <Column width="31%">
          {tiles.upperCanadaFarmhouse}
        </Column>
        <Column width="33%">
          {tiles.kingswayTransitional}
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
              {tiles.classicCentreHall}
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
              {tiles.lyttonParkManor}
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
        <Column width="35%">
          {tiles.kingswayTransitional}
        </Column>
        <Column width="31%">
          {tiles.princessMargaretModern}
        </Column>
        <Column width="33%">
          {tiles.upperCanadaFarmhouse}
        </Column>
      </Row>
    </section>
  </Layout>
)

export default IndexPage
