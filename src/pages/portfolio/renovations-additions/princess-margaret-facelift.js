import React from 'react';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';
import Row from '../../../components/row';
import Column from '../../../components/column';
import constants from '../../../../static/app-constants';

const project = constants.projects.princessMargaretFacelift;

const PrincessMargaretFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="450px">
        <Column>
          <Item
            num={1}
            image={{
              imageFolder: project.imageFolder,
              imageName: '2-Addition-_-_Re-facing_xddgjt.jpg',
              backgroundPosition: '50% 30%'
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Item
            text={{
              title: 'Princess Margaret Facelift',
              copy: 'A sixties era side-split needed a complete update inside and out. A new 2nd floor and contemporary facing gives a familiar style a modern twist.'
            }}
          />
        </Column>
      </Row>
      <Row height="375px">
        <Column width="50%">
          <Item
            num={2}
            image={{
              imageFolder: project.imageFolder,
              imageName: '1-Original-1970-Sidesplit_vrexby.jpg'
            }}
            text={{
              copy: 'Before'
            }}
          />
        </Column>
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '3-New-Second-Floor_sxdhhx.jpg',
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default PrincessMargaretFacelift;
