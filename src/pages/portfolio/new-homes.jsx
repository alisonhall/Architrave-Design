import React from 'react';

import constants from '../../../static/app-constants';

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
  kingswayTransitional: (
    <Item
      num={5}
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
  oakvilleExecutiveHome: (
    <Item
      num={6}
      project={projects.oakvilleExecutiveHome}
      image={{
        imageUrl: projects.oakvilleExecutiveHome.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.oakvilleExecutiveHome.type}/${projects.oakvilleExecutiveHome.fileName}`
      }}
      text={{
        copy: projects.oakvilleExecutiveHome.projectName
      }}
    />
  ),
  classicCentreHall: (
    <Item
      num={7}
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
  hoggsHollowFrenchCountry: (
    <Item
      num={8}
      project={projects.hoggsHollowFrenchCountry}
      image={{
        imageUrl: projects.hoggsHollowFrenchCountry.mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.hoggsHollowFrenchCountry.type}/${projects.hoggsHollowFrenchCountry.fileName}`
      }}
      text={{
        copy: projects.hoggsHollowFrenchCountry.projectName
      }}
    />
  ),
  traditionalKingswayPark: (
    <Item
      num={9}
      project={projects.traditionalKingswayPark}
      image={{
        imageUrl: projects.traditionalKingswayPark.mainImageUrl,
        backgroundPosition: '30% 40%'
      }}
      link={{
        linkUrl: `/${portfolio}/${projects.traditionalKingswayPark.type}/${projects.traditionalKingswayPark.fileName}`
      }}
      text={{
        copy: projects.traditionalKingswayPark.projectName
      }}
    />
  )
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
          <Row height={705 - 370}>
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
