// Canonical layout data for
// src/pages/portfolio/renovations-additions/lorne-park-interior.jsx, rendered via
// src/components/detailPageLayout.jsx. Has numeric tile keys whose displayed num
// doesn't match the key — preserved exactly.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const layout = {
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey: 'lorneParkInterior',

  tiles: {
    description: { kind: 'description' },
    2: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-2_whsiom.jpg' },
    1: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-1_zlu8rc.jpg' },
    4: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-4_usn7jd.jpg' },
    5: { kind: 'image', num: 4, backgroundPosition: '50% 30%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-5_l7ardg.jpg' },
    6: { kind: 'image', num: 5, backgroundPosition: '50% 30%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-6_kwdbb0.jpg' }
  },

  layout: [
    row({ height: 450 }, [
      column({ width: '23%' }, [
        nestedRow(row({ height: 225 }, [column({}, [tileRef('2')])])),
        nestedRow(row({ height: 225 }, [column({}, [tileRef('1')])]))
      ]),
      column({ width: '77%' }, [tileRef('4')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 260 }, [
      column({}, [tileRef('5')]),
      column({}, [tileRef('6')])
    ])
  ]
};

export default layout;
