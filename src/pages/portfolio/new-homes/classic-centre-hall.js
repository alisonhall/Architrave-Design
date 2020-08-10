import React from 'react';

import constants from '../../../../public/app-constants';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.classicCentreHall;

const ClassicCentreHall = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <Item
        num={1}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg'
        }}
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '450px'
        }}
      />
      <Item
        num={2}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347250/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/2-Limestone-Detail_l6fs59.jpg'
        }}
        styles={{
          width: 'calc(50% - (1.5% * 2))',
          height: '450px'
        }}
      />
      <Item
        text={{
          title: 'Classic Centre Hall',
          copy: ''
        }}
      />
      <Item
        num={3}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347249/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/3-Two-Storey-Main-Hall_ejywhy.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={4}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347238/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/4-Custom-Kitchen_odkxdb.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={5}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347248/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/5-Family-Room_gdmmua.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={6}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347244/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/6-Mudroom_lkonse.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={7}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347249/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/7-Upper_Hall_mvytmk.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={8}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347264/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/10-Home-Office_aozszs.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={9}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347261/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/8-Master-Bedroom_l9mlyp.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={10}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347253/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/9-Master-Ensuite_ce0yej.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <Item
        num={11}
        image={{
          imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347263/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/11-Jack_n_Jill-Vanities_btkar8.jpg'
        }}
        styles={{
          width: 'calc(33.3% - (1.5% * 2))',
          height: '250px'
        }}
      />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default ClassicCentreHall;
