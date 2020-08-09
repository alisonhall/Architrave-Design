import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Item from '../../components/item';

import image1 from '../../images/Renovations-Additions/Lytton-Park-4.jpg';
import image2 from '../../images/Renovations-Additions/Etobicoke-2.jpg';
import image3 from '../../images/Renovations-Additions/Cornwall-1.jpg';
import image4 from '../../images/Renovations-Additions/Rosedale-2.jpg';
// import image5 from '../../images/Renovations-Additions/Lorne-Park-4.jpg';


const RenovationsAdditions = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="renosAndAdditionsOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutRenovations">
      <Item
        num={1}
        image={{
          image: image1,
          backgroundPosition: '50% 40%'
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/lytton-park-update'
        }}
        text={{
          text: "Lytton Park"
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 1.29)'
        }}
      />
      <Item
        num={2}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_345,c_scale,f_auto,q_auto/v1571329784/ArchitraveDesign/Princess-Margaret-Transitional/Princess_Margaret_Transitional1_yp7fuo.jpg',
          backgroundPosition: '50% 30%'
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/princess-margaret-facelift'
        }}
        text={{
          text: "Princess Margaret Facelift"
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.69)'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3,
          backgroundPosition: '50% 40%'
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/cornwall-heritage-addition'
        }}
        text={{
          text: "Loyalist Addition"
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.53)'
        }}
      />
      <Item
        text={{
          copy: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.'
        }}
      />
      <Item
        num={4}
        image={{
          image: image4,
          backgroundPosition: '50% 40%'
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/rosedale-revival'
        }}
        text={{
          text: "Rosedale Revival"
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
      <Item
        num={5}
        image={{
          image: image2,
          backgroundPosition: '50% 40%'
        }}
        link={{
          linkUrl: '/portfolio/renovations-additions/etobicoke-renewal'
        }}
        text={{
          text: "Etobicoke Restyling"
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
    </section>
  </Layout>
)

export default RenovationsAdditions
