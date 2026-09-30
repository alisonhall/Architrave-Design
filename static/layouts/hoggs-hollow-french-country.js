// Canonical layout data for
// src/pages/portfolio/new-homes/hoggs-hollow-french-country.jsx, rendered via
// src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

const layout = {
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey: 'hoggsHollowFrenchCountry',

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
    row({ height: 390 }, [
      column({ width: '63%' }, [tileRef('eatInKitchen')]),
      column({ width: '37%' }, [tileRef('2')])
    ]),
    row({ height: 290 }, [
      column({ width: '48%' }, [tileRef('3')]),
      column({ width: '52%' }, [tileRef('1')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 365 }, [
      column({ width: '63%' }, [tileRef('livingRoom')]),
      column({ width: '37%' }, [tileRef('5')])
    ])
  ]
};

export default layout;
