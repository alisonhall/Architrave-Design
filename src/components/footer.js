import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Footer = () => (
  <footer>
    <a class="houzzLogoFooter" href="http://www.houzz.com/pro/architrave/architrave-design-architect">
      <img src="../images/HouzzH.png" />
    </a>
    <a href="/sitemap.html" class="sitemap">Site Map</a>
    <p>© {new Date().getFullYear()}</p>
    <p class="websiteBy">Website by <a href="http://www.alisonhall.ca">Alison Hall</a></p>
  </footer>
)

export default Footer
