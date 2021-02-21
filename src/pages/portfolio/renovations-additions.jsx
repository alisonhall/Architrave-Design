import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/row';
import Column from '../../components/column';
import Item from '../../components/item';

import image1 from '../../images/Renovations-Additions/Lytton-Park-4.jpg';
import image2 from '../../images/Renovations-Additions/Etobicoke-2.jpg';
import image3 from '../../images/Renovations-Additions/Cornwall-1.jpg';
import image4 from '../../images/Renovations-Additions/Rosedale-2.jpg';
// import image5 from '../../images/Renovations-Additions/Lorne-Park-4.jpg';

const { projects, portfolio, defaultIntroductionText } = constants;


const RenovationsAdditions = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutRenovations">
      <Row>
        <Column width="48%">
          <Item
            num={1}
            project={projects.lyttonParkManor}
            image={{
              image: image1,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.lyttonParkManor.type}/${projects.lyttonParkManor.fileName}`
            }}
            text={{
              copy: projects.lyttonParkManor.projectName
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '645px'
            }}
          />
        </Column>
        <Column width="52%">
          <Row>
            <Column>
              <Item
                num={2}
                project={projects.princessMargaretModern}
                image={{
                  imageUrl: projects.princessMargaretModern.mainImageUrl,
                  backgroundPosition: '50% 30%'
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.princessMargaretModern.type}/${projects.princessMargaretModern.fileName}`
                }}
                text={{
                  copy: projects.princessMargaretModern.projectName
                }}
                styles={{
                  width: 'calc(52% - (1.5% * 2))',
                  height: '345px'
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Item
                num={3}
                project={projects.upperCanadaFarmhouse}
                image={{
                  image: image3,
                  backgroundPosition: '50% 40%'
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.upperCanadaFarmhouse.type}/${projects.upperCanadaFarmhouse.fileName}`
                }}
                text={{
                  copy: projects.upperCanadaFarmhouse.projectName
                }}
                styles={{
                  width: 'calc(52% - (1.5% * 2))',
                  height: '265px'
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
            num={4}
            project={projects.rosedaleEdwardian}
            image={{
              image: image4,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.rosedaleEdwardian.type}/${projects.rosedaleEdwardian.fileName}`
            }}
            text={{
              copy: projects.rosedaleEdwardian.projectName
            }}
            styles={{
              width: 'calc(48% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={5}
            project={projects.etobicokeArtsAndCrafts}
            image={{
              image: image2,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.etobicokeArtsAndCrafts.type}/${projects.etobicokeArtsAndCrafts.fileName}`
            }}
            text={{
              copy: projects.etobicokeArtsAndCrafts.projectName
            }}
            styles={{
              width: 'calc(52% - (1.5% * 2))',
              height: '300px'
            }}
          />
        </Column>
      </Row>
    </section>
  </Layout>
)

export default RenovationsAdditions
