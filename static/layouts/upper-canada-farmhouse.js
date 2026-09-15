// Canonical layout data for
// src/pages/portfolio/renovations-additions/upper-canada-farmhouse.jsx, rendered via
// src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

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

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'upperCanadaFarmhouse',

  tiles,

  defaultLayout: [
    row({ height: 620 }, [column({}, [tileRef('newAddition')])]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 810 }, [
      column({ width: '62%' }, [tileRef('sideEntrance')]),
      column({ width: '38%' }, [
        nestedRow(row({ height: 485 }, [column({}, [tileRef('entranceHall')])])),
        nestedRow(row({ height: 290 }, [column({}, [tileRef('countryKitchenDiningRoom')])]))
      ])
    ]),
    row({ height: 350 }, [
      column({ width: '62%' }, [tileRef('masterFireplace')]),
      column({ width: '38%' }, [tileRef('ensuite')])
    ])
  ],

  wideLayout: [
    row({ height: 600 }, [
      column({ width: '60%' }, [tileRef('newAddition')]),
      column({ width: '40%' }, [tileRef('entranceHall')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 550 }, [
      column({ width: '40%' }, [tileRef('sideEntrance')]),
      column({ width: '60%' }, [tileRef('countryKitchenDiningRoom')])
    ]),
    row({ height: 350 }, [
      column({ width: '35%' }, [tileRef('masterFireplace')]),
      column({ width: '40%' }, [tileRef('vaultedMasterSuite')]),
      column({ width: '25%' }, [tileRef('ensuite')])
    ])
  ]
};

export default layout;
