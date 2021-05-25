import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './navigation.scss';
import constants from '../../static/app-constants';
import Header from './header';

import architraveLogo from '../images/ArchitraveNewLogo.jpg';
import houzzLogo from '../images/HouzzH.png';
import bestOfHouzz from '../images/best-of-houzz.png';

const { portfolio, projectTypes, houzz } = constants;

/**
 * @description The navigation sidebar and the logo.
 * 
 * @param {Object} param
 * @param {string} param.urlPath
 */
const Navigation = ({urlPath}) => {
  const subNavVisible = (urlPath.indexOf(portfolio) >= 0) ? 'subNavVisible' : '';
  const isNewHomes = (urlPath.indexOf(projectTypes.new) >= 0) ? 'selected' : '';
  const isRenovationsAdditions = (urlPath.indexOf(projectTypes.renovations) >= 0) ? 'selected' : '';
  return (
  <aside>
    <Link to="/" className="logo-link">
      <img id="logo" src={architraveLogo} alt="Architrave Design, Architect logo" />
    </Link>
    <nav>
      <Header className="side" />
      <ul className="mainNav">
        <li>
          <Link to={`/${portfolio}/${projectTypes.new}`} className="portfolioNav">Portfolio</Link>
        </li>
        <ul className={`subNav ${subNavVisible}`}>
          <li>
            <Link to={`/${portfolio}/${projectTypes.new}`} activeClassName="selected" className={isNewHomes}>New Homes</Link>
          </li>
          <li>
            <Link to={`/${portfolio}/${projectTypes.renovations}`} activeClassName="selected" className={isRenovationsAdditions}>Renovations</Link>
          </li>
          <li>
            <Link to={`/${portfolio}/${projectTypes.upcoming}`} activeClassName="selected">Upcoming</Link>
          </li>
        </ul>
        <li>
          <Link to="/about" activeClassName="selected">About</Link>
        </li>
        <li>
          <Link to="/reviews" activeClassName="selected">Reviews</Link>
        </li>
        <li>
          <Link to="/contact" activeClassName="selected">Contact</Link>
        </li>
      </ul>
    </nav>
    <div className="houzz-badges">
      <a className="houzz-badge houzz-logo" title="Architrave Design on Houzz" href={houzz.url}>
        <img src={houzzLogo} alt="Houzz logo" />
      </a>
      <a className="houzz-badge best-of-houzz" title="Best of Houzz 2021" href={houzz.url}>
        <img src={bestOfHouzz} alt="Best of Houzz 2021 badge" />
      </a>
    </div>
  </aside>
)}

Navigation.propTypes = {
  urlPath: PropTypes.string.isRequired,
}
    
export default Navigation
