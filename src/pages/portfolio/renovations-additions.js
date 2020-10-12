import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
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
          text: projects.lyttonParkUpdate.projectName
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '645px'
        }}
      />
      <Item
        num={2}
        project={projects.princessMargaretFacelift}
        image={{
          imageFolder: projects.princessMargaretFacelift.imageFolder,
          imageName: 'Princess_Margaret_Transitional1_yp7fuo.jpg',
          backgroundPosition: '50% 30%'
        }}
        link={{
          linkUrl: `/${portfolio}/${projects.princessMargaretFacelift.type}/${projects.princessMargaretFacelift.fileName}`
        }}
        text={{
          text: projects.princessMargaretFacelift.projectName
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '345px'
        }}
      />
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
          text: projects.cornwallHeritageAddition.projectName
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '265px'
        }}
      />
      <Item
        text={{
          copy: defaultIntroductionText
        }}
      />
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
          text: projects.rosedaleRevival.projectName
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '300px'
        }}
      />
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
          text: projects.etobicokeRenewal.projectName
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '300px'
        }}
      />
    </section>
  </Layout>
)

export default RenovationsAdditions
