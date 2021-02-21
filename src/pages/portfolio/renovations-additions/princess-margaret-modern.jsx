import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.princessMargaretModern;

const PrincessMargaretModern = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="450px">
        <Column width="66%">
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/2-Addition-_-_Re-facing_xddgjt.jpg',
              backgroundPosition: '50% 30%'
            }}
          />
        </Column>
        <Column width="33%">
          <Item
            num={2}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/1-Original-1970-Sidesplit_vrexby.jpg'
            }}
            text={{
              copy: 'Before'
            }}
          />
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/3-New-Second-Floor_sxdhhx.jpg',
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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/4_hxynkz.jpg',
            }}
          />
        </Column>
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/6_g3yq1e.jpg',
            }}
          />
        </Column>
      </Row>
      <Row height="375px">
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/8_rzkvl5.jpg',
            }}
          />
        </Column>
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/9_o4ahxq.jpg',
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default PrincessMargaretModern;
