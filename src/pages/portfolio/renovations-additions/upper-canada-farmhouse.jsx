import React from 'react';

import constants from '../../../../static/app-constants';

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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/1-1820_s-Farmhouse-_-New-Addition_qh1ha2.jpg'
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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347367/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/2-Side-Entrance_smshkr.jpg'
            }}
          />
        </Column>
        <Column width="38%">
          <Row height="485px">
            <Column>
              <Item
                num={3}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347367/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/3c-Entrance-Hall_szk4bq.jpg'
                }}
              />
            </Column>
          </Row>
          <Row height="290px">
            <Column>
              <Item
                num={4}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/4-Country-Kitchen-Dining-Room_iqgnfl.jpg'
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
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347370/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/6-Master-Fireplace_wjx75m.jpg'
            }}
          />
        </Column>
        <Column width="38%">
          <Item
            num={6}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347364/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/7-Ensuite_wb7epo.jpg'
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default UpperCanadaFarmhouse;
