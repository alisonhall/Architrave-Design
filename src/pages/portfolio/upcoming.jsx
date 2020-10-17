import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Item from '../../components/item';

// import image1 from '../../images/Upcoming/Oakville-New-Home-01.jpg';
import image2 from '../../images/Upcoming/StGeorges-GC.jpg';
// import image3 from '../../images/Upcoming/King-Georges6.jpg';
import image4 from '../../images/Upcoming/Before-StGeorges.jpg';

const { projects } = constants;

const Upcoming = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio upcoming">
    <SEO />
    <section className="contentWrapper layoutAll layoutUpcoming">
      <Item
        num={5}
        project={projects.kingswayClassic}
        image={{
          imageFolder: projects.kingswayClassic.imageFolder,
          imageName: '_Kingsway_Classic_hpwrk4.jpg',
          backgroundPosition: '50% 25%'
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '700px'
        }}
      />
      <section className="textBlurb">
        <p className="textOverlay">{projects.kingswayClassic.projectName}</p>
        {projects.kingswayClassic.completion ? (<p className="completionDate">{projects.kingswayClassic.completion}</p>) : null}
      </section>
      <Item
        num={2}
        project={projects.stGeorgesRebuild}
        image={{
          image: image2,
          backgroundPosition: '50% 80%'
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: '400px'
        }}
      />
      <Item
        num={4}
        project={projects.stGeorgesRebuild}
        image={{
          image: image4,
          backgroundPosition: '50% 80%'
        }}
        styles={{
          width: 'calc(45% - (1.5% * 2))',
          height: '170px',
          float: 'right',
          marginTop: '-115px !important'
        }}
      />
      <section className="textBlurb">
        <p className="textOverlay">{projects.stGeorgesRebuild.projectName}</p>
        {projects.stGeorgesRebuild.completion ? (<p className="completionDate">{projects.stGeorgesRebuild.completion}</p>) : null}
      </section>
    </section>
  </Layout>
)

export default Upcoming
