import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.kingswayTransitional;

const KingswayTransitional = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="630px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347231/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/1-Traditional-Front-Facade_xapffn.jpg',
              height: 630
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
      <Row height="290px">
        <Column width="42%">
          <Item
            num={2}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347233/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/2-Modern-Rear_juviao.jpg',
              height: 290
            }}
          />
        </Column>
        <Column width="29%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347224/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/6-Banquette-seating_oe01cy.jpg',
              height: 290
            }}
          />
        </Column>
        <Column width="29%">
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347216/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/3-Central-Stair_svysch.jpg',
              height: 290
            }}
          />
        </Column>
      </Row>
      <Row height="340px">
        <Column>
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347230/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/5._Family-Room-_-Kitchen_ydyxys.jpg',
              height: 340
            }}
          />
        </Column>
        <Column>
          <Row height="260px">
            <Column>
              <Item
                num={6}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347222/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/4-Family-Room_kacy5b.jpg',
                  height: 260
                }}
              />
            </Column>  
          </Row>
          <Row>
            <Column>
              <Item />
            </Column>  
          </Row>
        </Column>
      </Row>
      <Row height="340px">
        <Column width="58%">
          <Item
            num={7}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347223/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/7-Vaulted-Master_shswjo.jpg',
              height: 340
            }}
          />
        </Column>
        <Column width="42%">
          <Item
            num={8}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347229/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/8-Marble-Ensuite_ev33ah.jpg',
              height: 340
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayTransitional;
