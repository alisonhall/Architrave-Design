// Canonical layout data for
// src/pages/portfolio/new-homes/traditional-kingsway-park.jsx, rendered via
// src/components/detailPageLayout.jsx. Includes a bare-placeholder placement
// (nodeType 'empty').

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });
const empty = () => ({ nodeType: 'empty' });

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'traditionalKingswayPark',

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
    row({ height: 630 }, [column({}, [tileRef('traditionalStoneFront')])]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 425 }, [
      column({ width: '34%' }, [tileRef('frontFoyer')]),
      column({ width: '66%' }, [tileRef('diningRoom')])
    ]),
    row({ height: 525 }, [column({}, [tileRef('familyRoomBuiltins')])]),
    row({ height: 270 }, [
      column({ width: '47%' }, [
        nestedRow(row({}, [column({}, [empty()])])),
        nestedRow(row({ height: 200 }, [column({}, [tileRef('familyRoomKitchen')])]))
      ]),
      column({ width: '53%' }, [tileRef('masterEnsuite')])
    ])
  ],

  wideLayout: [
    row({ height: 400 }, [
      column({ width: '44%' }, [tileRef('traditionalStoneFront')]),
      column({ width: '20%' }, [tileRef('frontFoyer')]),
      column({ width: '36%' }, [tileRef('diningRoom')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 325 }, [
      column({ width: '38%' }, [tileRef('familyRoomBuiltins')]),
      column({ width: '24%' }, [tileRef('kitchenIsland')]),
      column({ width: '38%' }, [tileRef('familyRoomKitchen')])
    ])
  ]
};

export default layout;
