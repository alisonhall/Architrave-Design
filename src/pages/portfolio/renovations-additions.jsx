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
            project={projects.lyttonParkUpdate}
            image={{
              image: image1,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.lyttonParkUpdate.type}/${projects.lyttonParkUpdate.fileName}`
            }}
            text={{
              copy: projects.lyttonParkUpdate.projectName
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
                project={projects.princessMargaretFacelift}
                image={{
                  imageFolder: projects.princessMargaretFacelift.imageFolder,
                  imageName: '2-Addition-_-_Re-facing_xddgjt.jpg',
                  backgroundPosition: '50% 30%'
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.princessMargaretFacelift.type}/${projects.princessMargaretFacelift.fileName}`
                }}
                text={{
                  copy: projects.princessMargaretFacelift.projectName
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
                project={projects.cornwallHeritageAddition}
                image={{
                  image: image3,
                  backgroundPosition: '50% 40%'
                }}
                link={{
                  linkUrl: `/${portfolio}/${projects.cornwallHeritageAddition.type}/${projects.cornwallHeritageAddition.fileName}`
                }}
                text={{
                  copy: projects.cornwallHeritageAddition.projectName
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
            project={projects.rosedaleRevival}
            image={{
              image: image4,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.rosedaleRevival.type}/${projects.rosedaleRevival.fileName}`
            }}
            text={{
              copy: projects.rosedaleRevival.projectName
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
            project={projects.etobicokeRenewal}
            image={{
              image: image2,
              backgroundPosition: '50% 40%'
            }}
            link={{
              linkUrl: `/${portfolio}/${projects.etobicokeRenewal.type}/${projects.etobicokeRenewal.fileName}`
            }}
            text={{
              copy: projects.etobicokeRenewal.projectName
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
