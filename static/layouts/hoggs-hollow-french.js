// Canonical layout data for src/pages/portfolio/new-homes/hoggs-hollow-french.jsx,
// rendered via src/components/detailPageLayout.jsx. Several tiles intentionally
// share the same num (6) in the live design; preserved exactly.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  ellipticalStair: { kind: 'image', num: 1, backgroundPosition: '100% 0%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg' },
  frontFacade: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/1-Front-Facade_iieaut.jpg' },
  riversideTerraces: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347175/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/8-Riverside-Terraces_ukricc.jpg' },
  customPool: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/9-Custom-Pool_rj5teb.jpg' },
  cofferedFamilyRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347177/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/3-Coffered-Family-Room_ayggrb.jpg' },
  eatInKitchen: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347167/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/4-Eat-in-Kitchen_owcnvf.jpg' },
  livingRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/7-Living-Rm_x76pxj.jpg' },
  diningRoom: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347166/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/6-Dining-Room_vuj7ds.jpg' },
  masterBedroom: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347170/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/11-MasterBedroom_g2vzif.jpg' },
  masterEnsuite: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347169/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/10-MasterEnsuite_lojx17.jpg' },
  bedroom4: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347171/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/Bedroom4_wxob4w.jpg' }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'hoggsHollowFrench',

  tiles,

  defaultLayout: [
    row({ height: 645 }, [
      column({ width: '48%' }, [tileRef('ellipticalStair')]),
      column({ width: '52%' }, [
        nestedRow(row({ height: 340 }, [column({}, [tileRef('frontFacade')])])),
        nestedRow(row({ height: 305 }, [column({}, [tileRef('riversideTerraces')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '48%' }, [tileRef('customPool')]),
      column({ width: '52%' }, [tileRef('cofferedFamilyRoom')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('eatInKitchen')]),
      column({}, [tileRef('diningRoom')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('masterBedroom')]),
      column({}, [tileRef('masterEnsuite')]),
      column({}, [tileRef('bedroom4')])
    ])
  ],

  wideLayout: [
    row({ height: 450 }, [
      column({ width: '25%' }, [tileRef('ellipticalStair')]),
      column({ width: '50%' }, [tileRef('frontFacade')]),
      column({ width: '25%' }, [
        nestedRow(row({ height: 200 }, [column({}, [tileRef('riversideTerraces')])])),
        nestedRow(row({ imageHeight: 250 }, [column({}, [tileRef('customPool')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '32%' }, [tileRef('cofferedFamilyRoom')]),
      column({ width: '36%' }, [tileRef('eatInKitchen')]),
      column({ width: '32%' }, [tileRef('diningRoom')])
    ]),
    row({ height: 300 }, [
      column({}, [tileRef('masterBedroom')]),
      column({}, [tileRef('masterEnsuite')]),
      column({}, [tileRef('bedroom4')])
    ])
  ]
};

export default layout;
