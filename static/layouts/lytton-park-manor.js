// Canonical layout data for
// src/pages/portfolio/renovations-additions/lytton-park-manor.jsx, rendered via
// src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  newRearAddition: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347342/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/2-New-Rear-Addition_lsnrso.jpg' },
  sandstoneAndBrickFront: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347346/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/1-Sandstone-and-Brick-Front_ftxidf.jpg' },
  newEatInKitchen: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/5-New-Eat-in-Kitchen_oho9g6.jpg' },
  newLandingStairsToMasterSuite: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347340/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/4-New-Landing-_-Stairs-to-Master-Suite_jydo7j.jpg' },
  frontHallway: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/3-Front-Hallway_tasjdc.jpg' }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'lyttonParkManor',

  tiles,

  defaultLayout: [
    row({ height: 600 }, [column({}, [tileRef('sandstoneAndBrickFront')])]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 660 }, [
      column({ width: '46%' }, [
        nestedRow(row({ height: 350 }, [column({}, [tileRef('newRearAddition')])])),
        nestedRow(row({ height: 310 }, [column({}, [tileRef('newEatInKitchen')])]))
      ]),
      column({ width: '54%' }, [tileRef('newLandingStairsToMasterSuite')])
    ]),
    row({ height: 450 }, [column({}, [tileRef('frontHallway')])])
  ],

  wideLayout: [
    row({ height: 400 }, [
      column({ width: '40%' }, [tileRef('sandstoneAndBrickFront')]),
      column({ width: '20%' }, [tileRef('newLandingStairsToMasterSuite')]),
      column({ width: '40%' }, [tileRef('newRearAddition')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 450 }, [
      column({ width: '45%' }, [tileRef('newEatInKitchen')]),
      column({ width: '55%' }, [tileRef('frontHallway')])
    ])
  ]
};

export default layout;
