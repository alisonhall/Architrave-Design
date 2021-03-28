import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.etobicokeArtsAndCrafts;

const EtobicokeArtsAndCrafts = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row>
        <Column width="62%">
          <Row height="480px">
            <Column>
              <Item
                num={1}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347380/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/2-Arts-and-Crafts-Restyling_jydm2x.jpg',
                  height: 480
                }}
              />
            </Column>
          </Row>
          <Row height="240px">
            <Column>
              <Item
                num={2}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347373/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/1b-Before_2_hhwjuw.jpg',
                  height: 240
                }}
                text={{
                  copy: 'Before'
                }}
              />
            </Column>
            <Column>
              <Item
                num={3}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347382/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/6-New-Reading-Nook_khsnqo.jpg',
                  height: 240
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="38%">
          <Row height="215px">
            <Column>
              <Item
                num={4}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347383/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/xxSeat_Drawers_uityi0.jpg',
                  height: 215
                }}
              />
            </Column>
          </Row>
          <Row height="505px">
            <Column>
              <Item
                num={5}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347548/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/7-Window-Seat_qspbju.jpg',
                  height: 505
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
      <Row height="390px">
        <Column width="48%">
          <Item
            num={6}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347384/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/5-Custom-Cabinetry_zay5pm.jpg',
              height: 390
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={7}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347379/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/9-Master_lsvfyq.jpg',
              height: 390
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default EtobicokeArtsAndCrafts;
