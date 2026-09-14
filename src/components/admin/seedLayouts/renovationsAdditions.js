// Hand-transcribed from the live src/pages/portfolio/renovations-additions.jsx — see
// newHomes.js for the node shape/generator conventions this follows.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });
const nestedRow = (id, rowNode) => ({ id, nodeType: 'row', row: rowNode });

export const renovationsAdditionsLayout = {
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
    row('d1', { height: 645 }, [
      column('d1c1', { width: '48%' }, [tileRef('d1c1p1', 'lyttonParkManor')]),
      column('d1c2', { width: '52%' }, [
        nestedRow('d1c2r1', row('d1c2r1row', { height: 345 }, [
          column('d1c2r1c1', {}, [tileRef('d1c2r1c1p1', 'princessMargaretModern')])
        ])),
        nestedRow('d1c2r2', row('d1c2r2row', { imageHeight: 300 }, [
          column('d1c2r2c1', {}, [tileRef('d1c2r2c1p1', 'upperCanadaFarmhouse')])
        ]))
      ])
    ]),
    row('d2', {}, [column('d2c1', {}, [tileRef('d2c1p1', 'description')])]),
    row('d3', { height: 300 }, [
      column('d3c1', { width: '48%' }, [tileRef('d3c1p1', 'rosedaleEdwardian')]),
      column('d3c2', { width: '52%' }, [tileRef('d3c2p1', 'etobicokeArtsAndCrafts')])
    ])
  ],

  wideLayout: [
    row('w1', { height: 375 }, [
      column('w1c1', { width: '45%' }, [tileRef('w1c1p1', 'lyttonParkManor')]),
      column('w1c2', { width: '20%' }, [tileRef('w1c2p1', 'lyttonParkManorFiller')]),
      column('w1c3', { width: '35%' }, [tileRef('w1c3p1', 'princessMargaretModern')])
    ]),
    row('w2', {}, [column('w2c1', {}, [tileRef('w2c1p1', 'description')])]),
    row('w3', { height: 300 }, [
      column('w3c1', {}, [tileRef('w3c1p1', 'etobicokeArtsAndCrafts')]),
      column('w3c2', {}, [tileRef('w3c2p1', 'rosedaleEdwardian')]),
      column('w3c3', {}, [tileRef('w3c3p1', 'upperCanadaFarmhouse')])
    ])
  ]
};

export const renovationsAdditionsPageConfig = {
  key: 'renovationsAdditions',
  label: 'Renovations & Additions (portfolio listing)',
  filePath: 'src/pages/portfolio/renovations-additions.jsx',
  componentName: 'RenovationsAdditions',
  mainClasses: 'renosAndAdditionsOverview',
  defaultSectionClassName: 'contentWrapper layoutAll layoutRenovations defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutRenovations wideLayout',
  componentsPath: '../../components',
  staticPath: '../../../static'
};
