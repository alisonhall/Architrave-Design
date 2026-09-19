// Canonical layout data for src/pages/index.jsx, rendered via
// src/components/listingPageLayout.jsx. This is the single source of truth for that
// page's layout — the admin tool's Layouts editor reads and writes this exact file,
// so there's nothing to keep in sync by hand.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const layout = {
  mainClasses: 'index home',
  defaultSectionClassName: 'contentWrapper layoutAll layoutHome defaultLayout',
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
    row({ height: 702 }, [
      column({ width: '48%' }, [tileRef('hoggsHollowFrench')]),
      column({ width: '52%' }, [
        nestedRow(row({ height: 386 }, [column({}, [tileRef('kingswayGeorgian')])])),
        nestedRow(row({ imageHeight: 316 }, [
          column({ width: '40%' }, [tileRef('kingswayTransitionalFiller')]),
          column({ width: '60%' }, [tileRef('creditRiverManor')])
        ]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '52%' }, [tileRef('classicCentreHall')]),
      column({ width: '48%' }, [tileRef('princessMargaretModern')])
    ]),
    row({ height: 300 }, [
      column({ width: '36%' }, [tileRef('lyttonParkManor')]),
      column({ width: '31%' }, [tileRef('upperCanadaFarmhouse')]),
      column({ width: '33%' }, [tileRef('kingswayTransitional')])
    ])
  ],

  wideLayout: [
    row({ height: 550 }, [
      column({ width: '48%' }, [tileRef('hoggsHollowFrench')]),
      column({}, [
        nestedRow(row({ imageHeight: 275 }, [
          column({ width: '37%' }, [tileRef('kingswayGeorgian')]),
          column({ width: '21%' }, [tileRef('kingswayTransitionalFiller')]),
          column({ width: '42%' }, [tileRef('classicCentreHall')])
        ])),
        nestedRow(row({ imageHeight: 275 }, [
          column({ width: '42%' }, [tileRef('creditRiverManor')]),
          column({ width: '21%' }, [tileRef('creditRiverManorFiller')]),
          column({ width: '37%' }, [tileRef('lyttonParkManor')])
        ]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '35%' }, [tileRef('kingswayTransitional')]),
      column({ width: '31%' }, [tileRef('princessMargaretModern')]),
      column({ width: '33%' }, [tileRef('upperCanadaFarmhouse')])
    ])
  ]
};

export default layout;
