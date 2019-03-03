import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import architraveLogo from "../images/ArchitraveNewLogo.jpg"
import houzzLogo from "../images/HouzzH.png"

const Navigation = () => (
  <aside>
    <Link to="/index.html">
      <img id="logo" src={architraveLogo} alt="Architrave Design | Architect" />
    </Link>
    <nav>
      <ul class="mainNav">
        <li>
          <Link to="/portfolio/new-homes" class="portfolioNav">Portfolio</Link>
          <ul class="subNav">
            <li>
              <Link to="/portfolio/new-homes">New Homes</Link>
            </li>
            <li>
              <Link to="/portfolio/renovations-additions">Renovations</Link>
            </li>
            <li>
              <Link to="/portfolio/upcoming">Upcoming</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
    <Link class="houzzLogo" to="http://www.houzz.com/pro/architrave/architrave-design-architect">
      <img src={houzzLogo} />
    </Link>
  </aside>
)
    
export default Navigation
