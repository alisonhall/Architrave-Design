import React from 'react';
import PropTypes from 'prop-types';

import constants from '../../static/app-constants';
import Layout from './layout';
import Seo from './seo';
import { renderLayoutTree } from './layoutTreeRenderer';

const { projects, defaultIntroductionText } = constants;

/**
 * @description Renders a portfolio listing page (index, new-homes,
 * renovations-additions) from its layout data — the single source of truth for that
 * page, read from static/layouts/<slug>.js by both this component and the admin tool's
 * Layouts editor. See layoutTreeRenderer.jsx for how the tiles/rows are resolved.
 *
 * @param {Object} param
 * @param {string} param.mainClasses
 * @param {string} param.defaultSectionClassName
 * @param {string} param.wideSectionClassName
 * @param {Object} param.tiles
 * @param {Array} param.defaultLayout
 * @param {Array} param.wideLayout
 * @param {Object} param.location
 */
const ListingPageLayout = ({
  mainClasses,
  defaultSectionClassName,
  wideSectionClassName,
  tiles,
  defaultLayout,
  wideLayout,
  location
}) => (
  <Layout urlPath={location.pathname} mainClasses={mainClasses}>
    <Seo />
    <section className={defaultSectionClassName}>
      {renderLayoutTree({ rows: defaultLayout, tiles, projects, introText: defaultIntroductionText })}
    </section>
    <section className={wideSectionClassName}>
      {renderLayoutTree({ rows: wideLayout, tiles, projects, introText: defaultIntroductionText })}
    </section>
  </Layout>
);

ListingPageLayout.propTypes = {
  mainClasses: PropTypes.string.isRequired,
  defaultSectionClassName: PropTypes.string.isRequired,
  wideSectionClassName: PropTypes.string.isRequired,
  tiles: PropTypes.object.isRequired,
  defaultLayout: PropTypes.array.isRequired,
  wideLayout: PropTypes.array.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
};

export default ListingPageLayout;
