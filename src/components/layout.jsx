import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Navigation from './navigation';
import Footer from './footer';
import '../scss/style.scss'

/**
 * @description The layout of all of the pages. Includes the header, navigation, body, and footer.
 * 
 * @param {Object} param
 * @param {Node} param.children
 * @param {string} param.mainClasses
 * @param {string} param.urlPath
 */
const Layout = ({ children, mainClasses, urlPath }) => (
  <>
    <Header />
    <Navigation urlPath={urlPath} />
    <div className={mainClasses}>
      <main>{children}</main>
      <Footer />
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  mainClasses: PropTypes.string,
  urlPath: PropTypes.string.isRequired
}

export default Layout
