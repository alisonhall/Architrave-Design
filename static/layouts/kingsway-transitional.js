// Canonical layout data for src/pages/portfolio/new-homes/kingsway-transitional.jsx,
// rendered via src/components/detailPageLayout.jsx. Includes a bare-placeholder
// placement (nodeType 'empty').

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });
const empty = () => ({ nodeType: 'empty' });

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

const pairedRow = (height, leftTile, rightTile) => row({ height }, [
  column({}, [tileRef(leftTile)]),
  column({}, [tileRef(rightTile)])
]);

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'kingswayTransitional',

  tiles,

  defaultLayout: [
    row({ height: 340 }, [
      column({}, [tileRef('traditionalFrontFacade')]),
      column({}, [tileRef('frontAlternative')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 400 }, [
      column({ width: '50%' }, [tileRef('modernRear')]),
      column({ width: '50%' }, [
        nestedRow(row({ height: 350 }, [column({}, [tileRef('entrancewayDining')])])),
        nestedRow(row({}, [column({}, [empty()])]))
      ])
    ]),
    pairedRow(340, 'entrance', 'entranceHallway'),
    pairedRow(340, 'livingRoomKitchen', 'livingRoom'),
    pairedRow(340, 'kitchen', 'breakfastTable'),
    pairedRow(340, 'staircase', 'upstairsHallway'),
    pairedRow(340, 'masterBedroom', 'bedroomDoors'),
    pairedRow(340, 'bathroomSinks', 'bathroomTub')
  ],

  wideLayout: [
    row({ height: 440 }, [
      column({}, [tileRef('traditionalFrontFacade')]),
      column({}, [tileRef('frontAlternative')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 500 }, [
      column({ width: '50%' }, [tileRef('modernRear')]),
      column({ width: '50%' }, [
        nestedRow(row({ height: 400 }, [column({}, [tileRef('entrancewayDining')])])),
        nestedRow(row({}, [column({}, [empty()])]))
      ])
    ]),
    pairedRow(440, 'entrance', 'entranceHallway'),
    pairedRow(440, 'livingRoomKitchen', 'livingRoom'),
    pairedRow(440, 'kitchen', 'breakfastTable'),
    pairedRow(440, 'staircase', 'upstairsHallway'),
    pairedRow(440, 'masterBedroom', 'bedroomDoors'),
    pairedRow(440, 'bathroomSinks', 'bathroomTub')
  ]
};

export default layout;
