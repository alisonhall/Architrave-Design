import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from '../../../components/prevNextProjectLink';

import image1 from '../../../images/Renovations-Additions/Royal-York-1.jpg';
import image2 from '../../../images/Renovations-Additions/Royal-York-2.jpg';

const RoyalYorkFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        image: image1,
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)',
        textOverlay: 'Before'
      }} />
      <ImageTile dataItem={{
        num: '2',
        image: image2,
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)',
        textOverlay: 'New Facade'
      }} />
      <TextBlurb dataItem={{
        title: 'Royal York Facelift',
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="" />
      <PrevNextProjectLink direction="next" linkUrl="" />
    </section>
  </Layout>
)

export default RoyalYorkFacelift;
