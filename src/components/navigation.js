import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Navigation = () => (
  <aside>
    <Link to="/index.html">
      <img id="logo" src="../images/ArchitraveNewLogo.jpg" alt="Architrave Design | Architect" />
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
      <img src="../images/HouzzH.png" />
    </Link>
  </aside>
)
    
export default Navigation
