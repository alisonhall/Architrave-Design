// Canonical layout data for
// src/pages/portfolio/renovations-additions/princess-margaret-modern.jsx, rendered
// via src/components/detailPageLayout.jsx. One column stacks two tiles directly (no
// wrapping row between them).

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

const layout = {
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey: 'princessMargaretModern',

  tiles: {
    description: { kind: 'description' },
    additionRefacing: { kind: 'image', num: 1, backgroundPosition: '50% 30%', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/2-Addition-_-_Re-facing_xddgjt.jpg' },
    before: { kind: 'image', num: 2, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/1-Original-1970-Sidesplit_vrexby.jpg' },
    newSecondFloor: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/3-New-Second-Floor_sxdhhx.jpg' },
    4: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/4_hxynkz.jpg' },
    6: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/6_g3yq1e.jpg' },
    8: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/8_rzkvl5.jpg' },
    9: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/9_o4ahxq.jpg' }
  },

  layout: [
    row({ height: 450 }, [
      column({ width: '66%' }, [tileRef('additionRefacing')]),
      column({ width: '33%' }, [tileRef('before'), tileRef('newSecondFloor')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 375 }, [
      column({ width: '50%' }, [tileRef('4')]),
      column({ width: '50%' }, [tileRef('6')])
    ]),
    row({ height: 375 }, [
      column({ width: '50%' }, [tileRef('8')]),
      column({ width: '50%' }, [tileRef('9')])
    ])
  ]
};

export default layout;
