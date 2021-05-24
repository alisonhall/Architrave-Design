import React from 'react';

import constants from '../../static/app-constants';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Row from '../components/rowHOC';
import Column from '../components/columnHOC';
import Item from '../components/item';

const { projects, portfolio, defaultIntroductionText } = constants;

const tiles = {
  description: (
    <Item
      text={{
        copy: defaultIntroductionText
      }}
    />
  ),
  hoggsHollowTraditional: (
    <Item
      num={1}
      project={projects.hoggsHollowTraditional}
      image={{
        imageUrl: projects.hoggsHollowTraditional.mainImageUrl,
        backgroundPosition: '100% 0%'
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.hoggsHollowTraditional.type}/${projects.hoggsHollowTraditional.fileName}`
      }}
      text={{
        copy: projects.hoggsHollowTraditional.projectName
      }}
    />
  ),
  kingswayGeorgian: (
    <Item
      num={2}
      project={projects.kingswayGeorgian}
      image={{
        imageUrl: projects.kingswayGeorgian.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.kingswayGeorgian.type}/${projects.kingswayGeorgian.fileName}`
      }}
      text={{
        copy: projects.kingswayGeorgian.projectName
      }}
    />
  ),
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
  creditRiverManor: (
    <Item
      num={4}
      project={projects.creditRiverManor}
      image={{
        imageUrl: projects.creditRiverManor.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.creditRiverManor.type}/${projects.creditRiverManor.fileName}`
      }}
      text={{
        copy: projects.creditRiverManor.projectName
      }}
    />
  ),
  classicCentreHall: (
    <Item
      num={5}
      project={projects.classicCentreHall}
      image={{
        imageUrl: projects.classicCentreHall.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.classicCentreHall.type}/${projects.classicCentreHall.fileName}`
      }}
      text={{
        copy: projects.classicCentreHall.projectName
      }}
    />
  ),
  kingswayTransitional: (
    <Item
      num={6}
      project={projects.kingswayTransitional}
      image={{
        imageUrl: projects.kingswayTransitional.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.kingswayTransitional.type}/${projects.kingswayTransitional.fileName}`
      }}
      text={{
        copy: projects.kingswayTransitional.projectName
      }}
    />
  ),
  etobicokeArtsAndCrafts: (
    <Item
      num={7}
      project={projects.etobicokeArtsAndCrafts}
      image={{
        imageUrl: projects.etobicokeArtsAndCrafts.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.etobicokeArtsAndCrafts.type}/${projects.etobicokeArtsAndCrafts.fileName}`
      }}
      text={{
        copy: projects.etobicokeArtsAndCrafts.projectName
      }}
    />
  ),
  lyttonParkManor: (
    <Item
      num={8}
      project={projects.lyttonParkManor}
      image={{
        imageUrl: projects.lyttonParkManor.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.lyttonParkManor.type}/${projects.lyttonParkManor.fileName}`
      }}
      text={{
        copy: projects.lyttonParkManor.projectName
      }}
    />
  )
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
