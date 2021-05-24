import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.rosedaleEdwardian;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  edwardianRenewal: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/2-Edwardian-Renewal_htqqfn.jpg'
      }}
    />
  ),
  before: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/1-Before_olg276.jpg'
      }}
      text={{
        copy: 'Before'
      }}
    />
  ),
  newBrickBay: (
    <Item
      num={3}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/3-New-Brick-Bay_nnbw0a.jpg'
      }}
    />
  )
};

const RosedaleEdwardian = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={650}>
        <Column>
          {tiles.edwardianRenewal}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <Row height={375}>
        <Column width="48%">
          {tiles.before}
        </Column>
        <Column width="52%">
          {tiles.newBrickBay}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default RosedaleEdwardian;
