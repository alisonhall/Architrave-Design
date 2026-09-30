// Canonical layout data for
// src/pages/portfolio/renovations-additions/rosedale-edwardian.jsx, rendered via
// src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  edwardianRenewal: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/2-Edwardian-Renewal_htqqfn.jpg' },
  before: { kind: 'image', num: 2, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/1-Before_olg276.jpg' },
  newBrickBay: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/3-New-Brick-Bay_nnbw0a.jpg' }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'rosedaleEdwardian',

  tiles,

  defaultLayout: [
    row({ height: 650 }, [column({}, [tileRef('edwardianRenewal')])]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 375 }, [
      column({ width: '48%' }, [tileRef('before')]),
      column({ width: '52%' }, [tileRef('newBrickBay')])
    ])
  ],

  wideLayout: [
    row({ height: 650 }, [
      column({ width: '67%' }, [tileRef('edwardianRenewal')]),
      column({ width: '33%' }, [
        nestedRow(row({ imageHeight: 325 }, [column({}, [tileRef('before')])])),
        nestedRow(row({ imageHeight: 325 }, [column({}, [tileRef('newBrickBay')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])])
  ]
};

export default layout;
