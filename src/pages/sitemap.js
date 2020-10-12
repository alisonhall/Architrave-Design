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
                      <Link to="/portfolio/new-homes/credit-river-manor">Credit River Manor</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/oakville-executive-home">Oakville Executive Home</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/hoggs-hollow-french-country">Hogg's Hollow French Country</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/traditional-kingsway-park">Traditional Kingsway Park</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/kingsway-georgian">Kingsway Georgian</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/new-homes/classic-centre-hall">Classic Centre Hall</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/portfolio/renovations-additions">Renovations</Link>
                  <ul>
                    <li>
                      <Link to="/portfolio/renovations-additions/lytton-park-manor">Lytton Park Manor</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/etobicoke-arts-and-crafts">Etobicoke Arts and Crafts</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/upper-canada-farmhouse">Upper Canada Farmhouse</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/rosedale-edwardian">Rosedale Edwardian</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/lorne-park-interior">Lorne Park Interior</Link>
                    </li>
                    <li>
                      <Link to="/portfolio/renovations-additions/princess-margaret-modern">Princess Margaret Modern</Link>
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
