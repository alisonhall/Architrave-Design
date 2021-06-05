import React from 'react';

import constants from '../../../../static/app-constants';

import Layout from '../../../components/layout';
import Seo from '../../../components/seo';
import Row from '../../../components/rowHOC';
import Column from '../../../components/columnHOC';
import Item from '../../../components/item';
import PrevNextProjectLinks from '../../../components/prevNextProjectLinks';

const project = constants.projects.hoggsHollowFrench;

const tiles = {
    description: (
        <Item
            text={{
                title: project.projectName,
                copy: project.projectDescription
            }}
        />
    ),
    ellipticalStair: (
        <Item
            num={1}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg',
                backgroundPosition: '100% 0%'
            }}
        />
    ),
    frontFacade: (
        <Item
            num={2}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/1-Front-Facade_iieaut.jpg'
            }}
        />
    ),
    riversideTerraces: (
        <Item
            num={3}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347175/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/8-Riverside-Terraces_ukricc.jpg'
            }}
        />
    ),
    customPool: (
        <Item
            num={4}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/9-Custom-Pool_rj5teb.jpg'
            }}
        />
    ),
    cofferedFamilyRoom: (
        <Item
            num={5}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347177/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/3-Coffered-Family-Room_ayggrb.jpg'
            }}
        />
    ),
    eatInKitchen: (
        <Item
            num={1}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347167/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/4-Eat-in-Kitchen_owcnvf.jpg'
            }}
        />
    ),
    livingRoom: (
        <Item
            num={5}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/7-Living-Rm_x76pxj.jpg'
            }}
        />
    ),
    diningRoom: (
        <Item
            num={6}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347166/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/6-Dining-Room_vuj7ds.jpg'
            }}
        />
    ),
    masterBedroom: (
        <Item
            num={6}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347170/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/11-MasterBedroom_g2vzif.jpg'
            }}
        />
    ),
    masterEnsuite: (
        <Item
            num={6}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347169/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/10-MasterEnsuite_lojx17.jpg'
            }}
        />
    ),
    bedroom4: (
        <Item
            num={6}
            image={{
                imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347171/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/Bedroom4_wxob4w.jpg'
            }}
        />
    )
};

const HoggsHollowTraditional = (props) => (
    <Layout urlPath={props.location.pathname} mainClasses="portfolio">
        <Seo />
        <section className="contentWrapper layoutAll layoutProject defaultLayout">
            <Row height={645}>
                <Column width="48%">
                    {tiles.ellipticalStair}
                </Column>
                <Column width="52%">
                    <Row height={340}>
                        <Column>
                            {tiles.frontFacade}
                        </Column>
                    </Row>
                    <Row height={645 - 340}>
                        <Column>
                            {tiles.riversideTerraces}
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row>
                <Column>
                    {tiles.description}
                </Column>
            </Row>
            <Row height={300}>
                <Column width="48%">
                    {tiles.customPool}
                </Column>
                <Column width="52%">
                    {tiles.cofferedFamilyRoom}
                </Column>
            </Row>
            <Row height={300}>
                <Column >
                    {tiles.eatInKitchen}
                </Column>
                <Column>
                    {tiles.diningRoom}
                </Column>
            </Row>
            <Row height={300}>
                <Column >
                    {tiles.masterBedroom}
                </Column>
                <Column>
                    {tiles.masterEnsuite}
                </Column>
                <Column>
                    {tiles.bedroom4}
                </Column>
            </Row>
            <PrevNextProjectLinks project={project} />
        </section>
        <section className="contentWrapper layoutAll layoutProject wideLayout">
            <Row height={450}>
                <Column width="25%">
                    {tiles.ellipticalStair}
                </Column>
                <Column width="50%">
                    {tiles.frontFacade}
                </Column>
                <Column width="25%">
                    <Row height={200}>
                        <Column>
                            {tiles.riversideTerraces}
                        </Column>
                    </Row>
                    <Row imageHeight={450 - 200}>
                        <Column>
                            {tiles.customPool}
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row>
                <Column>
                    {tiles.description}
                </Column>
            </Row>
            <Row height={300}>
                <Column width="32%">
                    {tiles.cofferedFamilyRoom}
                </Column>
                <Column width="36%">
                    {tiles.eatInKitchen}
                </Column>
                <Column width="32%">
                    {tiles.diningRoom}
                </Column>
            </Row>
            <Row height={300}>
                <Column >
                    {tiles.masterBedroom}
                </Column>
                <Column>
                    {tiles.masterEnsuite}
                </Column>
                <Column>
                    {tiles.bedroom4}
                </Column>
            </Row>
            <PrevNextProjectLinks project={project} />
        </section>
    </Layout>
)

export default HoggsHollowTraditional;
