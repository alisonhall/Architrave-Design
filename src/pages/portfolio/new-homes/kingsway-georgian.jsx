import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.kingswayGeorgian;

const KingswayGeorgian = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="750px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/1-Front-Facade_eohlwb.jpg'
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
        <Column width="35%">
          <Row height="400px">
            <Column>
              <Item
                num={2}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347138/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/2-Cut-Stone_Portico_doxm8y.jpg'
                }}
              />
            </Column>  
          </Row>
          <Row>
            <Column>
              <Item
                num={4}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/3-Back-Garden_bczadu.jpg'
                }}
              />
            </Column>  
          </Row>
        </Column>
        <Column width="65%">
          <Row height="700px">
            <Column>
              <Item
                num={4}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/5-Main-Hall_txsam1.jpg'
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
      <Row>
        <Column width="58%">
          <Row height="350px">
            <Column>
              <Item
                num={5}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347145/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/7-Family-Room_lh91x1.jpg'
                }}
              />
            </Column>
          </Row>
          <Row height="350px">
            <Column>
              <Item
                num={6}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/8-Kitchen_mrd8z9.jpg'
                }}
              />
            </Column>
          </Row>
          <Row height="350px">
            <Column>
              <Item
                num={7}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/10-Island-_-Servery_whpyxm.jpg'
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="42%">
          <Row height="540px">
            <Column>
              <Item
                num={8}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347140/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/6-Sitting-Room_et7o9z.jpg'
                }}
              />
            </Column>
          </Row>
          <Row height="540px">
            <Column>
              <Item
                num={9}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/9-Breakfast-Banquette_plhghs.jpg'
                }}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row height="350px">
        <Column width="34%">
          <Item
            num={10}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/11-Landing-_-Window-seat_y0xb7c.jpg'
            }}
          />
        </Column>
        <Column width="32%">
          <Item
            num={11}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/13-Freestanding-Tub_oo8ylx.jpg'
            }}
          />
        </Column>
        <Column width="34%">
          <Item
            num={12}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347151/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/15-Third-Floor-Guest-Suite_my5izk.jpg'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default KingswayGeorgian;
