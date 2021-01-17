import React from 'react';

import constants from '../../../../public/app-constants';

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

const project = constants.projects.lyttonParkUpdate;

const LyttonParkUpdate = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row>
        <Column>
          <Item
            num={1}
            image={{
              image: image1
            }}
            styles={{
              width: 'calc(100% - (1.5% * 2))',
              height: '600px'
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
                styles={{
                  width: 'calc(54% - (1.5% * 2))',
                  height: '350px'
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
                styles={{
                  width: 'calc(54% - (1.5% * 2))',
                  height: '310px'
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="54%">
          <Item
            num={3}
            image={{
              image: image3
            }}
            styles={{
              width: 'calc(46% - (1.5% * 2))',
              height: '700px',
              float: 'right'
            }}
          />
        </Column>
      </Row>
      <Row height="450px">
        <Column>
          <Item
            num={5}
            image={{
              image: image5
            }}
            styles={{
              width: 'calc(100% - (1.5% * 2))',
              height: '450px'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default LyttonParkUpdate;
