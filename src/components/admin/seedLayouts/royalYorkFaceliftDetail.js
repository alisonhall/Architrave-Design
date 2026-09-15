// Hand-transcribed from
// src/pages/portfolio/renovations-additions/royal-york-facelift.jsx — a single-section
// detail page. Both image tiles carry an overlay caption.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

export const royalYorkFaceliftDetailLayout = {
  tiles: {
    description: { kind: 'description' },
    before: { kind: 'image', num: 1, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-1_luwupq.jpg' },
    newFacade: { kind: 'image', num: 2, overlayText: 'New Facade', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-2_ejplbx.jpg' }
  },

  layout: [
    row('r1', { height: 375 }, [
      column('r1c1', {}, [tileRef('r1c1p1', 'before')]),
      column('r1c2', {}, [tileRef('r1c2p1', 'newFacade')])
    ]),
    row('r2', {}, [column('r2c1', {}, [tileRef('r2c1p1', 'description')])])
  ]
};

export const royalYorkFaceliftDetailPageConfig = {
  key: 'royalYorkFaceliftDetail',
  label: 'Royal York Facelift (Renovations detail page)',
  filePath: 'src/pages/portfolio/renovations-additions/royal-york-facelift.jsx',
  componentName: 'RoyalYorkFacelift',
  type: 'detail',
  projectKey: 'royalYorkFacelift',
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
