import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ImageTile from '../../components/imageTile';

const Upcoming = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio upcoming">
    <SEO />
    <section className="contentWrapper layoutAll layoutUpcoming">
      <ImageTile dataItem={{
        num: '1',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_700,c_scale,f_auto,q_auto/v1602976697/ArchitraveDesign/3-Upcoming/Norseman-Top-Up/Norseman_Top_Up_hvicw4.jpg',
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.4)',
        backgroundPosition: '50% 25%'
      }} />
      <section className="textBlurb">
        <p className="textOverlay">Norseman Top Up</p>
      </section>
      <ImageTile dataItem={{
        num: '1',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_700,c_scale,f_auto,q_auto/v1602976686/ArchitraveDesign/3-Upcoming/Lorne-Park-Renovation/Lorne_Park_Renovation_mihiez.jpg',
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.4)',
        backgroundPosition: '50% 25%'
      }} />
      <section className="textBlurb">
        <p className="textOverlay">Lorne Park Renovation</p>
      </section>
      <ImageTile dataItem={{
        num: '2',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_700,c_scale,f_auto,q_auto/v1602976682/ArchitraveDesign/3-Upcoming/Etobicoke-Transitional/Etobicoke_Transitional_dotjej.jpg',
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.4)',
        backgroundPosition: '50% 25%'
      }} />
      <section className="textBlurb">
        <p className="textOverlay">Etobicoke Transitional</p>
      </section>
      {/* <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 0.8)',
        backgroundPosition: '50% 80%'
      }} />
      <ImageTile dataItem={{
        num: '4',
        image: image4,
        width: 'calc(45% - (1.5% * 2))',
        height: '170px',
        backgroundPosition: '50% 80%',
        float: 'right',
        marginTop: '-115px !important'
      }} />
      <section className="textBlurb">
        <p className="textOverlay">St. George's Rebuild</p>
        <p className="completionDate">Completion 2019</p>
      </section> */}
    </section>
  </Layout>
)

export default Upcoming
