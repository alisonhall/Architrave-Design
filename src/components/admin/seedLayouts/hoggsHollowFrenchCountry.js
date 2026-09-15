// Hand-transcribed from src/pages/portfolio/new-homes/hoggs-hollow-french-country.jsx
// — a single-section detail page. See creditRiverManor.js for the node shape.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

export const hoggsHollowFrenchCountryLayout = {
  tiles: {
    description: { kind: 'description' },
    eatInKitchen: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347167/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/4-Eat-in-Kitchen_owcnvf.jpg' },
    2: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943332/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-2_zo3i9y.jpg' },
    3: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943418/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-3_ybwxyq.jpg' },
    1: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943414/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-1_dpiasd.jpg' },
    livingRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/7-Living-Rm_x76pxj.jpg' },
    5: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613943500/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/FrenchCountry-5_iumyvo.jpg' }
  },

  layout: [
    row('r1', { height: 390 }, [
      column('r1c1', { width: '63%' }, [tileRef('r1c1p1', 'eatInKitchen')]),
      column('r1c2', { width: '37%' }, [tileRef('r1c2p1', '2')])
    ]),
    row('r2', { height: 290 }, [
      column('r2c1', { width: '48%' }, [tileRef('r2c1p1', '3')]),
      column('r2c2', { width: '52%' }, [tileRef('r2c2p1', '1')])
    ]),
    row('r3', {}, [column('r3c1', {}, [tileRef('r3c1p1', 'description')])]),
    row('r4', { height: 365 }, [
      column('r4c1', { width: '63%' }, [tileRef('r4c1p1', 'livingRoom')]),
      column('r4c2', { width: '37%' }, [tileRef('r4c2p1', '5')])
    ])
  ]
};

export const hoggsHollowFrenchCountryPageConfig = {
  key: 'hoggsHollowFrenchCountry',
  label: 'Hoggs Hollow French Country (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/hoggs-hollow-french-country.jsx',
  componentName: 'HoggsHollowFrenchCountry',
  type: 'detail',
  projectKey: 'hoggsHollowFrenchCountry',
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
