// Hand-transcribed from the live src/pages/portfolio/new-homes.jsx, so the layout
// editor starts from exactly what's on the site today. See layoutHelpers.js for the
// node shapes this follows (row/column/placement) and layoutGenerator.js for how it's
// turned back into page source.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

export const newHomesLayout = {
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
    kingswayTransitional: { kind: 'project', projectKey: 'kingswayTransitional', num: 5 },
    princessMargaretClassic: { kind: 'project', projectKey: 'princessMargaretClassic', num: 6 },
    classicCentreHall: { kind: 'project', projectKey: 'classicCentreHall', num: 7 },
    traditionalKingswayPark: {
      kind: 'project',
      projectKey: 'traditionalKingswayPark',
      num: 9,
      backgroundPosition: '30% 40% '
    },
    kingswayGeorgianFiller: {
      kind: 'filler',
      projectKey: 'kingswayGeorgian',
      num: 10,
      imageUrl:
        'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/11-Landing-_-Window-seat_y0xb7c.jpg'
    }
  },

  defaultLayout: [
    row('d1', { height: 705 }, [
      column('d1c1', { width: '48%' }, [tileRef('d1c1p1', 'hoggsHollowFrench')]),
      column('d1c2', { width: '52%' }, [
        nestedRow('d1c2r1', row('d1c2r1row', { height: 370 }, [
          column('d1c2r1c1', {}, [tileRef('d1c2r1c1p1', 'kingswayGeorgian')])
        ])),
        nestedRow('d1c2r2', row('d1c2r2row', { imageHeight: 335 }, [
          column('d1c2r2c1', {}, [tileRef('d1c2r2c1p1', 'classicCentreHall')])
        ]))
      ])
    ]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 300 }, [
      column('d3c1', { width: '48%' }, [tileRef('d3c1p1', 'kingswayTransitional')]),
      column('d3c2', { width: '52%' }, [tileRef('d3c2p1', 'creditRiverManor')])
    ]),
    row('d4', { height: 300 }, [
      column('d4c1', { width: '39%' }, [tileRef('d4c1p1', 'princessMargaretClassic')]),
      column('d4c2', { width: '22%' }, [tileRef('d4c2p1', 'kingswayTransitionalFiller')]),
      column('d4c3', { width: '39%' }, [tileRef('d4c3p1', 'traditionalKingswayPark')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 550 }, [
      column('w1c1', { width: '48%' }, [tileRef('w1c1p1', 'hoggsHollowFrench')]),
      column('w1c2', {}, [
        nestedRow('w1c2r1', row('w1c2r1row', { imageHeight: 275 }, [
          column('w1c2r1c1', { width: '54%' }, [tileRef('w1c2r1c1p1', 'kingswayGeorgian')]),
          column('w1c2r1c2', { width: '46%' }, [tileRef('w1c2r1c2p1', 'classicCentreHall')])
        ])),
        nestedRow('w1c2r2', row('w1c2r2row', { imageHeight: 275 }, [
          column('w1c2r2c1', { width: '42%' }, [tileRef('w1c2r2c1p1', 'creditRiverManor')]),
          column('w1c2r2c2', { width: '21%' }, [tileRef('w1c2r2c2p1', 'kingswayTransitionalFiller')]),
          column('w1c2r2c3', { width: '37%' }, [tileRef('w1c2r2c3p1', 'kingswayTransitional')])
        ]))
      ])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 300 }, [
      column('w3c1', { width: '39%' }, [tileRef('w3c1p1', 'princessMargaretClassic')]),
      column('w3c2', { width: '23%' }, [tileRef('w3c2p1', 'kingswayGeorgianFiller')]),
      column('w3c3', { width: '38%' }, [tileRef('w3c3p1', 'traditionalKingswayPark')])
    ])
  ]
};

export const newHomesPageConfig = {
  key: 'newHomes',
  label: 'New Homes (portfolio listing)',
  filePath: 'src/pages/portfolio/new-homes.jsx',
  componentName: 'NewHomes',
  mainClasses: 'newHomesOverview',
  defaultSectionClassName: 'contentWrapper layoutAll layoutNewHomes defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutHome wideLayout',
  componentsPath: '../../components',
  staticPath: '../../../static'
};
