import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Item from '../components/item';

import image1 from '../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../images/New-Homes/KingswayGeorgian-1.jpg';
import image3 from '../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../images/New-Homes/CreditRiver-1.jpg';
import image5 from '../images/Renovations-Additions/Etobicoke-2.jpg';
import image6 from '../images/Renovations-Additions/Lytton-Park-3.jpg';
import image7 from '../images/New-Homes/KingswayTransitional-1.jpg';
// import image8 from '../images/New-Homes/CreditRiver-9.jpg';
// import image9 from '../images/New-Homes/KingswayGeorgian-2.jpg';

const IndexPage = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="index home">
    <SEO />
    <section className="contentWrapper layoutAll layoutHome">
      <Item
        num={1}
        image={{
          image: image1,
          backgroundPosition: '100% 0%'
        }}
        link={{
          linkUrl: '/portfolio/new-homes/hoggs-hollow-traditional'
        }}
        text={{
          copy: "Hogg's Hollow Traditional"
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '702.5px'
        }}
      />
      <Item
        num={2}
        image={{
          image: image2
        }}
        link={{
          linkUrl: '/portfolio/new-homes/kingsway-georgian'
        }}
        text={{
          copy: "Kingsway Georgian"
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '370.29px'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3,
        }}
        styles={{
          width: 'calc(21% - (1.5% * 2))',
          height: '299.133px'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4
        }}
        link={{
          linkUrl: '/portfolio/new-homes/credit-river-classic'
        }}
        text={{
          copy: "Credit River"
        }}
        styles={{
          width: 'calc(31% - (1.5% * 2))',
          height: '299.133px'
        }}
      />
      <Item
        text={{
          copy: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
        }}
      />
      <Item
        num={5}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_300,c_scale,f_auto,q_auto/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg'
        }}
        link={{
          linkUrl: '/portfolio/new-homes/classic-centre-hall'
        }}
        text={{
          copy: "Classic Centre Hall"
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={6}
        image={{
          image: image7
        }}
        link={{
          linkUrl: '/portfolio/new-homes/kingsway-transitional'
        }}
        text={{
          copy: "Kingsway Transitional"
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={7}
        image={{
          image: image5
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/etobicoke-renewal'
        }}
        text={{
          copy: "Etobicoke Facelift"
        }}
        styles={{
          width: 'calc(36% - (1.5% * 2))',
          height: '345.874'
        }}
      />
      <Item
        num={8}
        image={{
          image: image6
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/lytton-park-update'
        }}
        text={{
          copy: "Lytton Park Update",
        }}
        styles={{
          width: 'calc(64% - (1.5% * 2))',
          height: '345.874'
        }}
      />
      {/* <Item
        num={8}
        image={{
          image: image8
        }}
        styles={{
          width: 'calc(21% - (1.5% * 2))',
          height: '300px'
        }}
      />
      <Item
        num={9}
        image={{
          image: image9
        }}
        styles={{
          width: 'calc(31% - (1.5% * 2))',
          height: '300px'
        }}
      /> */}
    </section>
  </Layout>
)

export default IndexPage
