import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Item from '../../components/item';

import image1 from '../../images/New-Homes/HoggsHollowTraditional-4.jpg';
import image2 from '../../images/New-Homes/KingswayGeorgian-1.jpg';
import image3 from '../../images/New-Homes/KingswayTransitional-6.jpg';
import image4 from '../../images/New-Homes/CreditRiver-1.jpg';
import image5 from '../../images/New-Homes/KingswayTransitional-1.jpg';
import image6 from '../../images/New-Homes/Oakville-1.jpg';
import image7 from '../../images/New-Homes/FrenchCountry-4.jpg';
import image8 from '../../images/New-Homes/KingswayTraditional-1.jpg';


const NewHomes = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="newHomesOverview">
    <SEO />
    <section className="contentWrapper layoutAll layoutNewHomes">
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
          height: 'calc(500px * 1.405)'
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
          height: 'calc(500px * 0.74058)'
        }}
      />
      <Item
        num={3}
        image={{
          image: image3
        }}
        styles={{
          width: 'calc(21% - (1.5% * 2))',
          height: 'calc(500px * 0.598266)'
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
          height: 'calc(500px * 0.598266)'
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
          image: image5
        }}
        link={{
          linkUrl: '/portfolio/new-homes/kingsway-transitional'
        }}
        text={{
          copy: "Kingsway Transitional"
        }}
        styles={{
          width: 'calc(48% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
      <Item
        num={6}
        image={{
          image: image6
        }}
        link={{
          linkUrl: '/portfolio/new-homes/oakville-executive-home'
        }}
        text={{
          copy: "Oakville Executive"
        }}
        styles={{
          width: 'calc(52% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
      <Item
        num={7}
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
          width: 'calc(33.3% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
      <Item
        num={8}
        image={{
          image: image7
        }}
        link={{
          linkUrl: '/portfolio/new-homes/hoggs-hollow-french-country'
        }}
        text={{
          copy: "Hogg's Hollow French Country"
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
      <Item
        num={9}
        image={{
          image: image8,
          backgroundPosition: '30% 40%'
        }}
        link={{
          linkUrl: '/portfolio/new-homes/kingsway-traditional'
        }}
        text={{
          copy: "Kingsway Traditional"
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: 'calc(500px * 0.6)'
        }}
      />
    </section>
  </Layout>
)

export default NewHomes
