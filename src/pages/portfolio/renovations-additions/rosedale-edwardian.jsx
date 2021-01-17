import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.rosedaleEdwardian;

const RosedaleEdwardian = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="650px">
        <Column>
          <Item
            num={1}
            image={{
              imageFolder: project.imageFolder,
              imageName: '2-Edwardian-Renewal_htqqfn.jpg'
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
        <Column width="48%">
          <Item
            num={2}
            image={{
              imageFolder: project.imageFolder,
              imageName: '1-Before_olg276.jpg',
            }}
            text={{
              copy: 'Before'
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '3-New-Brick-Bay_nnbw0a.jpg'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default RosedaleEdwardian;
