import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/Renovations-Additions/Lytton-Park-2.jpg';
import image2 from '../../../images/Renovations-Additions/Lytton-Park-1.jpg';
import image3 from '../../../images/Renovations-Additions/Lytton-Park-4.jpg';
import image4 from '../../../images/Renovations-Additions/Lytton-Park-5.jpg';
import image5 from '../../../images/Renovations-Additions/Lytton-Park-3.jpg';

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
              image: image1
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
                  image: image2
                }}
              />
            </Column>
          </Row>
          <Row height="310px">
            <Column>
              <Item
                num={4}
                image={{
                  image: image4
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="54%">
          {/* <Row height="700px"> */}
            {/* <Column> */}
              <Item
                num={3}
                image={{
                  image: image3
                }}
              />
            {/* </Column> */}
          {/* </Row> */}
        </Column>
      </Row>
      <Row height="450px">
        <Column>
          <Item
            num={5}
            image={{
              image: image5
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LyttonParkManor;
