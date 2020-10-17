import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';
import Row from '../../../components/row';
import Column from '../../../components/column';

const project = constants.projects.princessMargaretFacelift;

const PrincessMargaretFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="450px">
        <Column width="66%">
          <Item
            num={1}
            image={{
              imageFolder: project.imageFolder,
              imageName: '2-Addition-_-_Re-facing_xddgjt.jpg',
              backgroundPosition: '50% 30%'
            }}
          />
        </Column>
        <Column width="33%">
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
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '3-New-Second-Floor_sxdhhx.jpg',
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Item
            text={{
              title: project.projectName,
              copy: project.projectDescription
            }}
          />
        </Column>
      </Row>
      <Row height="375px">
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '4_hxynkz.jpg',
            }}
          />
        </Column>
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '6_g3yq1e.jpg',
            }}
          />
        </Column>
      </Row>
      <Row height="375px">
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '8_rzkvl5.jpg',
            }}
          />
        </Column>
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '9_o4ahxq.jpg',
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default PrincessMargaretFacelift;
