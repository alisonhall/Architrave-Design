import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/row';
import Column from '../../components/column';
import Item from '../../components/item';

const { projects, portfolio, defaultIntroductionText } = constants;


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomes">
      <Row height="705px">
        <Column width="48%">
          <Item
            num={1}
            project={projects.hoggsHollowTraditional}
            image={{
              imageUrl: projects.hoggsHollowTraditional.mainImageUrl,
              backgroundPosition: '100% 0%',
              height: 705
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
          <Row height="370px">
            <Column>
              <Item
                num={2}
                project={projects.kingswayGeorgian}
                image={{
                  imageUrl: projects.kingswayGeorgian.mainImageUrl,
                  height: 370
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
                isFiller
                image={{
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347224/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/6-Banquette-seating_oe01cy.jpg',
                  height: 705 - 370
                }}
              />
            </Column>
            <Column width="60%">
              <Item
                num={4}
                project={projects.creditRiverManor}
                image={{
                  imageUrl: projects.creditRiverManor.mainImageUrl,
                  height: 705 - 370
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
        <Column width="48%">
          <Item
            num={5}
            project={projects.kingswayTransitional}
            image={{
              imageUrl: projects.kingswayTransitional.mainImageUrl,
              height: 300
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.kingswayTransitional.type}/${projects.kingswayTransitional.fileName}`
            }}
            text={{
              copy: projects.kingswayTransitional.projectName
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={6}
            project={projects.oakvilleExecutiveHome}
            image={{
              imageUrl: projects.oakvilleExecutiveHome.mainImageUrl,
              height: 300
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.oakvilleExecutiveHome.type}/${projects.oakvilleExecutiveHome.fileName}`
            }}
            text={{
              copy: projects.oakvilleExecutiveHome.projectName
            }}
          />
        </Column>
      </Row>
      <Row height="300px">
        <Column>
          <Item
            num={7}
            project={projects.classicCentreHall}
            image={{
              imageUrl: projects.classicCentreHall.mainImageUrl,
              height: 300
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.classicCentreHall.type}/${projects.classicCentreHall.fileName}`
            }}
            text={{
              copy: projects.classicCentreHall.projectName
            }}
          />
        </Column>
        <Column>
          <Item
            num={8}
            project={projects.hoggsHollowFrenchCountry}
            image={{
              imageUrl: projects.hoggsHollowFrenchCountry.mainImageUrl,
              height: 300
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.hoggsHollowFrenchCountry.type}/${projects.hoggsHollowFrenchCountry.fileName}`
            }}
            text={{
              copy: projects.hoggsHollowFrenchCountry.projectName
            }}
          />
        </Column>
        <Column>
          <Item
            num={9}
            project={projects.traditionalKingswayPark}
            image={{
              imageUrl: projects.traditionalKingswayPark.mainImageUrl,
              backgroundPosition: '30% 40%',
              height: 300
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.traditionalKingswayPark.type}/${projects.traditionalKingswayPark.fileName}`
            }}
            text={{
              copy: projects.traditionalKingswayPark.projectName
            }}
          />
        </Column>
      </Row>
    </section>
  </Layout>
)

export default NewHomes
