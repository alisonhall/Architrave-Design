import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.lyttonParkManor;

const LyttonParkManor = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="600px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347342/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/2-New-Rear-Addition_lsnrso.jpg'
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
      <Row>
        <Column width="46%">
          <Row height="350px">
            <Column>
              <Item
                num={2}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347346/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/1-Sandstone-and-Brick-Front_ftxidf.jpg'
                }}
              />
            </Column>
          </Row>
          <Row height="310px">
            <Column>
              <Item
                num={3}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/5-New-Eat-in-Kitchen_oho9g6.jpg'
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="54%">
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347340/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/4-New-Landing-_-Stairs-to-Master-Suite_jydo7j.jpg'
            }}
          />
        </Column>
      </Row>
      <Row height="450px">
        <Column>
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/3-Front-Hallway_tasjdc.jpg'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LyttonParkManor;
