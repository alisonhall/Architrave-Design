import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import architraveLogo from "../images/ArchitraveNewLogo.jpg"
import houzzLogo from "../images/HouzzH.png"

const Navigation = ({urlPath}) => {
  const subNavVisible = (urlPath.indexOf('portfolio') >= 0) ? 'subNavVisible' : '';
  const isNewHomes = (urlPath.indexOf('new-homes') >= 0) ? 'selected' : '';
  const isRenovationsAdditions = (urlPath.indexOf('renovations-additions') >= 0) ? 'selected' : '';
  return (
  <aside>
    <Link to="/">
      <img id="logo" src={architraveLogo} alt="Architrave Design, Architect logo" />
    </Link>
    <nav>
      <ul class="mainNav">
        <li>
          <Link to="/portfolio/new-homes" className="portfolioNav">Portfolio</Link>
          <ul class={`subNav ${subNavVisible}`}>
            <li>
              <Link to="/portfolio/new-homes" activeClassName="selected" className={isNewHomes}>New Homes</Link>
            </li>
            <li>
              <Link to="/portfolio/renovations-additions" activeClassName="selected" className={isRenovationsAdditions}>Renovations</Link>
            </li>
            <li>
              <Link to="/portfolio/upcoming" activeClassName="selected">Upcoming</Link>
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
      <img src={houzzLogo} alt="Houzz logo" />
    </Link>
  </aside>
)}

Navigation.propTypes = {
  urlPath: PropTypes.string.isRequired,
}
    
export default Navigation
