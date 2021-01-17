import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/Renovations-Additions/Royal-York-1.jpg';
import image2 from '../../../images/Renovations-Additions/Royal-York-2.jpg';

const project = constants.projects.royalYorkFacelift;

const RoyalYorkFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row>
        <Column>
          <Item
            num={1}
            image={{
              image: image1
            }}
            text={{
              copy: 'Before'
            }}
            styles={{
              width: 'calc(50% - (1.5% * 2))',
              height: '375px',
            }}
          />
        </Column>
        <Column>
          <Item
            num={2}
            image={{
              image: image2
            }}
            text={{
              copy: 'New Facade'
            }}
            styles={{
              width: 'calc(50% - (1.5% * 2))',
              height: '375px',
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
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default RoyalYorkFacelift;
