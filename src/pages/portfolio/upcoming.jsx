import React from 'react';

import constants from '../../../static/app-constants';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Row from '../../components/row';
import Column from '../../components/column';
import Item from '../../components/item';
import '../../scss/_layoutUpcoming.scss';

const { projects, upcomingProjectsOrder } = constants;

const UpcomingProject = (projectKey, index) => {
  const project = projects[projectKey];
  const height = project.beforeImageUrl ? 885 : 700;
  return (
    <React.Fragment key={index}>
      <Row height={`${height}px`} key={`${index}-image`}>
        <Column>
          <Item
            num={index}
            project={project}
            image={{
              imageUrl: project.mainImageUrl,
              backgroundPosition: '50% 25%',
              height
            }}
          />
          {project.beforeImageUrl && (
            <Item
              customClass="upcomingBefore"
              num={index}
              project={project}
              image={{
                imageUrl: project.beforeImageUrl,
                backgroundPosition: '50% 25%',
                height: 500
              }}
              text={{
                copy: 'Before'
              }}
            />
          )}
        </Column>
      </Row>
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
