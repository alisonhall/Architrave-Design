import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Row from '../../../components/row';
import Column from '../../../components/column';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.creditRiverManor;

const CreditRiverManor = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Row height="380px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg',
              height: 380
            }}
          />
        </Column>
        <Column>
          <Item
            num={2}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592704/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_2_dzqicp.jpg',
              height: 380
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
      <Row height="380px">
        <Column width="50%">
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592703/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_4_jt4uq1.jpg',
              height: 380
            }}
          />
        </Column>
        <Column width="25%">
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/3-Two-Story-Front-Foyer_lkcpir.jpg',
              height: 380
            }}
          />
        </Column>
        <Column width="25%">
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg',
              height: 380
            }}
          />
        </Column>
      </Row>
      <Row height="290px">
        <Column width="38%">
          <Item
            num={6}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/2-Front-Foyer_y8wodd.jpg',
              height: 290
            }}
          />
        </Column>
        <Column width="24%">
          <Item
            num={7}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347190/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/7-Hallway-Arch_nsi6eb.jpg',
              height: 290
            }}
          />
        </Column>
        <Column width="38%">
          <Item
            num={8}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/5-Sitting-Room_dt8nwa.jpg',
              height: 290
            }}
          />
        </Column>
      </Row>
      <Row height="230px">
        <Column>
          <Item
            num={9}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347192/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/6-Dining-Room_n7r1av.jpg',
              height: 230
            }}
          />
        </Column>
        <Column>
          <Item
            num={10}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/9-Kitchen-_-Breakfast-Bay_k8qrcz.jpg',
              height: 230
            }}
          />
        </Column>
        <Column>
          <Item
            num={11}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/8-Family-Room-with-Custom-Mantel_vvgqso.jpg',
              height: 230
            }}
          />
        </Column>
      </Row>
      <Row height="290px">
        <Column width=" 20%">
          <Item
            num={12}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/11-Upper-Hall_yfoloe.jpg',
              height: 290
            }}
          />
        </Column>
        <Column width="45%">
          <Item
            num={13}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347210/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/12-Vaulted-Master_z9t3hj.jpg',
              height: 290
            }}
          />
        </Column>
        <Column width="35%">
          <Item
            num={14}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/13-Bedroom_nesbsz.jpg',
              height: 290
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default CreditRiverManor;
