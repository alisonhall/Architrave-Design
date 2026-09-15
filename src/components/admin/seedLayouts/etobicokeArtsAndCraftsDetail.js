// Hand-transcribed from
// src/pages/portfolio/renovations-additions/etobicoke-arts-and-crafts.jsx — a
// dual-layout detail page.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  artsAndCraftsRestyling: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347380/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/2-Arts-and-Crafts-Restyling_jydm2x.jpg' },
  before: { kind: 'image', num: 2, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347373/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/1b-Before_2_hhwjuw.jpg' },
  newReadingNook: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347382/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/6-New-Reading-Nook_khsnqo.jpg' },
  seatDrawers: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347383/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/xxSeat_Drawers_uityi0.jpg' },
  windowSeat: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347548/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/7-Window-Seat_qspbju.jpg' },
  customCabinetry: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347384/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/5-Custom-Cabinetry_zay5pm.jpg' },
  master: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347379/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/9-Master_lsvfyq.jpg' }
};

export const etobicokeArtsAndCraftsDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', {}, [
      column('d1c1', { width: '62%' }, [
        nestedRow('d1c1r1', row('d1c1r1row', { height: 480 }, [column('d1c1r1c1', {}, [tileRef('d1c1r1c1p1', 'artsAndCraftsRestyling')])])),
        nestedRow('d1c1r2', row('d1c1r2row', { height: 240 }, [
          column('d1c1r2c1', {}, [tileRef('d1c1r2c1p1', 'before')]),
          column('d1c1r2c2', {}, [tileRef('d1c1r2c2p1', 'newReadingNook')])
        ]))
      ]),
      column('d1c2', { width: '38%' }, [
        nestedRow('d1c2r1', row('d1c2r1row', { height: 215 }, [column('d1c2r1c1', {}, [tileRef('d1c2r1c1p1', 'seatDrawers')])])),
        nestedRow('d1c2r2', row('d1c2r2row', { height: 505 }, [column('d1c2r2c1', {}, [tileRef('d1c2r2c1p1', 'windowSeat')])]))
      ])
    ]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 390 }, [
      column('d3c1', { width: '48%' }, [tileRef('d3c1p1', 'customCabinetry')]),
      column('d3c2', { width: '52%' }, [tileRef('d3c2p1', 'master')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 600 }, [
      column('w1c1', { width: '70%' }, [tileRef('w1c1p1', 'artsAndCraftsRestyling')]),
      column('w1c2', { width: '30%' }, [
        nestedRow('w1c2r1', row('w1c2r1row', {}, [column('w1c2r1c1', {}, [tileRef('w1c2r1c1p1', 'before')])])),
        nestedRow('w1c2r2', row('w1c2r2row', {}, [column('w1c2r2c1', {}, [tileRef('w1c2r2c1p1', 'seatDrawers')])]))
      ])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 340 }, [
      column('w3c1', {}, [tileRef('w3c1p1', 'master')]),
      column('w3c2', {}, [tileRef('w3c2p1', 'customCabinetry')]),
      column('w3c3', {}, [tileRef('w3c3p1', 'newReadingNook')])
    ])
  ]
};

export const etobicokeArtsAndCraftsDetailPageConfig = {
  key: 'etobicokeArtsAndCraftsDetail',
  label: 'Etobicoke Arts and Crafts (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/etobicoke-arts-and-crafts.jsx',
  componentName: 'EtobicokeArtsAndCrafts',
  type: 'detail',
  projectKey: 'etobicokeArtsAndCrafts',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
