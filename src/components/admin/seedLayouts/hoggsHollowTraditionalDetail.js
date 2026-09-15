// Hand-transcribed from src/pages/portfolio/new-homes/hoggs-hollow-traditional.jsx —
// a single-section detail page bound to the hoggsHollowTraditional project. Also
// confusingly named HoggsHollowTraditional in the source, like the dual-layout page in
// hoggsHollowFrenchDetail.js (which is bound to a *different* project, hoggsHollowFrench).

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

export const hoggsHollowTraditionalDetailLayout = {
  tiles: {
    description: { kind: 'description' },
    ellipticalStair: { kind: 'image', num: 1, backgroundPosition: '100% 0%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg' },
    frontFacade: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347168/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/1-Front-Facade_iieaut.jpg' },
    riversideTerraces: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347175/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/8-Riverside-Terraces_ukricc.jpg' },
    customPool: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/9-Custom-Pool_rj5teb.jpg' },
    cofferedFamilyRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347177/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/3-Coffered-Family-Room_ayggrb.jpg' }
  },

  layout: [
    row('r1', { height: 645 }, [
      column('r1c1', { width: '48%' }, [tileRef('r1c1p1', 'ellipticalStair')]),
      column('r1c2', { width: '52%' }, [
        nestedRow('r1c2r1', row('r1c2r1row', { height: 340 }, [column('r1c2r1c1', {}, [tileRef('r1c2r1c1p1', 'frontFacade')])])),
        nestedRow('r1c2r2', row('r1c2r2row', { height: 305 }, [column('r1c2r2c1', {}, [tileRef('r1c2r2c1p1', 'riversideTerraces')])]))
      ])
    ]),
    row('r2', {}, [column('r2c1', {}, [tileRef('r2c1p1', 'description')])]),
    row('r3', { height: 300 }, [
      column('r3c1', { width: '48%' }, [tileRef('r3c1p1', 'customPool')]),
      column('r3c2', { width: '52%' }, [tileRef('r3c2p1', 'cofferedFamilyRoom')])
    ])
  ]
};

export const hoggsHollowTraditionalDetailPageConfig = {
  key: 'hoggsHollowTraditionalDetail',
  label: 'Hoggs Hollow Traditional (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/hoggs-hollow-traditional.jsx',
  componentName: 'HoggsHollowTraditional',
  type: 'detail',
  projectKey: 'hoggsHollowTraditional',
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
