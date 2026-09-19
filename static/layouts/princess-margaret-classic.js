// Canonical layout data for
// src/pages/portfolio/new-homes/princess-margaret-classic.jsx, rendered via
// src/components/detailPageLayout.jsx. Includes 3 embed tiles (Kuula 360°-tour
// iframes), the first pages to use that tile kind.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

const tiles = {
  description: { kind: 'description' },
  frontFacadeWithGarage: {
    kind: 'image',
    num: 1,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209319/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/1_x7zkiz.jpg',
    backgroundPosition: '100% 0%'
  },
  frontFacade: {
    kind: 'image',
    num: 2,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209319/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/2_ah1ebs.jpg',
    backgroundPosition: '35% 40%'
  },
  pool: {
    kind: 'image',
    num: 3,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209319/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/3_bf2mb2.jpg',
    backgroundPosition: '100% 100%'
  },
  couch: {
    kind: 'image',
    num: 4,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209318/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/4_im2bye.jpg',
    backgroundPosition: '50% 70%'
  },
  entranceStairway: {
    kind: 'image',
    num: 5,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209318/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/5_fzrdsw.jpg',
    backgroundPosition: '0% 100%'
  },
  diningTable: {
    kind: 'image',
    num: 6,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209343/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/6_uimiia.jpg',
    backgroundPosition: '50% 80%'
  },
  kitchen: {
    kind: 'image',
    num: 7,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209343/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/8_uii1fg.jpg',
    backgroundPosition: '20% 80%'
  },
  fireplace: {
    kind: 'image',
    num: 8,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209345/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/10_ldpclf.jpg'
  },
  mudroom: {
    kind: 'image',
    num: 9,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209345/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/11_l5rvhs.jpg'
  },
  bedroom: {
    kind: 'image',
    num: 10,
    imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1776209345/ArchitraveDesign/1-New-Homes/8-Princess-Margaret-Classic/12_goklqz.jpg',
    backgroundPosition: '70% 50%'
  },
  kitchen360: {
    kind: 'embed',
    num: 11,
    html: '<iframe width="100%" height="500" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/LlHdJ?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>'
  },
  livingDining360: {
    kind: 'embed',
    num: 12,
    html: '<iframe width="100%" height="400" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/LlHdT?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>'
  },
  upstairs360: {
    kind: 'embed',
    num: 13,
    html: '<iframe width="100%" height="400" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/LlHdt?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.43&thumbs=1"></iframe>'
  }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'princessMargaretClassic',

  tiles,

  defaultLayout: [
    row({ height: 450 }, [
      column({ width: '66%' }, [tileRef('frontFacadeWithGarage')]),
      column({ width: '33%' }, [tileRef('frontFacade')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 500 }, [column({}, [tileRef('kitchen360')])]),
    row({ height: 350 }, [
      column({ width: '62%' }, [tileRef('pool')]),
      column({ width: '38%' }, [tileRef('couch')])
    ]),
    row({ height: 400 }, [
      column({}, [tileRef('livingDining360')]),
      column({}, [tileRef('upstairs360')])
    ]),
    row({ height: 350 }, [
      column({ width: '32%' }, [tileRef('entranceStairway')]),
      column({ width: '32%' }, [tileRef('diningTable')]),
      column({ width: '32%' }, [tileRef('kitchen')])
    ]),
    row({ height: 350 }, [
      column({ width: '48%' }, [tileRef('fireplace')]),
      column({ width: '26%' }, [tileRef('mudroom')]),
      column({ width: '26%' }, [tileRef('bedroom')])
    ])
  ],

  wideLayout: [
    row({ height: 600 }, [
      column({ width: '66%' }, [tileRef('frontFacadeWithGarage')]),
      column({ width: '33%' }, [tileRef('frontFacade')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 500 }, [column({}, [tileRef('kitchen360')])]),
    row({ height: 480 }, [
      column({ width: '62%' }, [tileRef('pool')]),
      column({ width: '38%' }, [tileRef('couch')])
    ]),
    row({ height: 400 }, [
      column({}, [tileRef('livingDining360')]),
      column({}, [tileRef('upstairs360')])
    ]),
    row({ height: 480 }, [
      column({ width: '32%' }, [tileRef('entranceStairway')]),
      column({ width: '32%' }, [tileRef('diningTable')]),
      column({ width: '32%' }, [tileRef('kitchen')])
    ]),
    row({ height: 480 }, [
      column({ width: '48%' }, [tileRef('fireplace')]),
      column({ width: '26%' }, [tileRef('mudroom')]),
      column({ width: '26%' }, [tileRef('bedroom')])
    ])
  ]
};

export default layout;
