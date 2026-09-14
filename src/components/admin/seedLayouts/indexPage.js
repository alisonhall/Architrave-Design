// Hand-transcribed from the live src/pages/index.jsx — see newHomes.js for the node
// shape/generator conventions this follows.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

export const indexPageLayout = {
  tiles: {
    description: { kind: 'text', useIntroText: true },
    hoggsHollowFrench: { kind: 'project', projectKey: 'hoggsHollowFrench', num: 1, backgroundPosition: '100% 0%' },
    kingswayGeorgian: { kind: 'project', projectKey: 'kingswayGeorgian', num: 2 },
    kingswayTransitionalFiller: {
      kind: 'filler',
      projectKey: 'kingswayTransitional',
      num: 3,
      imageUrl:
        'https://res.cloudinary.com/alisonkhall/image/upload/v1595347224/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/6-Banquette-seating_oe01cy.jpg'
    },
    creditRiverManor: { kind: 'project', projectKey: 'creditRiverManor', num: 4 },
    classicCentreHall: { kind: 'project', projectKey: 'classicCentreHall', num: 5 },
    kingswayTransitional: { kind: 'project', projectKey: 'kingswayTransitional', num: 6 },
    lyttonParkManor: { kind: 'project', projectKey: 'lyttonParkManor', num: 8 },
    creditRiverManorFiller: {
      kind: 'filler',
      projectKey: 'creditRiverManor',
      num: 3,
      imageUrl:
        'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg'
    },
    princessMargaretModern: { kind: 'project', projectKey: 'princessMargaretModern', num: 9 },
    upperCanadaFarmhouse: { kind: 'project', projectKey: 'upperCanadaFarmhouse', num: 10 }
  },

  defaultLayout: [
    row('d1', { height: 702 }, [
      column('d1c1', { width: '48%' }, [tileRef('d1c1p1', 'hoggsHollowFrench')]),
      column('d1c2', { width: '52%' }, [
        nestedRow('d1c2r1', row('d1c2r1row', { height: 386 }, [
          column('d1c2r1c1', {}, [tileRef('d1c2r1c1p1', 'kingswayGeorgian')])
        ])),
        nestedRow('d1c2r2', row('d1c2r2row', { imageHeight: 316 }, [
          column('d1c2r2c1', { width: '40%' }, [tileRef('d1c2r2c1p1', 'kingswayTransitionalFiller')]),
          column('d1c2r2c2', { width: '60%' }, [tileRef('d1c2r2c2p1', 'creditRiverManor')])
        ]))
      ])
    ]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 300 }, [
      column('d3c1', { width: '52%' }, [tileRef('d3c1p1', 'classicCentreHall')]),
      column('d3c2', { width: '48%' }, [tileRef('d3c2p1', 'princessMargaretModern')])
    ]),
    row('d4', { height: 300 }, [
      column('d4c1', { width: '36%' }, [tileRef('d4c1p1', 'lyttonParkManor')]),
      column('d4c2', { width: '31%' }, [tileRef('d4c2p1', 'upperCanadaFarmhouse')]),
      column('d4c3', { width: '33%' }, [tileRef('d4c3p1', 'kingswayTransitional')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 550 }, [
      column('w1c1', { width: '48%' }, [tileRef('w1c1p1', 'hoggsHollowFrench')]),
      column('w1c2', {}, [
        nestedRow('w1c2r1', row('w1c2r1row', { imageHeight: 275 }, [
          column('w1c2r1c1', { width: '37%' }, [tileRef('w1c2r1c1p1', 'kingswayGeorgian')]),
          column('w1c2r1c2', { width: '21%' }, [tileRef('w1c2r1c2p1', 'kingswayTransitionalFiller')]),
          column('w1c2r1c3', { width: '42%' }, [tileRef('w1c2r1c3p1', 'classicCentreHall')])
        ])),
        nestedRow('w1c2r2', row('w1c2r2row', { imageHeight: 275 }, [
          column('w1c2r2c1', { width: '42%' }, [tileRef('w1c2r2c1p1', 'creditRiverManor')]),
          column('w1c2r2c2', { width: '21%' }, [tileRef('w1c2r2c2p1', 'creditRiverManorFiller')]),
          column('w1c2r2c3', { width: '37%' }, [tileRef('w1c2r2c3p1', 'lyttonParkManor')])
        ]))
      ])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 300 }, [
      column('w3c1', { width: '35%' }, [tileRef('w3c1p1', 'kingswayTransitional')]),
      column('w3c2', { width: '31%' }, [tileRef('w3c2p1', 'princessMargaretModern')]),
      column('w3c3', { width: '33%' }, [tileRef('w3c3p1', 'upperCanadaFarmhouse')])
    ])
  ]
};

export const indexPageConfig = {
  key: 'index',
  label: 'Home (index)',
  filePath: 'src/pages/index.jsx',
  componentName: 'IndexPage',
  mainClasses: 'index home',
  defaultSectionClassName: 'contentWrapper layoutAll layoutHome defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutHome wideLayout',
  componentsPath: '../components',
  staticPath: '../../static'
};
