import React from 'react';
import { Link } from 'gatsby';

import constants from '../../static/app-constants';
import './footer.scss';

import houzzLogo from '../images/HouzzH.png';
import bestOfHouzz2021 from '../images/best-of-houzz-2021.png';
import bestOfHouzz2026 from '../images/best-of-houzz-2026.png';

const { houzz } = constants;

const Footer = () => (
  <footer>
    <div className="houzz-badges">
      <a className="houzz-badge houzz-logo-footer" title="Architrave Design on Houzz" href={houzz.url}>
        <img src={houzzLogo} alt="Houzz logo" />
      </a>
      <a className="houzz-badge best-of-houzz-footer" title="Best of Houzz 2021" href={houzz.url}>
        <img src={bestOfHouzz2021} alt="Best of Houzz 2021 badge" />
      </a>
      <a className="houzz-badge best-of-houzz-footer" title="Best of Houzz 2026" href={houzz.url}>
        <img src={bestOfHouzz2026} alt="Best of Houzz 2026 badge" />
      </a>
    </div>
    <Link to="/sitemap" className="sitemap">Site Map</Link>
    <p className="copyright">© {new Date().getFullYear()}</p>
    <p className="websiteBy">Website by <a href="https://alisonkhall.com/">Alison Hall</a></p>
  </footer>
)

export default Footer
