// Hand-transcribed from src/pages/portfolio/new-homes/kingsway-transitional.jsx — a
// dual-layout detail page with a bare `<Item />` spacer (nodeType 'empty').

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });
const empty = (id) => ({ id, nodeType: 'empty' });

const tiles = {
  description: { kind: 'description' },
  traditionalFrontFacade: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224718/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/wllgq8z17m_qlavce.jpg' },
  frontAlternative: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224720/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/t3me2mc9ik_so4o4x.jpg' },
  modernRear: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347233/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/2-Modern-Rear_juviao.jpg' },
  entrancewayDining: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224738/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/inzkd3co1u_k78khw.jpg' },
  entrance: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224731/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/9ynkmnemea_xi4jy3.jpg' },
  entranceHallway: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224712/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/wyiw0roxqk_pdosis.jpg' },
  livingRoomKitchen: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224715/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/wpmfr17qls_cwaye2.jpg' },
  livingRoom: { kind: 'image', num: 8, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224733/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/8a5rn0jhm9_yayhnq.jpg' },
  kitchen: { kind: 'image', num: 9, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224735/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/9yil46v4lj_s8tjbi.jpg' },
  breakfastTable: { kind: 'image', num: 10, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224715/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/vkdzuxidqt_qcdfzk.jpg' },
  staircase: { kind: 'image', num: 11, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224730/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/nb2m6t67mu_intdkd.jpg' },
  upstairsHallway: { kind: 'image', num: 12, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224736/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/tfeivoj6j0_ztt97m.jpg' },
  masterBedroom: { kind: 'image', num: 13, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224733/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/5ezfxtm9pp_cdqizs.jpg' },
  bedroomDoors: { kind: 'image', num: 14, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224726/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/5wxqms5oi8_ohgn7k.jpg' },
  bathroomSinks: { kind: 'image', num: 15, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224713/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/2wl8dux9ys_pirdbm.jpg' },
  bathroomTub: { kind: 'image', num: 16, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1690224735/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/qih7wzw9i8_egspcu.jpg' }
};

const pairedRow = (id, height, leftTile, rightTile) => row(id, { height }, [
  column(`${id}c1`, {}, [tileRef(`${id}c1p1`, leftTile)]),
  column(`${id}c2`, {}, [tileRef(`${id}c2p1`, rightTile)])
]);

export const kingswayTransitionalDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', { height: 340 }, [
      column('d1c1', {}, [tileRef('d1c1p1', 'traditionalFrontFacade')]),
      column('d1c2', {}, [tileRef('d1c2p1', 'frontAlternative')])
    ]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 400 }, [
      column('d3c1', { width: '50%' }, [tileRef('d3c1p1', 'modernRear')]),
      column('d3c2', { width: '50%' }, [
        nestedRow('d3c2r1', row('d3c2r1row', { height: 350 }, [column('d3c2r1c1', {}, [tileRef('d3c2r1c1p1', 'entrancewayDining')])])),
        nestedRow('d3c2r2', row('d3c2r2row', {}, [column('d3c2r2c1', {}, [empty('d3c2r2c1e')])]))
      ])
    ]),
    pairedRow('d4', 340, 'entrance', 'entranceHallway'),
    pairedRow('d5', 340, 'livingRoomKitchen', 'livingRoom'),
    pairedRow('d6', 340, 'kitchen', 'breakfastTable'),
    pairedRow('d7', 340, 'staircase', 'upstairsHallway'),
    pairedRow('d8', 340, 'masterBedroom', 'bedroomDoors'),
    pairedRow('d9', 340, 'bathroomSinks', 'bathroomTub')
  ],

  wideLayout: [
    row('w1', { height: 440 }, [
      column('w1c1', {}, [tileRef('w1c1p1', 'traditionalFrontFacade')]),
      column('w1c2', {}, [tileRef('w1c2p1', 'frontAlternative')])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 500 }, [
      column('w3c1', { width: '50%' }, [tileRef('w3c1p1', 'modernRear')]),
      column('w3c2', { width: '50%' }, [
        nestedRow('w3c2r1', row('w3c2r1row', { height: 400 }, [column('w3c2r1c1', {}, [tileRef('w3c2r1c1p1', 'entrancewayDining')])])),
        nestedRow('w3c2r2', row('w3c2r2row', {}, [column('w3c2r2c1', {}, [empty('w3c2r2c1e')])]))
      ])
    ]),
    pairedRow('w4', 440, 'entrance', 'entranceHallway'),
    pairedRow('w5', 440, 'livingRoomKitchen', 'livingRoom'),
    pairedRow('w6', 440, 'kitchen', 'breakfastTable'),
    pairedRow('w7', 440, 'staircase', 'upstairsHallway'),
    pairedRow('w8', 440, 'masterBedroom', 'bedroomDoors'),
    pairedRow('w9', 440, 'bathroomSinks', 'bathroomTub')
  ]
};

export const kingswayTransitionalDetailPageConfig = {
  key: 'kingswayTransitionalDetail',
  label: 'Kingsway Transitional (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/kingsway-transitional.jsx',
  componentName: 'KingswayTransitional',
  type: 'detail',
  projectKey: 'kingswayTransitional',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
