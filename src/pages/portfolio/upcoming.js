import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ImageLayout1Col1Row from '../../components/imageLayout1Col1Row';
import ImageLinkTile from "../../components/imageLinkTile";
import ImageFillerTile from '../../components/imageFillerTile';
import ImageTile from '../../components/imageTile';
import TextBlurb from '../../components/textBlurb';

import image1 from '../../images/Upcoming/Oakville-New-Home-01.jpg';
import image2 from '../../images/Upcoming/StGeorges-GC.jpg';
import image3 from '../../images/Upcoming/King-Georges6.jpg';
import image4 from '../../images/Upcoming/Before-StGeorges.jpg';

const Upcoming = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio upcoming">
    <SEO />
    <section className="contentWrapper layoutAll layoutUpcoming">
      <ImageTile dataItem={{
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
        marginTop: '-115px'
      }} />
      <section className="textBlurb">
        <p className="textOverlay">St. George's Rebuild</p>
        <p className="completionDate">Completion 2019</p>
      </section>
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 0.8)',
        backgroundPosition: '50% 80%'
      }} />
      <section className="textBlurb">
        <p className="textOverlay">Oakville New Home</p>
        <p className="completionDate">Completion 2017</p>
      </section>
    </section>
  </Layout>
)

export default Upcoming
