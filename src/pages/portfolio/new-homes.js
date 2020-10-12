import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/row';
import Column from '../../components/column';
import Item from '../../components/item';

import image1 from '../../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../../images/New-Homes/KingswayGeorgian-1.jpg';
import image3 from '../../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../../images/New-Homes/CreditRiver-1.jpg';
import image5 from '../../images/New-Homes/KingswayTransitional-1.jpg';
import image6 from '../../images/New-Homes/Oakville-1.jpg';
import image7 from '../../images/New-Homes/FrenchCountry-4.jpg';
import image8 from '../../images/New-Homes/KingswayTraditional-1.jpg';

const { projects, portfolio, defaultIntroductionText } = constants;


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomes">
      <Row>
        <Column width="48%">
          <Item
            num={1}
            project={projects.hoggsHollowTraditional}
            image={{
              image: image1,
              backgroundPosition: '100% 0%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.hoggsHollowTraditional.type}/${projects.hoggsHollowTraditional.fileName}`
            }}
            text={{
              copy: projects.hoggsHollowTraditional.projectName
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '705.5px'
            }}
          />
        </Column>
        <Column width="52%">
          <Row>
            <Column>
              <Item
                num={2}
                project={projects.kingswayGeorgian}
                image={{
                  image: image2
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.kingswayGeorgian.type}/${projects.kingswayGeorgian.fileName}`
                }}
                text={{
                  copy: projects.kingswayGeorgian.projectName
                }}
                styles={{
                  width: 'calc(52% - (1.5% * 2))',
                  height: '370.29px'
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
                  image: image3
                }}
                styles={{
                  width: 'calc(21% - (1.5% * 2))',
                  height: '299.133px'
                }}
              />
            </Column>
            <Column width="60%">
              <Item
                num={4}
                project={projects.creditRiverClassic}
                image={{
                  image: image4
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.creditRiverClassic.type}/${projects.creditRiverClassic.fileName}`
                }}
                text={{
                  copy: projects.creditRiverClassic.projectName
                }}
                styles={{
                  width: 'calc(31% - (1.5% * 2))',
                  height: '299.133'
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
      <Row>
        <Column width="48%">
          <Item
            num={5}
            project={projects.kingswayTransitional}
            image={{
              image: image5
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.kingswayTransitional.type}/${projects.kingswayTransitional.fileName}`
            }}
            text={{
              copy: projects.kingswayTransitional.projectName
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={6}
            project={projects.oakvilleExecutiveHome}
            image={{
              image: image6
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.oakvilleExecutiveHome.type}/${projects.oakvilleExecutiveHome.fileName}`
            }}
            text={{
              copy: projects.oakvilleExecutiveHome.projectName
            }}
            styles={{
              width: 'calc(52% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Item
            num={7}
            project={projects.classicCentreHall}
            image={{
              imageFolder: projects.classicCentreHall.imageFolder,
              imageName: '1b-Cut-Stone-Facade_rkbnlo.jpg'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.classicCentreHall.type}/${projects.classicCentreHall.fileName}`
            }}
            text={{
              copy: projects.classicCentreHall.projectName
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={8}
            project={projects.hoggsHollowFrenchCountry}
            image={{
              image: image7
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.hoggsHollowFrenchCountry.type}/${projects.hoggsHollowFrenchCountry.fileName}`
            }}
            text={{
              copy: projects.hoggsHollowFrenchCountry.projectName
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={9}
            project={projects.kingswayTraditional}
            image={{
              image: image8,
              backgroundPosition: '30% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.kingswayTraditional.type}/${projects.kingswayTraditional.fileName}`
            }}
            text={{
              copy: projects.kingswayTraditional.projectName
            }}
            styles={{
              width: 'calc(33.3% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
      </Row>
    </section>
  </Layout>
)

export default NewHomes
