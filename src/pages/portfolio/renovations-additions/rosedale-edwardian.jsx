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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/2-Edwardian-Renewal_htqqfn.jpg',
              height: 650
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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/1-Before_olg276.jpg',
              height: 375
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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/3-New-Brick-Bay_nnbw0a.jpg',
              height: 375
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default RosedaleEdwardian;
