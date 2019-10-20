import { Link } from "gatsby"
import React from "react"
import houzzLogo from "../images/HouzzH.png"

const Footer = () => (
  <footer>
    <Link className="houzzLogoFooter" to="http://www.houzz.com/pro/architrave/architrave-design-architect">
      <img src={houzzLogo} alt="Houzz logo" />
    </Link>
    <Link to="/sitemap" className="sitemap">Site Map</Link>
    <p className="copyright">© {new Date().getFullYear()}</p>
    <p className="websiteBy">Website by <Link to="http://www.alisonhall.ca">Alison Hall</Link></p>
  </footer>
)

export default Footer
