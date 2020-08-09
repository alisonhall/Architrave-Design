import { Link } from 'gatsby';
import React from 'react';
import houzzLogo from '../images/HouzzH.png';

const Footer = () => (
  <footer>
    <a className="houzzLogoFooter" href="http://www.houzz.com/pro/architrave/architrave-design-architect">
      <img src={houzzLogo} alt="Houzz logo" />
    </a>
    <Link to="/sitemap" className="sitemap">Site Map</Link>
    <p className="copyright">© {new Date().getFullYear()}</p>
    <p className="websiteBy">Website by <a href="https://alisonkhall.com/">Alison Hall</a></p>
  </footer>
)

export default Footer
