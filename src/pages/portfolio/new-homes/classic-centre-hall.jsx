import React from 'react';

import constants from '../../../../static/app-constants';

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
    <section className="contentWrapper layoutAll layoutProject defaultLayout">
      <Row height="332px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg',
              height: 332
            }}
          />
        </Column>
        <Column>
          <Item
            num={2}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/2-Limestone-Detail_l6fs59.jpg',
              height: 332
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
      <Row height="300px">
        <Column>
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/3-Two-Storey-Main-Hall_ejywhy.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/4-Custom-Kitchen_odkxdb.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/5-Family-Room_gdmmua.jpg',
              height: 300
            }}
          />
        </Column>
      </Row>
      <Row height="300px">
        <Column>
          <Item
            num={6}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/6-Mudroom_lkonse.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={7}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/7-Upper_Hall_mvytmk.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={8}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/10-Home-Office_aozszs.jpg',
              height: 300
            }}
          />
        </Column>
      </Row>
      <Row height="300px">
        <Column>
          <Item
            num={9}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/8-Master-Bedroom_l9mlyp.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={10}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/9-Master-Ensuite_ce0yej.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={11}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/11-Jack_n_Jill-Vanities_btkar8.jpg',
              height: 300
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
    <section className="contentWrapper layoutAll layoutProject wideLayout">
      <Row height="450px">
        <Column>
          <Item
            num={1}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg',
              height: 450
            }}
          />
        </Column>
        <Column>
          <Item
            num={2}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/2-Limestone-Detail_l6fs59.jpg',
              height: 450
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
      <Row height="300px">
        <Column>
          <Item
            num={3}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/3-Two-Storey-Main-Hall_ejywhy.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={4}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/4-Custom-Kitchen_odkxdb.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={5}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/5-Family-Room_gdmmua.jpg',
              height: 300
            }}
          />
        </Column>
      </Row>
      <Row height="300px">
        <Column>
          <Item
            num={6}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/6-Mudroom_lkonse.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={7}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/7-Upper_Hall_mvytmk.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={8}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/10-Home-Office_aozszs.jpg',
              height: 300
            }}
          />
        </Column>
      </Row>
      <Row height="300px">
        <Column>
          <Item
            num={9}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/8-Master-Bedroom_l9mlyp.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={10}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/9-Master-Ensuite_ce0yej.jpg',
              height: 300
            }}
          />
        </Column>
        <Column>
          <Item
            num={11}
            image={{
              imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/11-Jack_n_Jill-Vanities_btkar8.jpg',
              height: 300
            }}
          />
        </Column>
      </Row>
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default ClassicCentreHall;
