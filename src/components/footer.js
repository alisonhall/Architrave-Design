import { Link } from "gatsby"
import React from "react"
import houzzLogo from "../images/HouzzH.png"

const Footer = () => (
  <footer>
    <Link class="houzzLogoFooter" to="http://www.houzz.com/pro/architrave/architrave-design-architect">
      <img src={houzzLogo} alt="Houzz logo" />
    </Link>
    <Link to="/sitemap" class="sitemap">Site Map</Link>
    <p>© {new Date().getFullYear()}</p>
    <p class="websiteBy">Website by <Link to="http://www.alisonhall.ca">Alison Hall</Link></p>
  </footer>
)

export default Footer
