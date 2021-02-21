import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.hoggsHollowTraditional;

const HoggsHollowTraditional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="645px">
        <Column width="48%">
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg',
              backgroundPosition: '100% 0%'
            }}
          />
        </Column>
        <Column width="52%">
          <Row height="340px">
            <Column>
              <Item
                num={2}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/1-Front-Facade_iieaut.jpg'
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Item
                num={3}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347175/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/8-Riverside-Terraces_ukricc.jpg'
                }}
              />
            </Column>
          </Row>
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
      <Row height="300px">
        <Column width="48%">
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/9-Custom-Pool_rj5teb.jpg'
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347177/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/3-Coffered-Family-Room_ayggrb.jpg'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default HoggsHollowTraditional;
