// Hand-transcribed from src/pages/portfolio/new-homes/oakville-executive-home.jsx —
// a dual-layout detail page.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

export const oakvilleExecutiveHomeDetailLayout = {
  tiles: {
    description: { kind: 'description' },
    frontFacade: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347328/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/1-Front-Facade_rpftbr.jpg' },
    threeCarGarage: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347327/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/2-Three-car-Garage_wxoxdf.jpg' },
    frontEntry: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347331/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/3-Front-Entry_ryc4yl.jpg' }
  },

  defaultLayout: [
    row('d1', { height: 600 }, [column('d1c1', {}, [tileRef('d1c1p1', 'frontFacade')])]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 480 }, [
      column('d3c1', { width: '62%' }, [tileRef('d3c1p1', 'threeCarGarage')]),
      column('d3c2', { width: '38%' }, [tileRef('d3c2p1', 'frontEntry')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 650 }, [
      column('w1c1', { width: '75%' }, [tileRef('w1c1p1', 'frontFacade')]),
      column('w1c2', { width: '25%' }, [
        nestedRow('w1c2r1', row('w1c2r1row', { height: 400 }, [column('w1c2r1c1', {}, [tileRef('w1c2r1c1p1', 'frontEntry')])])),
        nestedRow('w1c2r2', row('w1c2r2row', { imageHeight: 200 }, [column('w1c2r2c1', {}, [tileRef('w1c2r2c1p1', 'threeCarGarage')])]))
      ])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])])
  ]
};

export const oakvilleExecutiveHomeDetailPageConfig = {
  key: 'oakvilleExecutiveHomeDetail',
  label: 'Oakville Executive Home (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/oakville-executive-home.jsx',
  componentName: 'OakvilleExecutiveHome',
  type: 'detail',
  projectKey: 'oakvilleExecutiveHome',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
