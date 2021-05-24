import React from 'react';
import { Link } from 'gatsby';

import constants from '../../static/app-constants';
import './footer.scss';

import houzzLogo from '../images/HouzzH.png';
import bestOfHouzz from '../images/best-of-houzz.png';

const { houzz } = constants;

const Footer = () => (
  <footer>
    <div className="houzz-badges">
      <a className="houzz-logo-footer" href={houzz.url}>
        <img src={houzzLogo} alt="Houzz logo" />
      </a>
      <a className="best-of-houzz-footer" href={houzz.url}>
        <img src={bestOfHouzz} alt="Best of Houzz 2021 badge" />
      </a>
    </div>
    <Link to="/sitemap" className="sitemap">Site Map</Link>
    <p className="copyright">© {new Date().getFullYear()}</p>
    <p className="websiteBy">Website by <a href="https://alisonkhall.com/">Alison Hall</a></p>
  </footer>
)

export default Footer
