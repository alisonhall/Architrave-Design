// Canonical layout data for src/pages/portfolio/new-homes/oakville-executive-home.jsx,
// rendered via src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'oakvilleExecutiveHome',

  tiles: {
    description: { kind: 'description' },
    frontFacade: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347328/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/1-Front-Facade_rpftbr.jpg' },
    threeCarGarage: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347327/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/2-Three-car-Garage_wxoxdf.jpg' },
    frontEntry: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347331/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/3-Front-Entry_ryc4yl.jpg' }
  },

  defaultLayout: [
    row({ height: 600 }, [column({}, [tileRef('frontFacade')])]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 480 }, [
      column({ width: '62%' }, [tileRef('threeCarGarage')]),
      column({ width: '38%' }, [tileRef('frontEntry')])
    ])
  ],

  wideLayout: [
    row({ height: 650 }, [
      column({ width: '75%' }, [tileRef('frontFacade')]),
      column({ width: '25%' }, [
        nestedRow(row({ height: 400 }, [column({}, [tileRef('frontEntry')])])),
        nestedRow(row({ imageHeight: 200 }, [column({}, [tileRef('threeCarGarage')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])])
  ]
};

export default layout;
