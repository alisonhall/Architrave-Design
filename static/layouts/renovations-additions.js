// Canonical layout data for src/pages/portfolio/renovations-additions.jsx, rendered
// via src/components/listingPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const layout = {
  mainClasses: 'renosAndAdditionsOverview',
  defaultSectionClassName: 'contentWrapper layoutAll layoutRenovations defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutRenovations wideLayout',

  tiles: {
    description: { kind: 'text', useIntroText: true },
    lyttonParkManor: { kind: 'project', projectKey: 'lyttonParkManor', num: 1 },
    lyttonParkManorFiller: {
      kind: 'filler',
      projectKey: 'lyttonParkManor',
      num: 6,
      imageUrl:
        'https://res.cloudinary.com/alisonkhall/image/upload/v1595347340/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/4-New-Landing-_-Stairs-to-Master-Suite_jydo7j.jpg'
    },
    princessMargaretModern: {
      kind: 'project',
      projectKey: 'princessMargaretModern',
      num: 2,
      backgroundPosition: '50% 30%'
    },
    upperCanadaFarmhouse: { kind: 'project', projectKey: 'upperCanadaFarmhouse', num: 3 },
    rosedaleEdwardian: { kind: 'project', projectKey: 'rosedaleEdwardian', num: 4 },
    etobicokeArtsAndCrafts: { kind: 'project', projectKey: 'etobicokeArtsAndCrafts', num: 5 }
  },

  defaultLayout: [
    row({ height: 645 }, [
      column({ width: '48%' }, [tileRef('lyttonParkManor')]),
      column({ width: '52%' }, [
        nestedRow(row({ height: 345 }, [column({}, [tileRef('princessMargaretModern')])])),
        nestedRow(row({ imageHeight: 300 }, [column({}, [tileRef('upperCanadaFarmhouse')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({ width: '48%' }, [tileRef('rosedaleEdwardian')]),
      column({ width: '52%' }, [tileRef('etobicokeArtsAndCrafts')])
    ])
  ],

  wideLayout: [
    row({ height: 375 }, [
      column({ width: '45%' }, [tileRef('lyttonParkManor')]),
      column({ width: '20%' }, [tileRef('lyttonParkManorFiller')]),
      column({ width: '35%' }, [tileRef('princessMargaretModern')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 300 }, [
      column({}, [tileRef('etobicokeArtsAndCrafts')]),
      column({}, [tileRef('rosedaleEdwardian')]),
      column({}, [tileRef('upperCanadaFarmhouse')])
    ])
  ]
};

export default layout;
