import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Sitemap = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="sitemap">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textContent">
          <h3>Site Map</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <p>Portfolio</p>
              <ul>
                <li>
                  <Link to="/portfolio/new-homes">New Homes</Link>
                  <ul>
                    <li>
                      <Link to="/portfolio/new-homes/hoggs-hollow-traditional">Hogg's Hollow Traditional</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/kingsway-transitional">Kingsway Transitional</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/credit-river-classic">Credit River</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/oakville-executive-home">Oakville Executive</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/hoggs-hollow-french-country">Hogg's Hollow French Country</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/kingsway-traditional">Kingsway Traditional</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/kingsway-georgian">Kingsway Georgian</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/portfolio/renovations-additions">Renovations</Link>
                  <ul>
                    <li>
                      <Link to="/portfolio/renovations-additions/lytton-park-update">Lytton Park</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/etobicoke-renewal">Etobicoke Restyling</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/cornwall-heritage-addition">Loyalist Addition</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/rosedale-revival">Rosedale Revival</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/lorne-park-interior">Lorne Park Interior</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/princess-margaret-facelift">Princess Margaret Facelift</Link>
                    </li>
                  </ul>
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
            <li>
              <Link to="/sitemap">Site Map</Link>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </Layout>
)

export default Sitemap
