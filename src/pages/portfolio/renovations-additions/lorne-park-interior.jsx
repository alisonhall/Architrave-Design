import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/Renovations-Additions/Lorne-Park-2.jpg';
import image2 from '../../../images/Renovations-Additions/Lorne-Park-4.jpg';
import image3 from '../../../images/Renovations-Additions/Lorne-Park-1.jpg';
import image4 from '../../../images/Renovations-Additions/Lorne-Park-5.jpg';
import image5 from '../../../images/Renovations-Additions/Lorne-Park-6.jpg';

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
                  image: image1
                }}
              />
            </Column>
          </Row>
          <Row height="225px">
            <Column>
              <Item
                num={3}
                image={{
                  image: image3
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="77%">
          <Item
            num={2}
            image={{
              image: image2
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
              image: image4,
              backgroundPosition: '50% 30%'
            }}
          />
        </Column>
        <Column>
          <Item
            num={5}
            image={{
              image: image5,
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
