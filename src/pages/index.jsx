import React from 'react';

import constants from '../../static/app-constants';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Row from '../components/row';
import Column from '../components/column';
import Item from '../components/item';

const { projects, portfolio, defaultIntroductionText } = constants;

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <SEO />
    <section className="contentWrapper layoutAll layoutHome">
      <Row height="702px">
        <Column width="48%">
          <Item
            num={1}
            project={projects.hoggsHollowTraditional}
            image={{
              imageUrl: projects.hoggsHollowTraditional.mainImageUrl,
              backgroundPosition: '100% 0%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.hoggsHollowTraditional.type}/${projects.hoggsHollowTraditional.fileName}`
            }}
            text={{
              copy: projects.hoggsHollowTraditional.projectName
            }}
          />
        </Column>
        <Column width="52%">
          <Row height="55%">
            <Column>
              <Item
                num={2}
                project={projects.kingswayGeorgian}
                image={{
                  imageUrl: projects.kingswayGeorgian.mainImageUrl
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.kingswayGeorgian.type}/${projects.kingswayGeorgian.fileName}`
                }}
                text={{
                  copy: projects.kingswayGeorgian.projectName
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column width="40%">
              <Item
                num={3}
                project={projects.kingswayTransitional}
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347224/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/6-Banquette-seating_oe01cy.jpg',
                }}
              />
              {/* <ImageFillerTile dataItem={{
                num: '3',
                image: image3,
                width: 'calc(21% - (1.5% * 2))',
                height: 'calc(500px * 0.598266)'
              }} /> */}
            </Column>
            <Column width="60%">
              <Item
                num={4}
                project={projects.creditRiverManor}
                image={{
                  imageUrl: projects.creditRiverManor.mainImageUrl
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.creditRiverManor.type}/${projects.creditRiverManor.fileName}`
                }}
                text={{
                  copy: projects.creditRiverManor.projectName
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
              copy: defaultIntroductionText
            }}
          />
        </Column>
      </Row>
      <Row height="300px">
        <Column width="52%">
          <Item
            num={5}
            project={projects.classicCentreHall}
            image={{
              imageUrl: projects.classicCentreHall.mainImageUrl
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.classicCentreHall.type}/${projects.classicCentreHall.fileName}`
            }}
            text={{
              copy: projects.classicCentreHall.projectName
            }}
          />
        </Column>
        <Column width="48%">
          <Item
            num={6}
            project={projects.kingswayTransitional}
            image={{
              imageUrl: projects.kingswayTransitional.mainImageUrl
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.kingswayTransitional.type}/${projects.kingswayTransitional.fileName}`
            }}
            text={{
              copy: projects.kingswayTransitional.projectName
            }}
          />
        </Column>
      </Row>
      <Row height="345px">
        <Column width="36%">
          <Item
            num={7}
            project={projects.etobicokeArtsAndCrafts}
            image={{
              imageUrl: projects.etobicokeArtsAndCrafts.mainImageUrl
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.etobicokeArtsAndCrafts.type}/${projects.etobicokeArtsAndCrafts.fileName}`
            }}
            text={{
              copy: projects.etobicokeArtsAndCrafts.projectName
            }}
          />
        </Column>
        <Column width="64%">
          <Item
            num={8}
            project={projects.lyttonParkManor}
            image={{
              imageUrl: projects.lyttonParkManor.mainImageUrl
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.lyttonParkManor.type}/${projects.lyttonParkManor.fileName}`
            }}
            text={{
              copy: projects.lyttonParkManor.projectName
            }}
          />
        </Column>
      </Row>
      {/* <Row>
        <Column>
          <Item
            num={9}
            project={projects.creditRiverManor}
            image={{
              imageUrl: projects.creditRiverManor.mainImageUrl
            }}
            styles={{
              height: '300px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={10}
            project={projects.kingswayGeorgian}
            image={{
              imageUrl: projects.kingswayGeorgian.mainImageUrl
            }}
            styles={{
              height: '300px'
            }}
          />
        </Column>
      </Row> */}
    </section>
  </Layout>
)

export default IndexPage
