import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

import image1 from '../../../images/New-Homes/KingswayTraditional-1.jpg';
import image2 from '../../../images/New-Homes/KingswayTraditional-2.jpg';
import image3 from '../../../images/New-Homes/KingswayTraditional-3.jpg';
import image4 from '../../../images/New-Homes/KingswayTraditional-4.jpg';
import image5 from '../../../images/New-Homes/KingswayTraditional-6.jpg';
import image6 from '../../../images/New-Homes/KingswayTraditional-5.jpg';

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
      <Row height="425px">
        <Column width="34%">
          <Item
            num={2}
            image={{
              image: image2
            }}
          />
        </Column>
        <Column width="66%">
          <Item
            num={3}
            image={{
              image: image3
            }}
          />
        </Column>
      </Row>
      <Row height="525px">
        <Column>
          <Item
            num={4}
            image={{
              image: image4
            }}
          />
        </Column>
      </Row>
      <Row height="270px">
        <Column width="47%">
          <Row>
            <Column>
              <Item
                styles={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </Column>
          </Row>
          <Row height="200px">
            <Column>
              <Item
                num={6}
                image={{
                  image: image6
                }}
              />
            </Column>
          </Row>
        </Column>
        <Column width="53%">
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

export default TraditionalKingswayPark;
