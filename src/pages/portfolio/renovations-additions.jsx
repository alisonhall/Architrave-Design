import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/row';
import Column from '../../components/column';
import Item from '../../components/item';

const { projects, portfolio, defaultIntroductionText } = constants;


const RenovationsAdditions = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutRenovations">
      <Row height="645px">
        <Column width="48%">
          <Item
            num={1}
            project={projects.lyttonParkManor}
            image={{
              imageUrl: projects.lyttonParkManor.mainImageUrl,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.lyttonParkManor.type}/${projects.lyttonParkManor.fileName}`
            }}
            text={{
              copy: projects.lyttonParkManor.projectName
            }}
          />
        </Column>
        <Column width="52%">
          <Row height="345px">
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
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Item
                num={3}
                project={projects.upperCanadaFarmhouse}
                image={{
                  imageUrl: projects.upperCanadaFarmhouse.mainImageUrl,
                  backgroundPosition: '50% 40%'
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.upperCanadaFarmhouse.type}/${projects.upperCanadaFarmhouse.fileName}`
                }}
                text={{
                  copy: projects.upperCanadaFarmhouse.projectName
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
            num={4}
            project={projects.rosedaleEdwardian}
            image={{
              imageUrl: projects.rosedaleEdwardian.mainImageUrl,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.rosedaleEdwardian.type}/${projects.rosedaleEdwardian.fileName}`
            }}
            text={{
              copy: projects.rosedaleEdwardian.projectName
            }}
          />
        </Column>
        <Column width="52%">
          <Item
            num={5}
            project={projects.etobicokeArtsAndCrafts}
            image={{
              imageUrl: projects.etobicokeArtsAndCrafts.mainImageUrl,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.etobicokeArtsAndCrafts.type}/${projects.etobicokeArtsAndCrafts.fileName}`
            }}
            text={{
              copy: projects.etobicokeArtsAndCrafts.projectName
            }}
          />
        </Column>
      </Row>
    </section>
  </Layout>
)

export default RenovationsAdditions
