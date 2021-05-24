import React from 'react';

import constants from '../../../static/app-constants';
import { buildProjectTile } from '../../../static/helpers';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/rowHOC';
import Column from '../../components/columnHOC';
import Item from '../../components/item';

const { projects, portfolio, defaultIntroductionText } = constants;

const tiles = {
  description: (
    <Item
      text={{
        copy: defaultIntroductionText
      }}
    />
  ),
  lyttonParkManor: buildProjectTile(projects.lyttonParkManor, 1),
  princessMargaretModern: buildProjectTile(projects.princessMargaretModern, 2, { backgroundPosition: '50% 30%' }),
  upperCanadaFarmhouse: buildProjectTile(projects.upperCanadaFarmhouse, 3),
  rosedaleEdwardian: buildProjectTile(projects.rosedaleEdwardian, 4),
  etobicokeArtsAndCrafts: buildProjectTile(projects.etobicokeArtsAndCrafts, 5)
}

const RenovationsAdditions = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutRenovations">
      <Row height={645}>
        <Column width="48%">
          {tiles.lyttonParkManor}
        </Column>
        <Column width="52%">
          <Row height={345}>
            <Column>
              {tiles.princessMargaretModern}
            </Column>
          </Row>
          <Row imageHeight={645 - 345}>
            <Column>
              {tiles.upperCanadaFarmhouse}
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
          {tiles.rosedaleEdwardian}
        </Column>
        <Column width="52%">
          {tiles.etobicokeArtsAndCrafts}
        </Column>
      </Row>
    </section>
  </Layout>
)

export default RenovationsAdditions
