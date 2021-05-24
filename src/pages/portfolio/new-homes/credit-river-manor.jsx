import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.creditRiverManor;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  1: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg'
      }}
    />
  ),
  2: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592704/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_2_dzqicp.jpg'
      }}
    />
  ),
  4: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592703/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_4_jt4uq1.jpg'
      }}
    />
  ),
  3: (
    <Item
      num={4}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/3-Two-Story-Front-Foyer_lkcpir.jpg'
      }}
    />
  ),
  10: (
    <Item
      num={5}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg'
      }}
    />
  ),
  frontFoyer: (
    <Item
      num={6}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/2-Front-Foyer_y8wodd.jpg'
      }}
    />
  ),
  hallwayArch: (
    <Item
      num={7}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347190/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/7-Hallway-Arch_nsi6eb.jpg'
      }}
    />
  ),
  sittingRoom: (
    <Item
      num={8}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/5-Sitting-Room_dt8nwa.jpg'
      }}
    />
  ),
  diningRoom: (
    <Item
      num={9}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347192/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/6-Dining-Room_n7r1av.jpg'
      }}
    />
  ),
  kitchenBreakfastBay: (
    <Item
      num={10}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/9-Kitchen-_-Breakfast-Bay_k8qrcz.jpg'
      }}
    />
  ),
  familyRoomWithCustomMantel: (
    <Item
      num={11}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/8-Family-Room-with-Custom-Mantel_vvgqso.jpg'
      }}
    />
  ),
  upperHall: (
    <Item
      num={12}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/11-Upper-Hall_yfoloe.jpg'
      }}
    />
  ),
  vaultedMaster: (
    <Item
      num={13}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347210/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/12-Vaulted-Master_z9t3hj.jpg'
      }}
    />
  ),
  bedroom: (
    <Item
      num={14}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/13-Bedroom_nesbsz.jpg'
      }}
    />
  )
};

const CreditRiverManor = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={380}>
        <Column>
          {tiles['1']}
        </Column>
        <Column>
          {tiles['2']}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={380}>
        <Column width="50%">
          {tiles['4']}
        </Column>
        <Column width="25%">
          {tiles['3']}
        </Column>
        <Column width="25%">
          {tiles['10']}
        </Column>
      </Row>
      <Row height={290}>
        <Column width="38%">
          {tiles.frontFoyer}
        </Column>
        <Column width="24%">
          {tiles.hallwayArch}
        </Column>
        <Column width="38%">
          {tiles.sittingRoom}
        </Column>
      </Row>
      <Row height={230}>
        <Column>
          {tiles.diningRoom}
        </Column>
        <Column>
          {tiles.kitchenBreakfastBay}
        </Column>
        <Column>
          {tiles.familyRoomWithCustomMantel}
        </Column>
      </Row>
      <Row height={290}>
        <Column width=" 20%">
          {tiles.upperHall}
        </Column>
        <Column width="45%">
          {tiles.vaultedMaster}
        </Column>
        <Column width="35%">
          {tiles.bedroom}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default CreditRiverManor;
