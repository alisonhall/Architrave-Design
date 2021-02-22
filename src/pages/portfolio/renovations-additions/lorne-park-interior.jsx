import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.lorneParkInterior;

const LorneParkInterior = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row>
        <Column width="23%">
          <Row height="225px">
            <Column>
              <Item
                num={1}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-2_whsiom.jpg'
                }}
              />
            </Column>
          </Row>
          <Row height="225px">
            <Column>
              <Item
                num={2}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-1_zlu8rc.jpg'
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="77%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-4_usn7jd.jpg'
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
      <Row height="260px">
        <Column>
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-5_l7ardg.jpg',
              backgroundPosition: '50% 30%'
            }}
          />
        </Column>
        <Column>
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-6_kwdbb0.jpg',
              backgroundPosition: '50% 30%'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LorneParkInterior;
