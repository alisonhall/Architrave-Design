import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/row';
import Column from '../../components/column';
import Item from '../../components/item';

const { projects, upcomingProjectsOrder, defaultUpcomingImageFolder } = constants;

const UpcomingProject = (projectKey, index) => {
  const project = projects[projectKey];
  return (
    <React.Fragment key={index}>
      <Row height="700px" key={`${index}-image`}>
        <Column>
          <Item
            num={index}
            project={project}
            image={{
              imageUrl: project.mainImageUrl,
              backgroundPosition: '50% 25%',
              imageModifier: 'h_700,c_scale,f_auto,q_auto'
            }}
            styles={{
              width: 'calc(100% - (1.5% * 2))',
              height: '700px'
            }}
          />
        </Column>
      </Row>
      {project.beforeImageUrl && (
        <Row height="700px" key={`${index}-before`}>
          <Column>
            <Item
              num={index}
              project={project}
              image={{
                imageUrl: project.beforeImageUrl,
                backgroundPosition: '50% 25%',
                imageModifier: 'h_500,c_scale,f_auto,q_auto'
              }}
              styles={{
                width: 'calc(45% - (1.5% * 2))',
                height: '170px',
                float: 'right',
                marginTop: '-115px !important'
              }}
            />
          </Column>
        </Row>
      )}
      <Row key={`${index}-text`}>
        <Column>
          <section className="textBlurb">
            <p className="textOverlay">{project.projectName}</p>
            {project.completion ? (<p className="completionDate">{project.completion}</p>) : null}
          </section>
        </Column>
      </Row>
    </React.Fragment>
  );
}

const Upcoming = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio upcoming">
    <SEO />
    <section className="contentWrapper layoutAll layoutUpcoming">
      {upcomingProjectsOrder.map(UpcomingProject)}
    </section>
  </Layout>
)

export default Upcoming
