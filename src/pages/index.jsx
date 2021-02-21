import React from 'react';

import constants from '../../static/app-constants';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Row from '../components/row';
import Column from '../components/column';
import Item from '../components/item';

import image1 from '../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../images/New-Homes/KingswayGeorgian-1.jpg';
import image3 from '../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../images/New-Homes/CreditRiver-1.jpg';
import image5 from '../images/Renovations-Additions/Etobicoke-2.jpg';
import image6 from '../images/Renovations-Additions/Lytton-Park-3.jpg';
import image7 from '../images/New-Homes/KingswayTransitional-1.jpg';
// import image8 from '../images/New-Homes/CreditRiver-9.jpg';
// import image9 from '../images/New-Homes/KingswayGeorgian-2.jpg';

const { projects, portfolio, defaultIntroductionText } = constants;

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <SEO />
    <section className="contentWrapper layoutAll layoutHome">
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
              height: '702.5px'
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
                  image: image3,
                }}
                styles={{
                  width: 'calc(21% - (1.5% * 2))',
                  height: '299.133px',
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
                  imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg'
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.creditRiverManor.type}/${projects.creditRiverManor.fileName}`
                }}
                text={{
                  copy: projects.creditRiverManor.projectName
                }}
                styles={{
                  width: 'calc(31% - (1.5% * 2))',
                  height: '299.133px'
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
            styles={{
              width: 'calc(52% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column width="48%">
          <Item
            num={6}
            project={projects.kingswayTransitional}
            image={{
              image: image7
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
      </Row>
      <Row>
        <Column width="36%">
          <Item
            num={7}
            project={projects.etobicokeArtsAndCrafts}
            image={{
              image: image5
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.etobicokeArtsAndCrafts.type}/${projects.etobicokeArtsAndCrafts.fileName}`
            }}
            text={{
              copy: projects.etobicokeArtsAndCrafts.projectName
            }}
            styles={{
              width: 'calc(36% - (1.5% * 2))',
              height: '345.874'
            }}
          />
        </Column>
        <Column width="64%">
          <Item
            num={8}
            project={projects.lyttonParkManor}
            image={{
              image: image6
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.lyttonParkManor.type}/${projects.lyttonParkManor.fileName}`
            }}
            text={{
              copy: projects.lyttonParkManor.projectName
            }}
            styles={{
              width: 'calc(64% - (1.5% * 2))',
              height: '345.874'
            }}
          />
        </Column>
      </Row>
      {/* <Row>
        <Column>
          <Item
            num={8}
            project={projects.creditRiverManor}
            image={{
              image: image8
            }}
            styles={{
              width: 'calc(21% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column>
          <Item
            num={9}
            project={projects.kingswayGeorgian}
            image={{
              image: image9
            }}
            styles={{
              width: 'calc(31% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
      </Row> */}
    </section>
  </Layout>
)

export default IndexPage
