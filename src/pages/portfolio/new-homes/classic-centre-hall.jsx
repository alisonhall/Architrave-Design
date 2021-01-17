import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.classicCentreHall;

const ClassicCentreHall = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="332px">
        <Column>
          <Item
            num={1}
            image={{
              imageFolder: project.imageFolder,
              imageName: '1b-Cut-Stone-Facade_rkbnlo.jpg'
            }}
            styles={{
              width: 'calc(50% - (1.5% * 2))',
              height: '332px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={2}
            image={{
              imageFolder: project.imageFolder,
              imageName: '2-Limestone-Detail_l6fs59.jpg'
            }}
            styles={{
              width: 'calc(50% - (1.5% * 2))',
              height: '332px'
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
      <Row height="200px">
        <Column>
          <Item
            num={3}
            image={{
              imageFolder: project.imageFolder,
              imageName: '3-Two-Storey-Main-Hall_ejywhy.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={4}
            image={{
              imageFolder: project.imageFolder,
              imageName: '4-Custom-Kitchen_odkxdb.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={5}
            image={{
              imageFolder: project.imageFolder,
              imageName: '5-Family-Room_gdmmua.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
      </Row>
      <Row height="200px">
        <Column>
          <Item
            num={6}
            image={{
              imageFolder: project.imageFolder,
              imageName: '6-Mudroom_lkonse.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={7}
            image={{
              imageFolder: project.imageFolder,
              imageName: '7-Upper_Hall_mvytmk.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={8}
            image={{
              imageFolder: project.imageFolder,
              imageName: '10-Home-Office_aozszs.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
      </Row>
      <Row height="200px">
        <Column>
          <Item
            num={9}
            image={{
              imageFolder: project.imageFolder,
              imageName: '8-Master-Bedroom_l9mlyp.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={10}
            image={{
              imageFolder: project.imageFolder,
              imageName: '9-Master-Ensuite_ce0yej.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={11}
            image={{
              imageFolder: project.imageFolder,
              imageName: '11-Jack_n_Jill-Vanities_btkar8.jpg'
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '200px'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default ClassicCentreHall;
