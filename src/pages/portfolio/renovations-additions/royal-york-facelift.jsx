import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import Seo from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.royalYorkFacelift;

const tiles = {
  description: (
    <Item
      text={{
        title: project.projectName,
        copy: project.projectDescription
      }}
    />
  ),
  before: (
    <Item
      num={1}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-1_luwupq.jpg'
      }}
      text={{
        copy: 'Before'
      }}
    />
  ),
  newFacade: (
    <Item
      num={2}
      image={{
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-2_ejplbx.jpg'
      }}
      text={{
        copy: 'New Facade'
      }}
    />
  )
};

const RoyalYorkFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <Seo />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height={375}>
        <Column>
          {tiles.before}
        </Column>
        <Column>
          {tiles.newFacade}
        </Column>
      </Row>
      <Row>
        <Column>
          {tiles.description}
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default RoyalYorkFacelift;
