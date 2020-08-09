import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Item from '../../components/item';

// import image1 from '../../images/Upcoming/Oakville-New-Home-01.jpg';
import image2 from '../../images/Upcoming/StGeorges-GC.jpg';
// import image3 from '../../images/Upcoming/King-Georges6.jpg';
import image4 from '../../images/Upcoming/Before-StGeorges.jpg';

const Upcoming = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio upcoming">
    <SEO />
    <section className="contentWrapper layoutAll layoutUpcoming">
      <Item
        num={5}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_700,c_scale,f_auto,q_auto/v1571329986/ArchitraveDesign/Kingsway-Classic/_Kingsway_Classic_hpwrk4.jpg',
          backgroundPosition: '50% 25%'
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: 'calc(500px * 1.4)'
        }}
      />
      <section className="textBlurb">
        <p className="textOverlay">Kingsway Classic</p>
      </section>
      <Item
        num={2}
        image={{
          image: image2,
          backgroundPosition: '50% 80%'
        }}
        styles={{
          width: 'calc(100% - (1.5% * 2))',
          height: 'calc(500px * 0.8)'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4,
          backgroundPosition: '50% 80%'
        }}
        styles={{
          width: 'calc(45% - (1.5% * 2))',
          height: '170px',
          float: 'right',
          marginTop: '-115px !important'
        }}
      />
      <section className="textBlurb">
        <p className="textOverlay">St. George's Rebuild</p>
        <p className="completionDate">Completion 2019</p>
      </section>
    </section>
  </Layout>
)

export default Upcoming
