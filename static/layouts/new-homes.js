// Canonical layout data for src/pages/portfolio/new-homes.jsx, rendered via
// src/components/listingPageLayout.jsx. Single source of truth for that page's
// layout — the admin tool's Layouts editor reads and writes this exact file.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const layout = {
  mainClasses: 'newHomesOverview',
  defaultSectionClassName: 'contentWrapper layoutAll layoutNewHomes defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutHome wideLayout',

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
    row({ height: 705 }, [
      column({ width: '48%' }, [tileRef('hoggsHollowFrench')]),
      column({ width: '52%' }, [
        nestedRow(row({ height: 370 }, [column({}, [tileRef('kingswayGeorgian')])])),
        nestedRow(row({ imageHeight: 335 }, [column({}, [tileRef('classicCentreHall')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '48%' }, [tileRef('kingswayTransitional')]),
      column({ width: '52%' }, [tileRef('creditRiverManor')])
    ]),
    row({ height: 300 }, [
      column({ width: '39%' }, [tileRef('princessMargaretClassic')]),
      column({ width: '22%' }, [tileRef('kingswayTransitionalFiller')]),
      column({ width: '39%' }, [tileRef('traditionalKingswayPark')])
    ])
  ],

  wideLayout: [
    row({ height: 550 }, [
      column({ width: '48%' }, [tileRef('hoggsHollowFrench')]),
      column({}, [
        nestedRow(row({ imageHeight: 275 }, [
          column({ width: '54%' }, [tileRef('kingswayGeorgian')]),
          column({ width: '46%' }, [tileRef('classicCentreHall')])
        ])),
        nestedRow(row({ imageHeight: 275 }, [
          column({ width: '42%' }, [tileRef('creditRiverManor')]),
          column({ width: '21%' }, [tileRef('kingswayTransitionalFiller')]),
          column({ width: '37%' }, [tileRef('kingswayTransitional')])
        ]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '39%' }, [tileRef('princessMargaretClassic')]),
      column({ width: '23%' }, [tileRef('kingswayGeorgianFiller')]),
      column({ width: '38%' }, [tileRef('traditionalKingswayPark')])
    ])
  ]
};

export default layout;
