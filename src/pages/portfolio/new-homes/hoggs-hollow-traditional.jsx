import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../../../images/New-Homes/HoggsHollowTraditional-1.jpg';
import image3 from '../../../images/New-Homes/HoggsHollowTraditional-2.jpg';
import image4 from '../../../images/New-Homes/HoggsHollowTraditional-3.jpg';
import image5 from '../../../images/New-Homes/HoggsHollowTraditional-5.jpg';

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
              image: image1,
              backgroundPosition: '100% 0%'
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '645px'
            }}
          />
        </Column>
        <Column width="52%">
          <Row height="340px">
            <Column>
              <Item
                num={2}
                image={{
                  image: image2
                }}
                styles={{
                  width: 'calc(52% - (1.5% * 2))',
                  height: '340px'
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Item
                num={3}
                image={{
                  image: image3
                }}
                styles={{
                  width: 'calc(52% - (1.5% * 2))',
                  height: '270px'
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
              image: image4
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={5}
            image={{
              image: image5
            }}
            styles={{
              width: 'calc(52% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default HoggsHollowTraditional;
