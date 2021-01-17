import React from 'react';

import constants from '../../../../public/app-constants';
import image1 from '../../../images/Renovations-Additions/Cornwall-1.jpg';
import image2 from '../../../images/Renovations-Additions/Cornwall-2.jpg';
import image3 from '../../../images/Renovations-Additions/Cornwall-3.jpg';
import image4 from '../../../images/Renovations-Additions/Cornwall-4.jpg';
import image5 from '../../../images/Renovations-Additions/Cornwall-5.jpg';
import image6 from '../../../images/Renovations-Additions/Cornwall-6.jpg';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.upperCanadaFarmhouse;

const UpperCanadaFarmhouse = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="620px">
        <Column>
          <Item
            num={1}
            image={{
              image: image1
            }}
            styles={{
              width: 'calc(100% - (1.5% * 2))',
              height: '620px'
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
      <Row height="810px">
        <Column width="62%">
          <Item
            num={2}
            image={{
              image: image2
            }}
            styles={{
              width: 'calc(62% - (1.5% * 2))',
              height: '810px'
            }}
          />
        </Column>
        <Column width="38%">
          <Row height="485px">
            <Column>
              <Item
                num={3}
                image={{
                  image: image3
                }}
                styles={{
                  width: 'calc(38% - (1.5% * 2))',
                  height: '485px'
                }}
              />
            </Column>
          </Row>
          <Row height="290px">
            <Column>
              <Item
                num={4}
                image={{
                  image: image4
                }}
                styles={{
                  width: 'calc(38% - (1.5% * 2))',
                  height: '290px'
                }}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row height="350px">
        <Column width="62%">
          <Item
            num={5}
            image={{
              image: image5
            }}
            styles={{
              width: 'calc(62% - (1.5% * 2))',
              height: '350px'
            }}
          />
        </Column>
        <Column width="38%">
          <Item
            num={6}
            image={{
              image: image6
            }}
            styles={{
              width: 'calc(38% - (1.5% * 2))',
              height: '350px'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default UpperCanadaFarmhouse;
