// Canonical layout data for
// src/pages/portfolio/renovations-additions/royal-york-facelift.jsx, rendered via
// src/components/detailPageLayout.jsx. Both image tiles carry an overlay caption.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

const layout = {
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey: 'royalYorkFacelift',

  tiles: {
    description: { kind: 'description' },
    before: { kind: 'image', num: 1, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-1_luwupq.jpg' },
    newFacade: { kind: 'image', num: 2, overlayText: 'New Facade', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-2_ejplbx.jpg' }
  },

  layout: [
    row({ height: 375 }, [
      column({}, [tileRef('before')]),
      column({}, [tileRef('newFacade')])
    ]),
    row({}, [column({}, [tileRef('description')])])
  ]
};

export default layout;
