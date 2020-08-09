import React from 'react';

import Layout from '../../../components/layout';
import SEO from '../../../components/seo';
import ImageTile from '../../../components/imageTile';
import TextBlurb from '../../../components/textBlurb';
import TextBlurbFiller from '../../../components/textBlurbFiller';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';
import constants from '../../../../public/app-constants';

const project = constants.projects.classicCentreHall;

const ClassicCentreHall = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="portfolio">
    <SEO />
    <section className="contentWrapper layoutAll layoutProject">
      <ImageTile dataItem={{
        num: '1',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.9)'
      }} />
      <ImageTile dataItem={{
        num: '2',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_450,c_scale,f_auto,q_auto/v1595347250/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/2-Limestone-Detail_l6fs59.jpg',
        width: 'calc(50% - (1.5% * 2))',
        height: 'calc(500px * 0.9)'
      }} />
      <TextBlurb dataItem={{
        title: 'Classic Centre Hall',
        text: ''
      }} />
      <ImageTile dataItem={{
        num: '3',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347249/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/3-Two-Storey-Main-Hall_ejywhy.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '4',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347238/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/4-Custom-Kitchen_odkxdb.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '5',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347248/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/5-Family-Room_gdmmua.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '6',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347244/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/6-Mudroom_lkonse.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '7',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347249/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/7-Upper_Hall_mvytmk.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '8',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347264/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/10-Home-Office_aozszs.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '9',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347261/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/8-Master-Bedroom_l9mlyp.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '10',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347253/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/9-Master-Ensuite_ce0yej.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <ImageTile dataItem={{
        num: '11',
        imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/h_250,c_scale,f_auto,q_auto/v1595347263/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/11-Jack_n_Jill-Vanities_btkar8.jpg',
        width: 'calc(33.3% - (1.5% * 2))',
        height: 'calc(500px * 0.5)'
      }} />
      <PrevNextProjectLinks project={project} />
    </section>
  </Layout>
)

export default ClassicCentreHall;
