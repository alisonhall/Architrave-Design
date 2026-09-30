// Canonical layout data for
// src/pages/portfolio/renovations-additions/etobicoke-arts-and-crafts.jsx, rendered
// via src/components/detailPageLayout.jsx.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });

const tiles = {
  description: { kind: 'description' },
  artsAndCraftsRestyling: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347380/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/2-Arts-and-Crafts-Restyling_jydm2x.jpg' },
  before: { kind: 'image', num: 2, overlayText: 'Before', imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347373/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/1b-Before_2_hhwjuw.jpg' },
  newReadingNook: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347382/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/6-New-Reading-Nook_khsnqo.jpg' },
  seatDrawers: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347383/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/xxSeat_Drawers_uityi0.jpg' },
  windowSeat: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347548/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/7-Window-Seat_qspbju.jpg' },
  customCabinetry: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347384/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/5-Custom-Cabinetry_zay5pm.jpg' },
  master: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347379/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/9-Master_lsvfyq.jpg' }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'etobicokeArtsAndCrafts',

  tiles,

  defaultLayout: [
    row({}, [
      column({ width: '62%' }, [
        nestedRow(row({ height: 480 }, [column({}, [tileRef('artsAndCraftsRestyling')])])),
        nestedRow(row({ height: 240 }, [
          column({}, [tileRef('before')]),
          column({}, [tileRef('newReadingNook')])
        ]))
      ]),
      column({ width: '38%' }, [
        nestedRow(row({ height: 215 }, [column({}, [tileRef('seatDrawers')])])),
        nestedRow(row({ height: 505 }, [column({}, [tileRef('windowSeat')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 390 }, [
      column({ width: '48%' }, [tileRef('customCabinetry')]),
      column({ width: '52%' }, [tileRef('master')])
    ])
  ],

  wideLayout: [
    row({ height: 600 }, [
      column({ width: '70%' }, [tileRef('artsAndCraftsRestyling')]),
      column({ width: '30%' }, [
        nestedRow(row({}, [column({}, [tileRef('before')])])),
        nestedRow(row({}, [column({}, [tileRef('seatDrawers')])]))
      ])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 340 }, [
      column({}, [tileRef('master')]),
      column({}, [tileRef('customCabinetry')]),
      column({}, [tileRef('newReadingNook')])
    ])
  ]
};

export default layout;
