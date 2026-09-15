// Hand-transcribed from
// src/pages/portfolio/renovations-additions/lorne-park-interior.jsx — a single-section
// detail page with numeric tile keys (dict key != displayed num, preserved exactly).

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

export const lorneParkInteriorDetailLayout = {
  tiles: {
    description: { kind: 'description' },
    2: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-2_whsiom.jpg' },
    1: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-1_zlu8rc.jpg' },
    4: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-4_usn7jd.jpg' },
    5: { kind: 'image', num: 4, backgroundPosition: '50% 30%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-5_l7ardg.jpg' },
    6: { kind: 'image', num: 5, backgroundPosition: '50% 30%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-6_kwdbb0.jpg' }
  },

  layout: [
    row('r1', { height: 450 }, [
      column('r1c1', { width: '23%' }, [
        nestedRow('r1c1r1', row('r1c1r1row', { height: 225 }, [column('r1c1r1c1', {}, [tileRef('r1c1r1c1p1', '2')])])),
        nestedRow('r1c1r2', row('r1c1r2row', { height: 225 }, [column('r1c1r2c1', {}, [tileRef('r1c1r2c1p1', '1')])]))
      ]),
      column('r1c2', { width: '77%' }, [tileRef('r1c2p1', '4')])
    ]),
    row('r2', {}, [column('r2c1', {}, [tileRef('r2c1p1', 'description')])]),
    row('r3', { height: 260 }, [
      column('r3c1', {}, [tileRef('r3c1p1', '5')]),
      column('r3c2', {}, [tileRef('r3c2p1', '6')])
    ])
  ]
};

export const lorneParkInteriorDetailPageConfig = {
  key: 'lorneParkInteriorDetail',
  label: 'Lorne Park Interior (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/lorne-park-interior.jsx',
  componentName: 'LorneParkInterior',
  type: 'detail',
  projectKey: 'lorneParkInterior',
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
