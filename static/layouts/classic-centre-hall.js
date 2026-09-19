// Canonical layout data for src/pages/portfolio/new-homes/classic-centre-hall.jsx,
// rendered via src/components/detailPageLayout.jsx. Includes 1 embed tile (a Kuula
// 360°-tour iframe). `customKitchen` and `entraceway360` both explicitly carry `num: 4`
// — a pre-existing duplicate on the live site, preserved here rather than "fixed",
// since this migration must not change rendered output.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

const tiles = {
  description: { kind: 'description' },
  cutStoneFacade: {
    kind: 'image',
    num: 1,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg'
  },
  limestoneDetail: {
    kind: 'image',
    num: 2,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/2-Limestone-Detail_l6fs59.jpg'
  },
  twoStoreyMainHall: {
    kind: 'image',
    num: 3,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/3-Two-Storey-Main-Hall_ejywhy.jpg'
  },
  customKitchen: {
    kind: 'image',
    num: 4,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/4-Custom-Kitchen_odkxdb.jpg'
  },
  familyRoom: {
    kind: 'image',
    num: 5,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/5-Family-Room_gdmmua.jpg'
  },
  entranceway: {
    kind: 'image',
    num: 6,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/xxKing_Georges_Rd_003_cneudt.jpg'
  },
  upperHall: {
    kind: 'image',
    num: 7,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/7-Upper_Hall_mvytmk.jpg'
  },
  homeOffice: {
    kind: 'image',
    num: 8,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/10-Home-Office_aozszs.jpg'
  },
  masterBedroom: {
    kind: 'image',
    num: 9,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/8-Master-Bedroom_l9mlyp.jpg'
  },
  masterEnsuite: {
    kind: 'image',
    num: 10,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/9-Master-Ensuite_ce0yej.jpg'
  },
  jackNJillVanities: {
    kind: 'image',
    num: 11,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/11-Jack_n_Jill-Vanities_btkar8.jpg'
  },
  entraceway360: {
    kind: 'embed',
    num: 4,
    html: '<iframe title="Entranceway 360 degree interactive panorama" width="100%" height="640" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/7rcnJ?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>'
  }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'classicCentreHall',

  tiles,

  defaultLayout: [
    row({ height: 332 }, [
      column({}, [tileRef('cutStoneFacade')]),
      column({}, [tileRef('limestoneDetail')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({}, [column({}, [tileRef('entraceway360')])]),
    row({ height: 300 }, [
      column({}, [tileRef('entranceway')]),
      column({}, [tileRef('customKitchen')]),
      column({}, [tileRef('familyRoom')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('twoStoreyMainHall')]),
      column({}, [tileRef('upperHall')]),
      column({}, [tileRef('homeOffice')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('masterBedroom')]),
      column({}, [tileRef('masterEnsuite')]),
      column({}, [tileRef('jackNJillVanities')])
    ])
  ],

  wideLayout: [
    row({ height: 450 }, [
      column({}, [tileRef('cutStoneFacade')]),
      column({}, [tileRef('limestoneDetail')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({}, [column({}, [tileRef('entraceway360')])]),
    row({ height: 300 }, [
      column({}, [tileRef('entranceway')]),
      column({}, [tileRef('customKitchen')]),
      column({}, [tileRef('familyRoom')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('upperHall')]),
      column({}, [tileRef('twoStoreyMainHall')]),
      column({}, [tileRef('homeOffice')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('masterBedroom')]),
      column({}, [tileRef('masterEnsuite')]),
      column({}, [tileRef('jackNJillVanities')])
    ])
  ]
};

export default layout;
