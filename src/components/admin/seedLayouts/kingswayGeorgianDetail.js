// Hand-transcribed from src/pages/portfolio/new-homes/kingsway-georgian.jsx — a
// dual-layout detail page with two bare `<Item />` spacer placements (nodeType
// 'empty' — see layoutHelpers.js).

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });
const empty = (id) => ({ id, nodeType: 'empty' });

const tiles = {
  description: { kind: 'description' },
  frontFacade: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/1-Front-Facade_eohlwb.jpg' },
  cutStonePortico: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347138/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/2-Cut-Stone_Portico_doxm8y.jpg' },
  backGarden: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/3-Back-Garden_bczadu.jpg' },
  familyRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347145/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/7-Family-Room_lh91x1.jpg' },
  kitchen: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/8-Kitchen_mrd8z9.jpg' },
  mainHall: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/5-Main-Hall_txsam1.jpg' },
  islandServery: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/10-Island-_-Servery_whpyxm.jpg' },
  sittingRoom: { kind: 'image', num: 8, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347140/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/6-Sitting-Room_et7o9z.jpg' },
  breakfastBanquette: { kind: 'image', num: 9, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/9-Breakfast-Banquette_plhghs.jpg' },
  landingWindowSeat: { kind: 'image', num: 10, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/11-Landing-_-Window-seat_y0xb7c.jpg' },
  freestandingTub: { kind: 'image', num: 11, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/13-Freestanding-Tub_oo8ylx.jpg' },
  thirdFloorGuestSuite: { kind: 'image', num: 12, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347151/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/15-Third-Floor-Guest-Suite_my5izk.jpg' },
  marbleFoyer: { kind: 'image', num: 13, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347139/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/4-Marble-Foyer_ogejte.jpg' },
  ensuiteWithHisHersVanities: { kind: 'image', num: 14, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347146/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/12-Ensuite-with-His-_-Hers-Vanities_x1h75n.jpg' },
  jackNJillBathroom: { kind: 'image', num: 15, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/14-Jack_n_Jill-Bathroom_lxvxyl.jpg' }
};

export const kingswayGeorgianDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', { height: 750 }, [column('d1c1', {}, [tileRef('d1c1p1', 'frontFacade')])]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', {}, [
      column('d3c1', { width: '35%' }, [
        nestedRow('d3c1r1', row('d3c1r1row', { height: 400 }, [column('d3c1r1c1', {}, [tileRef('d3c1r1c1p1', 'cutStonePortico')])])),
        nestedRow('d3c1r2', row('d3c1r2row', {}, [column('d3c1r2c1', {}, [tileRef('d3c1r2c1p1', 'backGarden')])]))
      ]),
      column('d3c2', { width: '65%' }, [
        nestedRow('d3c2r1', row('d3c2r1row', { height: 700 }, [column('d3c2r1c1', {}, [tileRef('d3c2r1c1p1', 'mainHall')])])),
        nestedRow('d3c2r2', row('d3c2r2row', {}, [column('d3c2r2c1', {}, [empty('d3c2r2c1e')])]))
      ])
    ]),
    row('d4', {}, [
      column('d4c1', { width: '58%' }, [
        nestedRow('d4c1r1', row('d4c1r1row', { height: 350 }, [column('d4c1r1c1', {}, [tileRef('d4c1r1c1p1', 'familyRoom')])])),
        nestedRow('d4c1r2', row('d4c1r2row', { height: 350 }, [column('d4c1r2c1', {}, [tileRef('d4c1r2c1p1', 'kitchen')])])),
        nestedRow('d4c1r3', row('d4c1r3row', { height: 350 }, [column('d4c1r3c1', {}, [tileRef('d4c1r3c1p1', 'islandServery')])]))
      ]),
      column('d4c2', { width: '42%' }, [
        nestedRow('d4c2r1', row('d4c2r1row', { height: 540 }, [column('d4c2r1c1', {}, [tileRef('d4c2r1c1p1', 'sittingRoom')])])),
        nestedRow('d4c2r2', row('d4c2r2row', { height: 540 }, [column('d4c2r2c1', {}, [tileRef('d4c2r2c1p1', 'breakfastBanquette')])]))
      ])
    ]),
    row('d5', { height: 350 }, [
      column('d5c1', { width: '34%' }, [tileRef('d5c1p1', 'landingWindowSeat')]),
      column('d5c2', { width: '32%' }, [tileRef('d5c2p1', 'freestandingTub')]),
      column('d5c3', { width: '34%' }, [tileRef('d5c3p1', 'thirdFloorGuestSuite')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 500 }, [
      column('w1c1', { width: '45%' }, [tileRef('w1c1p1', 'frontFacade')]),
      column('w1c2', { width: '25%' }, [tileRef('w1c2p1', 'cutStonePortico')]),
      column('w1c3', { width: '30%' }, [tileRef('w1c3p1', 'backGarden')])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 350 }, [
      column('w3c1', { width: '20%' }, [tileRef('w3c1p1', 'marbleFoyer')]),
      column('w3c2', { width: '20%' }, [tileRef('w3c2p1', 'sittingRoom')]),
      column('w3c3', { width: '20%' }, [tileRef('w3c3p1', 'mainHall')]),
      column('w3c4', { width: '40%' }, [
        nestedRow('w3c4r1', row('w3c4r1row', { height: 275 }, [column('w3c4r1c1', {}, [tileRef('w3c4r1c1p1', 'familyRoom')])])),
        nestedRow('w3c4r2', row('w3c4r2row', {}, [column('w3c4r2c1', {}, [empty('w3c4r2c1e')])]))
      ])
    ]),
    row('w4', { height: 325 }, [
      column('w4c1', { width: '17%' }, [tileRef('w4c1p1', 'breakfastBanquette')]),
      column('w4c2', { width: '43%' }, [tileRef('w4c2p1', 'kitchen')]),
      column('w4c3', { width: '40%' }, [tileRef('w4c3p1', 'islandServery')])
    ]),
    row('w5', { height: 400 }, [
      column('w5c1', { width: '27%' }, [tileRef('w5c1p1', 'landingWindowSeat')]),
      column('w5c2', { width: '23%' }, [tileRef('w5c2p1', 'ensuiteWithHisHersVanities')]),
      column('w5c3', { width: '23%' }, [tileRef('w5c3p1', 'jackNJillBathroom')]),
      column('w5c4', { width: '27%' }, [tileRef('w5c4p1', 'thirdFloorGuestSuite')])
    ])
  ]
};

export const kingswayGeorgianDetailPageConfig = {
  key: 'kingswayGeorgianDetail',
  label: 'Kingsway Georgian (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/kingsway-georgian.jsx',
  componentName: 'KingswayGeorgian',
  type: 'detail',
  projectKey: 'kingswayGeorgian',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
