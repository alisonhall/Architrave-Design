import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from '../../../components/prevNextProjectLink';

import image1 from '../../../images/Renovations-Additions/Rosedale-2.jpg';
import image2 from '../../../images/Renovations-Additions/Rosedale-1.jpg';
import image3 from '../../../images/Renovations-Additions/Rosedale-3.jpg';

const RosedaleRevival = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 1.3)'
      }} />
      <TextBlurb dataItem={{
        title: 'Rosedale Revival',
        text: 'This 1917 home was a diamond in the rough. Powercleaning revealed attractive brick under the green paint. A new Edwardian-style bay and dormers gave it a historic character and quality it always lacked.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(48% - (1.5% * 2))',
        height: 'calc(500px * 0.75)',
        textOverlay: 'Before'
      }} />
      <ImageTile dataItem={{
        num: '3',
        image: image3,
        width: 'calc(52% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="/portfolio/renovations-additions/cornwall-heritage-addition" />
      <PrevNextProjectLink direction="next" linkUrl="/portfolio/renovations-additions/lorne-park-interior" />
    </section>
  </Layout>
)

export default RosedaleRevival;
