import React from 'react';

import constants from '../../static/app-constants';
import { buildProjectTile } from '../../static/helpers';

import Layout from '../components/layout';
import SEO from '../components/seo';
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
  hoggsHollowTraditional: buildProjectTile(projects.hoggsHollowTraditional, 1, { backgroundPosition: '100% 0%' }),
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
  etobicokeArtsAndCrafts: buildProjectTile(projects.etobicokeArtsAndCrafts, 7),
  lyttonParkManor: buildProjectTile(projects.lyttonParkManor, 8)
};

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <SEO />
    <section className="contentWrapper layoutAll layoutHome">
      <Row height={702}>
        <Column width="48%">
          {tiles.hoggsHollowTraditional}
        </Column>
        <Column width="52%">
          <Row height={386}>
            <Column>
              {tiles.kingswayGeorgian}
            </Column>
          </Row>
          <Row height={316}>
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
          {tiles.kingswayTransitional}
        </Column>
      </Row>
      <Row height={345}>
        <Column width="36%">
          {tiles.etobicokeArtsAndCrafts}
        </Column>
        <Column width="64%">
          {tiles.lyttonParkManor}
        </Column>
      </Row>
    </section>
  </Layout>
)

export default IndexPage
