import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import constants from '../../static/app-constants';

import architraveLogo from '../images/ArchitraveNewLogo.jpg';
import houzzLogo from '../images/HouzzH.png';

const { portfolio, projectTypes, houzz } = constants;

const Navigation = ({urlPath}) => {
  const subNavVisible = (urlPath.indexOf(portfolio) >= 0) ? 'subNavVisible' : '';
  const isNewHomes = (urlPath.indexOf(projectTypes.new) >= 0) ? 'selected' : '';
  const isRenovationsAdditions = (urlPath.indexOf(projectTypes.renovations) >= 0) ? 'selected' : '';
  return (
  <aside>
    <Link to="/">
      <img id="logo" src={architraveLogo} alt="Architrave Design, Architect logo" />
    </Link>
    <nav>
      <ul className="mainNav">
        <li>
          <Link to={`/${portfolio}/${projectTypes.new}`} className="portfolioNav">Portfolio</Link>
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
        </li>
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
    <a className="houzzLogo" href={houzz.url}>
      <img src={houzzLogo} alt="Houzz logo" />
    </a>
  </aside>
)}

Navigation.propTypes = {
  urlPath: PropTypes.string.isRequired,
}
    
export default Navigation
