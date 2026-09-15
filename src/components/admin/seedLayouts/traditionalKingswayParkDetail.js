// Hand-transcribed from
// src/pages/portfolio/new-homes/traditional-kingsway-park.jsx — a dual-layout detail
// page with a bare `<Item />` spacer (nodeType 'empty').

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });
const empty = (id) => ({ id, nodeType: 'empty' });

export const traditionalKingswayParkDetailLayout = {
  tiles: {
    description: { kind: 'description' },
    traditionalStoneFront: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347271/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/1-Traditional-Stone-Front_mk1zvn.jpg' },
    frontFoyer: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347268/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/2-Front-Foyer_uc6wxy.jpg' },
    diningRoom: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347269/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/3-Dining-Room_hegcnz.jpg' },
    familyRoomBuiltins: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347269/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/4-Family-Room-Builtins_duyso3.jpg' },
    familyRoomKitchen: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347270/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/5-Family-_Room-_-Kitchen_nqonjc.jpg' },
    masterEnsuite: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347270/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/7-Master-Ensuite_g5n9vl.jpg' },
    kitchenIsland: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347268/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/6-Kitchen-Island_htgx13.jpg' }
  },

  defaultLayout: [
    row('d1', { height: 630 }, [column('d1c1', {}, [tileRef('d1c1p1', 'traditionalStoneFront')])]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 425 }, [
      column('d3c1', { width: '34%' }, [tileRef('d3c1p1', 'frontFoyer')]),
      column('d3c2', { width: '66%' }, [tileRef('d3c2p1', 'diningRoom')])
    ]),
    row('d4', { height: 525 }, [column('d4c1', {}, [tileRef('d4c1p1', 'familyRoomBuiltins')])]),
    row('d5', { height: 270 }, [
      column('d5c1', { width: '47%' }, [
        nestedRow('d5c1r1', row('d5c1r1row', {}, [column('d5c1r1c1', {}, [empty('d5c1r1c1e')])])),
        nestedRow('d5c1r2', row('d5c1r2row', { height: 200 }, [column('d5c1r2c1', {}, [tileRef('d5c1r2c1p1', 'familyRoomKitchen')])]))
      ]),
      column('d5c2', { width: '53%' }, [tileRef('d5c2p1', 'masterEnsuite')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 400 }, [
      column('w1c1', { width: '44%' }, [tileRef('w1c1p1', 'traditionalStoneFront')]),
      column('w1c2', { width: '20%' }, [tileRef('w1c2p1', 'frontFoyer')]),
      column('w1c3', { width: '36%' }, [tileRef('w1c3p1', 'diningRoom')])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 325 }, [
      column('w3c1', { width: '38%' }, [tileRef('w3c1p1', 'familyRoomBuiltins')]),
      column('w3c2', { width: '24%' }, [tileRef('w3c2p1', 'kitchenIsland')]),
      column('w3c3', { width: '38%' }, [tileRef('w3c3p1', 'familyRoomKitchen')])
    ])
  ]
};

export const traditionalKingswayParkDetailPageConfig = {
  key: 'traditionalKingswayParkDetail',
  label: 'Traditional Kingsway Park (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/traditional-kingsway-park.jsx',
  componentName: 'TraditionalKingswayPark',
  type: 'detail',
  projectKey: 'traditionalKingswayPark',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
