// Hand-transcribed from src/pages/portfolio/new-homes/hoggs-hollow-french.jsx — a
// dual-layout detail page (component is oddly named HoggsHollowTraditional in the
// source, bound to the hoggsHollowFrench project; see hoggsHollowTraditionalDetail.js
// for the *other*, differently-shaped page bound to the hoggsHollowTraditional
// project). Several tiles intentionally share the same num (6) in the live source;
// preserved exactly.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  ellipticalStair: { kind: 'image', num: 1, backgroundPosition: '100% 0%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg' },
  frontFacade: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/1-Front-Facade_iieaut.jpg' },
  riversideTerraces: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347175/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/8-Riverside-Terraces_ukricc.jpg' },
  customPool: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/9-Custom-Pool_rj5teb.jpg' },
  cofferedFamilyRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347177/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/3-Coffered-Family-Room_ayggrb.jpg' },
  eatInKitchen: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347167/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/4-Eat-in-Kitchen_owcnvf.jpg' },
  livingRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/7-Living-Rm_x76pxj.jpg' },
  diningRoom: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347166/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/6-Dining-Room_vuj7ds.jpg' },
  masterBedroom: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347170/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/11-MasterBedroom_g2vzif.jpg' },
  masterEnsuite: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347169/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/10-MasterEnsuite_lojx17.jpg' },
  bedroom4: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347171/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/Bedroom4_wxob4w.jpg' }
};

export const hoggsHollowFrenchDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', { height: 645 }, [
      column('d1c1', { width: '48%' }, [tileRef('d1c1p1', 'ellipticalStair')]),
      column('d1c2', { width: '52%' }, [
        nestedRow('d1c2r1', row('d1c2r1row', { height: 340 }, [column('d1c2r1c1', {}, [tileRef('d1c2r1c1p1', 'frontFacade')])])),
        nestedRow('d1c2r2', row('d1c2r2row', { height: 305 }, [column('d1c2r2c1', {}, [tileRef('d1c2r2c1p1', 'riversideTerraces')])]))
      ])
    ]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 300 }, [
      column('d3c1', { width: '48%' }, [tileRef('d3c1p1', 'customPool')]),
      column('d3c2', { width: '52%' }, [tileRef('d3c2p1', 'cofferedFamilyRoom')])
    ]),
    row('d4', { height: 300 }, [
      column('d4c1', {}, [tileRef('d4c1p1', 'eatInKitchen')]),
      column('d4c2', {}, [tileRef('d4c2p1', 'diningRoom')])
    ]),
    row('d5', { height: 300 }, [
      column('d5c1', {}, [tileRef('d5c1p1', 'masterBedroom')]),
      column('d5c2', {}, [tileRef('d5c2p1', 'masterEnsuite')]),
      column('d5c3', {}, [tileRef('d5c3p1', 'bedroom4')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 450 }, [
      column('w1c1', { width: '25%' }, [tileRef('w1c1p1', 'ellipticalStair')]),
      column('w1c2', { width: '50%' }, [tileRef('w1c2p1', 'frontFacade')]),
      column('w1c3', { width: '25%' }, [
        nestedRow('w1c3r1', row('w1c3r1row', { height: 200 }, [column('w1c3r1c1', {}, [tileRef('w1c3r1c1p1', 'riversideTerraces')])])),
        nestedRow('w1c3r2', row('w1c3r2row', { imageHeight: 250 }, [column('w1c3r2c1', {}, [tileRef('w1c3r2c1p1', 'customPool')])]))
      ])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 300 }, [
      column('w3c1', { width: '32%' }, [tileRef('w3c1p1', 'cofferedFamilyRoom')]),
      column('w3c2', { width: '36%' }, [tileRef('w3c2p1', 'eatInKitchen')]),
      column('w3c3', { width: '32%' }, [tileRef('w3c3p1', 'diningRoom')])
    ]),
    row('w4', { height: 300 }, [
      column('w4c1', {}, [tileRef('w4c1p1', 'masterBedroom')]),
      column('w4c2', {}, [tileRef('w4c2p1', 'masterEnsuite')]),
      column('w4c3', {}, [tileRef('w4c3p1', 'bedroom4')])
    ])
  ]
};

export const hoggsHollowFrenchDetailPageConfig = {
  key: 'hoggsHollowFrenchDetail',
  label: 'Hoggs Hollow French (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/hoggs-hollow-french.jsx',
  componentName: 'HoggsHollowTraditional',
  type: 'detail',
  projectKey: 'hoggsHollowFrench',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
