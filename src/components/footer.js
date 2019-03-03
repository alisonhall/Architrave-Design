import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import houzzLogo from "../images/HouzzH.png"

const Footer = () => (
  <footer>
    <a class="houzzLogoFooter" href="http://www.houzz.com/pro/architrave/architrave-design-architect">
      <img src={houzzLogo} />
    </a>
    <a href="/sitemap" class="sitemap">Site Map</a>
    <p>© {new Date().getFullYear()}</p>
    <p class="websiteBy">Website by <a href="http://www.alisonhall.ca">Alison Hall</a></p>
  </footer>
)

export default Footer
