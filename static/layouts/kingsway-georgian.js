// Canonical layout data for src/pages/portfolio/new-homes/kingsway-georgian.jsx,
// rendered via src/components/detailPageLayout.jsx. Includes two bare-placeholder
// placements (nodeType 'empty').

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });
const nestedRow = (rowNode) => ({ nodeType: 'row', row: rowNode });
const empty = () => ({ nodeType: 'empty' });

const tiles = {
  description: { kind: 'description' },
  frontFacade: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/1-Front-Facade_eohlwb.jpg' },
  cutStonePortico: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347138/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/2-Cut-Stone_Portico_doxm8y.jpg' },
  backGarden: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/3-Back-Garden_bczadu.jpg' },
  familyRoom: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347145/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/7-Family-Room_lh91x1.jpg' },
  kitchen: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/8-Kitchen_mrd8z9.jpg' },
  mainHall: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/5-Main-Hall_txsam1.jpg' },
  islandServery: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/10-Island-_-Servery_whpyxm.jpg' },
  sittingRoom: { kind: 'image', num: 8, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347140/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/6-Sitting-Room_et7o9z.jpg' },
  breakfastBanquette: { kind: 'image', num: 9, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/9-Breakfast-Banquette_plhghs.jpg' },
  landingWindowSeat: { kind: 'image', num: 10, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347144/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/11-Landing-_-Window-seat_y0xb7c.jpg' },
  freestandingTub: { kind: 'image', num: 11, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347149/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/13-Freestanding-Tub_oo8ylx.jpg' },
  thirdFloorGuestSuite: { kind: 'image', num: 12, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347151/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/15-Third-Floor-Guest-Suite_my5izk.jpg' },
  marbleFoyer: { kind: 'image', num: 13, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347139/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/4-Marble-Foyer_ogejte.jpg' },
  ensuiteWithHisHersVanities: { kind: 'image', num: 14, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347146/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/12-Ensuite-with-His-_-Hers-Vanities_x1h75n.jpg' },
  jackNJillBathroom: { kind: 'image', num: 15, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347150/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/14-Jack_n_Jill-Bathroom_lxvxyl.jpg' }
};

const layout = {
  mainClasses: 'portfolio',
  defaultSectionClassName: 'contentWrapper layoutAll layoutProject defaultLayout',
  wideSectionClassName: 'contentWrapper layoutAll layoutProject wideLayout',
  projectKey: 'kingswayGeorgian',

  tiles,

  defaultLayout: [
    row({ height: 750 }, [column({}, [tileRef('frontFacade')])]),
    row({}, [column({}, [tileRef('description')])]),
    row({}, [
      column({ width: '35%' }, [
        nestedRow(row({ height: 400 }, [column({}, [tileRef('cutStonePortico')])])),
        nestedRow(row({}, [column({}, [tileRef('backGarden')])]))
      ]),
      column({ width: '65%' }, [
        nestedRow(row({ height: 700 }, [column({}, [tileRef('mainHall')])])),
        nestedRow(row({}, [column({}, [empty()])]))
      ])
    ]),
    row({}, [
      column({ width: '58%' }, [
        nestedRow(row({ height: 350 }, [column({}, [tileRef('familyRoom')])])),
        nestedRow(row({ height: 350 }, [column({}, [tileRef('kitchen')])])),
        nestedRow(row({ height: 350 }, [column({}, [tileRef('islandServery')])]))
      ]),
      column({ width: '42%' }, [
        nestedRow(row({ height: 540 }, [column({}, [tileRef('sittingRoom')])])),
        nestedRow(row({ height: 540 }, [column({}, [tileRef('breakfastBanquette')])]))
      ])
    ]),
    row({ height: 350 }, [
      column({ width: '34%' }, [tileRef('landingWindowSeat')]),
      column({ width: '32%' }, [tileRef('freestandingTub')]),
      column({ width: '34%' }, [tileRef('thirdFloorGuestSuite')])
    ])
  ],

  wideLayout: [
    row({ height: 500 }, [
      column({ width: '45%' }, [tileRef('frontFacade')]),
      column({ width: '25%' }, [tileRef('cutStonePortico')]),
      column({ width: '30%' }, [tileRef('backGarden')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 350 }, [
      column({ width: '20%' }, [tileRef('marbleFoyer')]),
      column({ width: '20%' }, [tileRef('sittingRoom')]),
      column({ width: '20%' }, [tileRef('mainHall')]),
      column({ width: '40%' }, [
        nestedRow(row({ height: 275 }, [column({}, [tileRef('familyRoom')])])),
        nestedRow(row({}, [column({}, [empty()])]))
      ])
    ]),
    row({ height: 325 }, [
      column({ width: '17%' }, [tileRef('breakfastBanquette')]),
      column({ width: '43%' }, [tileRef('kitchen')]),
      column({ width: '40%' }, [tileRef('islandServery')])
    ]),
    row({ height: 400 }, [
      column({ width: '27%' }, [tileRef('landingWindowSeat')]),
      column({ width: '23%' }, [tileRef('ensuiteWithHisHersVanities')]),
      column({ width: '23%' }, [tileRef('jackNJillBathroom')]),
      column({ width: '27%' }, [tileRef('thirdFloorGuestSuite')])
    ])
  ]
};

export default layout;
