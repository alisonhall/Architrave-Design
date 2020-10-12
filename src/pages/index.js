import React from 'react';

import constants from '../../static/app-constants';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Item from '../components/item';
import ImageFillerTile from '../components/imageFillerTile';

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
      {/* <Item
        num={3}
        project={projects.kingswayTransitional}
        image={{
          image: image3,
        }}
        styles={{
          width: 'calc(21% - (1.5% * 2))',
          height: '299.133px',
          float: 'left'
        }}
      /> */}
      <ImageFillerTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(21% - (1.5% * 2))',
        height: 'calc(500px * 0.598266)'
      }} />
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
          height: '299.133px'
        }}
      />
      <Item
        text={{
          copy: defaultIntroductionText
        }}
      />
      <Item
        num={5}
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
          width: 'calc(52% - (1.5% * 2))',
          height: '300px'
        }}
      />
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
      <Item
        num={7}
        project={projects.etobicokeRenewal}
        image={{
          image: image5
        }}
        link={{
          linkUrl: `/${portfolio}/${projects.etobicokeRenewal.type}/${projects.etobicokeRenewal.fileName}`
        }}
        text={{
          copy: projects.etobicokeRenewal.projectName
        }}
        styles={{
          width: 'calc(36% - (1.5% * 2))',
          height: '345.874'
        }}
      />
      <Item
        num={8}
        project={projects.lyttonParkUpdate}
        image={{
          image: image6
        }}
        link={{
          linkUrl: `/${portfolio}/${projects.lyttonParkUpdate.type}/${projects.lyttonParkUpdate.fileName}`
        }}
        text={{
          copy: projects.lyttonParkUpdate.projectName
        }}
        styles={{
          width: 'calc(64% - (1.5% * 2))',
          height: '345.874'
        }}
      />
      {/* <Item
        num={8}
        project={projects.creditRiverClassic}
        image={{
          image: image8
        }}
        styles={{
          width: 'calc(21% - (1.5% * 2))',
          height: '300px'
        }}
      />
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
      /> */}
    </section>
  </Layout>
)

export default IndexPage
