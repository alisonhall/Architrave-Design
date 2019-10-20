import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import ImageLayout1Col1Row from '../../../components/imageLayout1Col1Row';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLink from '../../../components/prevNextProjectLink';

const PrincessMargaretFacelift = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/f_auto,q_auto/v1571329784/ArchitraveDesign/Princess-Margaret-Transitional/Princess_Margaret_Transitional1_yp7fuo.jpg',
        width: 'calc(100% - (1.5% * 2))',
        height: 'calc(500px * 0.9)',
        backgroundPosition: '50% 30%'
      }} />
      <TextBlurb dataItem={{
        title: 'Princess Margaret Facelift',
        text: 'A sixties era side-split needed a complete update inside and out. A new 2nd floor and contemporary facing gives a familiar style a modern twist.'
      }} />
      <ImageTile dataItem={{
        num: '2',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/f_auto,q_auto/v1571329783/ArchitraveDesign/Princess-Margaret-Transitional/Princess_Margaret_Before_sco67f.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)',
        textOverlay: 'Before'
      }} />
      <ImageTile dataItem={{
        num: '3',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/f_auto,q_auto/v1571329784/ArchitraveDesign/Princess-Margaret-Transitional/Princess_Margaret_Transitional2_j8wr8i.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.75)'
      }} />
      <PrevNextProjectLink direction="previous" linkUrl="" />
      <PrevNextProjectLink direction="next" linkUrl="" />
    </section>
  </Layout>
)

export default PrincessMargaretFacelift;
