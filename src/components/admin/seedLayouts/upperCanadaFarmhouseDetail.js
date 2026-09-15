// Hand-transcribed from
// src/pages/portfolio/renovations-additions/upper-canada-farmhouse.jsx — a
// dual-layout detail page.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  newAddition: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/1-1820_s-Farmhouse-_-New-Addition_qh1ha2.jpg' },
  sideEntrance: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347367/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/2-Side-Entrance_smshkr.jpg' },
  entranceHall: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347367/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/3c-Entrance-Hall_szk4bq.jpg' },
  countryKitchenDiningRoom: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/4-Country-Kitchen-Dining-Room_iqgnfl.jpg' },
  masterFireplace: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347370/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/6-Master-Fireplace_wjx75m.jpg' },
  ensuite: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347364/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/7-Ensuite_wb7epo.jpg' },
  vaultedMasterSuite: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347357/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/5-Vaulted-Master-Suite_gdt5k0.jpg' }
};

export const upperCanadaFarmhouseDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', { height: 620 }, [column('d1c1', {}, [tileRef('d1c1p1', 'newAddition')])]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 810 }, [
      column('d3c1', { width: '62%' }, [tileRef('d3c1p1', 'sideEntrance')]),
      column('d3c2', { width: '38%' }, [
        nestedRow('d3c2r1', row('d3c2r1row', { height: 485 }, [column('d3c2r1c1', {}, [tileRef('d3c2r1c1p1', 'entranceHall')])])),
        nestedRow('d3c2r2', row('d3c2r2row', { height: 290 }, [column('d3c2r2c1', {}, [tileRef('d3c2r2c1p1', 'countryKitchenDiningRoom')])]))
      ])
    ]),
    row('d4', { height: 350 }, [
      column('d4c1', { width: '62%' }, [tileRef('d4c1p1', 'masterFireplace')]),
      column('d4c2', { width: '38%' }, [tileRef('d4c2p1', 'ensuite')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 600 }, [
      column('w1c1', { width: '60%' }, [tileRef('w1c1p1', 'newAddition')]),
      column('w1c2', { width: '40%' }, [tileRef('w1c2p1', 'entranceHall')])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 550 }, [
      column('w3c1', { width: '40%' }, [tileRef('w3c1p1', 'sideEntrance')]),
      column('w3c2', { width: '60%' }, [tileRef('w3c2p1', 'countryKitchenDiningRoom')])
    ]),
    row('w4', { height: 350 }, [
      column('w4c1', { width: '35%' }, [tileRef('w4c1p1', 'masterFireplace')]),
      column('w4c2', { width: '40%' }, [tileRef('w4c2p1', 'vaultedMasterSuite')]),
      column('w4c3', { width: '25%' }, [tileRef('w4c3p1', 'ensuite')])
    ])
  ]
};

export const upperCanadaFarmhouseDetailPageConfig = {
  key: 'upperCanadaFarmhouseDetail',
  label: 'Upper Canada Farmhouse (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/upper-canada-farmhouse.jsx',
  componentName: 'UpperCanadaFarmhouse',
  type: 'detail',
  projectKey: 'upperCanadaFarmhouse',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
