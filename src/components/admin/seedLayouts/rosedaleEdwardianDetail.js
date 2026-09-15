// Hand-transcribed from
// src/pages/portfolio/renovations-additions/rosedale-edwardian.jsx — a dual-layout
// detail page.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  edwardianRenewal: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/2-Edwardian-Renewal_htqqfn.jpg' },
  before: { kind: 'image', num: 2, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/1-Before_olg276.jpg' },
  newBrickBay: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/3-New-Brick-Bay_nnbw0a.jpg' }
};

export const rosedaleEdwardianDetailLayout = {
  tiles,

  defaultLayout: [
    row('d1', { height: 650 }, [column('d1c1', {}, [tileRef('d1c1p1', 'edwardianRenewal')])]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 375 }, [
      column('d3c1', { width: '48%' }, [tileRef('d3c1p1', 'before')]),
      column('d3c2', { width: '52%' }, [tileRef('d3c2p1', 'newBrickBay')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 650 }, [
      column('w1c1', { width: '67%' }, [tileRef('w1c1p1', 'edwardianRenewal')]),
      column('w1c2', { width: '33%' }, [
        nestedRow('w1c2r1', row('w1c2r1row', { imageHeight: 325 }, [column('w1c2r1c1', {}, [tileRef('w1c2r1c1p1', 'before')])])),
        nestedRow('w1c2r2', row('w1c2r2row', { imageHeight: 325 }, [column('w1c2r2c1', {}, [tileRef('w1c2r2c1p1', 'newBrickBay')])]))
      ])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])])
  ]
};

export const rosedaleEdwardianDetailPageConfig = {
  key: 'rosedaleEdwardianDetail',
  label: 'Rosedale Edwardian (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/rosedale-edwardian.jsx',
  componentName: 'RosedaleEdwardian',
  type: 'detail',
  projectKey: 'rosedaleEdwardian',
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
