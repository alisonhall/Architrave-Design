// Canonical layout data for src/pages/portfolio/new-homes/hoggs-hollow-traditional.jsx,
// rendered via src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const layout = {
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey: 'hoggsHollowTraditional',

  tiles: {
    description: { kind: 'description' },
    ellipticalStair: { kind: 'image', num: 1, backgroundPosition: '100% 0%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg' },
    frontFacade: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/1-Front-Facade_iieaut.jpg' },
    riversideTerraces: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347175/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/8-Riverside-Terraces_ukricc.jpg' },
    customPool: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/9-Custom-Pool_rj5teb.jpg' },
    cofferedFamilyRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347177/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/3-Coffered-Family-Room_ayggrb.jpg' }
  },

  layout: [
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
    ])
  ]
};

export default layout;
