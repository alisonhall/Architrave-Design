// Canonical layout data for src/pages/portfolio/new-homes/credit-river-manor.jsx,
// rendered via src/components/detailPageLayout.jsx. Single source of truth — the
// admin tool's Layouts editor reads and writes this exact file.
//
// Note the tile keyed '4' carries num=3, and '3' carries num=4 — the live page's own
// tile keys and its display numbers were never in sync; both are preserved exactly.

const row = (props, columns) => ({ ...props, columns });
const column = (props, children) => ({ ...props, children });
const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

const layout = {
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  projectKey: 'creditRiverManor',

  tiles: {
    description: { kind: 'description' },
    1: { kind: 'image', num: 1, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg' },
    2: { kind: 'image', num: 2, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592704/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_2_dzqicp.jpg' },
    4: { kind: 'image', num: 3, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592703/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_4_jt4uq1.jpg' },
    3: { kind: 'image', num: 4, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/3-Two-Story-Front-Foyer_lkcpir.jpg' },
    10: { kind: 'image', num: 5, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg' },
    frontFoyer: { kind: 'image', num: 6, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/2-Front-Foyer_y8wodd.jpg' },
    hallwayArch: { kind: 'image', num: 7, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347190/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/7-Hallway-Arch_nsi6eb.jpg' },
    sittingRoom: { kind: 'image', num: 8, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/5-Sitting-Room_dt8nwa.jpg' },
    diningRoom: { kind: 'image', num: 9, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347192/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/6-Dining-Room_n7r1av.jpg' },
    kitchenBreakfastBay: { kind: 'image', num: 10, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/9-Kitchen-_-Breakfast-Bay_k8qrcz.jpg' },
    familyRoomWithCustomMantel: { kind: 'image', num: 11, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/8-Family-Room-with-Custom-Mantel_vvgqso.jpg' },
    upperHall: { kind: 'image', num: 12, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/11-Upper-Hall_yfoloe.jpg' },
    vaultedMaster: { kind: 'image', num: 13, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347210/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/12-Vaulted-Master_z9t3hj.jpg' },
    bedroom: { kind: 'image', num: 14, imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/13-Bedroom_nesbsz.jpg' }
  },

  layout: [
    row({ height: 380 }, [
      column({}, [tileRef('1')]),
      column({}, [tileRef('2')])
    ]),
    row({}, [column({}, [tileRef('description')])]),
    row({ height: 380 }, [
      column({ width: '50%' }, [tileRef('4')]),
      column({ width: '25%' }, [tileRef('3')]),
      column({ width: '25%' }, [tileRef('10')])
    ]),
    row({ height: 290 }, [
      column({ width: '38%' }, [tileRef('frontFoyer')]),
      column({ width: '24%' }, [tileRef('hallwayArch')]),
      column({ width: '38%' }, [tileRef('sittingRoom')])
    ]),
    row({ height: 230 }, [
      column({}, [tileRef('diningRoom')]),
      column({}, [tileRef('kitchenBreakfastBay')]),
      column({}, [tileRef('familyRoomWithCustomMantel')])
    ]),
    row({ height: 290 }, [
      column({ width: ' 20%' }, [tileRef('upperHall')]),
      column({ width: '45%' }, [tileRef('vaultedMaster')]),
      column({ width: '35%' }, [tileRef('bedroom')])
    ])
  ]
};

export default layout;
