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
  kingswayTransitional: buildProjectTile(projects.kingswayTransitional, 5),
  oakvilleExecutiveHome: buildProjectTile(projects.oakvilleExecutiveHome, 6),
  classicCentreHall: buildProjectTile(projects.classicCentreHall, 7),
  hoggsHollowFrenchCountry: buildProjectTile(projects.hoggsHollowFrenchCountry, 8),
  traditionalKingswayPark: buildProjectTile(projects.traditionalKingswayPark, 9, { backgroundPosition: '30% 40% '})
}


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomes">
      <Row height={705}>
        <Column width="48%">
          {tiles.hoggsHollowTraditional}
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
        <Column>
          {tiles.classicCentreHall}
        </Column>
        <Column>
          {tiles.hoggsHollowFrenchCountry}
        </Column>
        <Column>
          {tiles.traditionalKingswayPark}
        </Column>
      </Row>
    </section>
  </Layout>
)

export default NewHomes
