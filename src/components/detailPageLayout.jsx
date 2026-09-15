import React from 'react';
import PropTypes from 'prop-types';

import constants from '../../static/app-constants';
import Layout from './layout';
import Seo from './seo';
import PrevNextProjectLinks from './prevNextProjectLinks';
import { renderLayoutTree } from './layoutTreeRenderer';

/**
 * @description Renders a project detail page from its layout data — the single source
 * of truth for that page, read from static/layouts/<slug>.js by both this component
 * and the admin tool's Layouts editor. Bound to one project (`projectKey`). Supports
 * both shapes seen across the live site: a single flat `layout` tree, or a
 * `defaultLayout`/`wideLayout` split like a listing page (each section then ends in
 * its own PrevNextProjectLinks, matching how those pages were originally hand-written).
 *
 * @param {Object} param
 * @param {string} param.mainClasses
 * @param {string} param.projectKey
 * @param {Object} param.tiles
 * @param {Array} [param.layout] - single-section pages
 * @param {string} [param.sectionClassName] - single-section pages
 * @param {Array} [param.defaultLayout] - dual-section pages
 * @param {Array} [param.wideLayout] - dual-section pages
 * @param {string} [param.defaultSectionClassName] - dual-section pages
 * @param {string} [param.wideSectionClassName] - dual-section pages
 * @param {Object} param.location
 */
const DetailPageLayout = ({
  mainClasses,
  projectKey,
  tiles,
  layout,
  sectionClassName,
  defaultLayout,
  wideLayout,
  defaultSectionClassName,
  wideSectionClassName,
  location
}) => {
  const project = constants.projects[projectKey];
  const isDual = Boolean(defaultSectionClassName);

  return (
    <Layout urlPath={location.pathname} mainClasses={mainClasses}>
      <Seo />
      {isDual ? (
        <>
          <section className={defaultSectionClassName}>
            {renderLayoutTree({ rows: defaultLayout, tiles, projects: constants.projects, boundProject: project })}
            <PrevNextProjectLinks project={project} />
          </section>
          <section className={wideSectionClassName}>
            {renderLayoutTree({ rows: wideLayout, tiles, projects: constants.projects, boundProject: project })}
            <PrevNextProjectLinks project={project} />
          </section>
        </>
      ) : (
        <section className={sectionClassName}>
          {renderLayoutTree({ rows: layout, tiles, projects: constants.projects, boundProject: project })}
          <PrevNextProjectLinks project={project} />
        </section>
      )}
    </Layout>
  );
};

DetailPageLayout.propTypes = {
  mainClasses: PropTypes.string.isRequired,
  projectKey: PropTypes.string.isRequired,
  tiles: PropTypes.object.isRequired,
  layout: PropTypes.array,
  sectionClassName: PropTypes.string,
  defaultLayout: PropTypes.array,
  wideLayout: PropTypes.array,
  defaultSectionClassName: PropTypes.string,
  wideSectionClassName: PropTypes.string,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
};

DetailPageLayout.defaultProps = {
  layout: undefined,
  sectionClassName: undefined,
  defaultLayout: undefined,
  wideLayout: undefined,
  defaultSectionClassName: undefined,
  wideSectionClassName: undefined
};

export default DetailPageLayout;
