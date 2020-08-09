import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';
import Row from '../../../components/row';
import Column from '../../../components/column';

const project = constants.projects.rosedaleRevival;

const RosedaleRevival = (props) => (
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
              title: 'Rosedale Revival',
              copy: 'This 1917 home was a diamond in the rough. Powercleaning revealed attractive brick under the green paint. A new Edwardian-style bay and dormers gave it a historic character and quality it always lacked.'
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

export default RosedaleRevival;
