// Hand-transcribed from
// src/pages/portfolio/renovations-additions/princess-margaret-modern.jsx — a
// single-section detail page where one column stacks two tiles directly (no wrapping
// row between them).

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

export const princessMargaretModernDetailLayout = {
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
    row('r1', { height: 450 }, [
      column('r1c1', { width: '66%' }, [tileRef('r1c1p1', 'additionRefacing')]),
      column('r1c2', { width: '33%' }, [tileRef('r1c2p1', 'before'), tileRef('r1c2p2', 'newSecondFloor')])
    ]),
    row('r2', {}, [column('r2c1', {}, [tileRef('r2c1p1', 'description')])]),
    row('r3', { height: 375 }, [
      column('r3c1', { width: '50%' }, [tileRef('r3c1p1', '4')]),
      column('r3c2', { width: '50%' }, [tileRef('r3c2p1', '6')])
    ]),
    row('r4', { height: 375 }, [
      column('r4c1', { width: '50%' }, [tileRef('r4c1p1', '8')]),
      column('r4c2', { width: '50%' }, [tileRef('r4c2p1', '9')])
    ])
  ]
};

export const princessMargaretModernDetailPageConfig = {
  key: 'princessMargaretModernDetail',
  label: 'Princess Margaret Modern (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/princess-margaret-modern.jsx',
  componentName: 'PrincessMargaretModern',
  type: 'detail',
  projectKey: 'princessMargaretModern',
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
