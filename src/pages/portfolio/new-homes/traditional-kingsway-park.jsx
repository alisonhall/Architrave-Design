import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.traditionalKingswayPark;

const TraditionalKingswayPark = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="630px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347271/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/1-Traditional-Stone-Front_mk1zvn.jpg',
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
      <Row height="425px">
        <Column width="34%">
          <Item
            num={2}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347268/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/2-Front-Foyer_uc6wxy.jpg',
              height: 425
            }}
          />
        </Column>
        <Column width="66%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347269/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/3-Dining-Room_hegcnz.jpg',
              height: 425
            }}
          />
        </Column>
      </Row>
      <Row height="525px">
        <Column>
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347269/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/4-Family-Room-Builtins_duyso3.jpg',
              height: 525
            }}
          />
        </Column>
      </Row>
      <Row height="270px">
        <Column width="47%">
          <Row>
            <Column>
              <Item />
            </Column>
          </Row>
          <Row height="200px">
            <Column>
              <Item
                num={5}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347270/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/5-Family-_Room-_-Kitchen_nqonjc.jpg',
                  height: 270
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="53%">
          <Item
            num={6}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347270/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/7-Master-Ensuite_g5n9vl.jpg',
              height: 270
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default TraditionalKingswayPark;
