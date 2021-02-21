import React from 'react';
import { Link } from 'gatsby';

import constants from '../../static/app-constants';
import './footer.scss';

import houzzLogo from '../images/HouzzH.png';

const { houzz } = constants;

const Footer = () => (
  <footer>
    <a className="houzzLogoFooter" href={houzz.url}>
      <img src={houzzLogo} alt="Houzz logo" />
    </a>
    <Link to="/sitemap" className="sitemap">Site Map</Link>
    <p className="copyright">© {new Date().getFullYear()}</p>
    <p className="websiteBy">Website by <a href="https://alisonkhall.com/">Alison Hall</a></p>
  </footer>
)

export default Footer
