// Hand-transcribed from
// src/pages/portfolio/renovations-additions/lytton-park-manor.jsx — a dual-layout
// detail page.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  newRearAddition: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347342/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/2-New-Rear-Addition_lsnrso.jpg' },
  sandstoneAndBrickFront: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347346/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/1-Sandstone-and-Brick-Front_ftxidf.jpg' },
  newEatInKitchen: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/5-New-Eat-in-Kitchen_oho9g6.jpg' },
  newLandingStairsToMasterSuite: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347340/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/4-New-Landing-_-Stairs-to-Master-Suite_jydo7j.jpg' },
  frontHallway: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347345/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/3-Front-Hallway_tasjdc.jpg' }
};

export const lyttonParkManorDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', { height: 600 }, [column('d1c1', {}, [tileRef('d1c1p1', 'sandstoneAndBrickFront')])]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 660 }, [
      column('d3c1', { width: '46%' }, [
        nestedRow('d3c1r1', row('d3c1r1row', { height: 350 }, [column('d3c1r1c1', {}, [tileRef('d3c1r1c1p1', 'newRearAddition')])])),
        nestedRow('d3c1r2', row('d3c1r2row', { height: 310 }, [column('d3c1r2c1', {}, [tileRef('d3c1r2c1p1', 'newEatInKitchen')])]))
      ]),
      column('d3c2', { width: '54%' }, [tileRef('d3c2p1', 'newLandingStairsToMasterSuite')])
    ]),
    row('d4', { height: 450 }, [column('d4c1', {}, [tileRef('d4c1p1', 'frontHallway')])])
  ],

  wideLayout: [
    row('w1', { height: 400 }, [
      column('w1c1', { width: '40%' }, [tileRef('w1c1p1', 'sandstoneAndBrickFront')]),
      column('w1c2', { width: '20%' }, [tileRef('w1c2p1', 'newLandingStairsToMasterSuite')]),
      column('w1c3', { width: '40%' }, [tileRef('w1c3p1', 'newRearAddition')])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 450 }, [
      column('w3c1', { width: '45%' }, [tileRef('w3c1p1', 'newEatInKitchen')]),
      column('w3c2', { width: '55%' }, [tileRef('w3c2p1', 'frontHallway')])
    ])
  ]
};

export const lyttonParkManorDetailPageConfig = {
  key: 'lyttonParkManorDetail',
  label: 'Lytton Park Manor (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/lytton-park-manor.jsx',
  componentName: 'LyttonParkManor',
  type: 'detail',
  projectKey: 'lyttonParkManor',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
