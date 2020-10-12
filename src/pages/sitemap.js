import React from 'react';
import { Link } from 'gatsby';

import constants from '../../static/app-constants';

import Layout from '../components/layout';
import SEO from '../components/seo';

const { projects, projectTypes, portfolio, newProjectsOrder, renovationProjectsOrder, unusedNewProjects, unusedRenovationProjects } = constants;

const buildProjectLink = (projectKey, index) => {
  const project = projects[projectKey];
  return (
    <li key={index}>
      <Link to={`/${portfolio}/${project.type}/${project.fileName}`}>{project.projectName}</Link>
    </li>
  );
}

const Sitemap = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="sitemap">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textContent">
          <h3>Site Map</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <p>Portfolio</p>
              <ul>
                <li>
                  <Link to={`/${portfolio}/${projectTypes.new}`}>New Homes</Link>
                  <ul>
                    {[...newProjectsOrder, ...unusedNewProjects].map(buildProjectLink)}
                  </ul>
                </li>
                <li>
                  <Link to={`/${portfolio}/${projectTypes.renovations}`}>Renovations</Link>
                  <ul>
                    {[...renovationProjectsOrder, ...unusedRenovationProjects].map(buildProjectLink)}
                  </ul>
                </li>
                <li>
                  <Link to={`/${portfolio}/${projectTypes.upcoming}`}>Upcoming</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/sitemap">Site Map</Link>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </Layout>
)

export default Sitemap
