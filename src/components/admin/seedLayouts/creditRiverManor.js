// Hand-transcribed from the live src/pages/portfolio/new-homes/credit-river-manor.jsx
// — a detail page: a single flat layout tree bound to one project, ending in
// PrevNextProjectLinks (added by the generator, not stored here). See newHomes.js for
// the row/column node shape.
//
// Note the tile keyed '4' carries num=3, and '3' carries num=4 — the live page's own
// tile keys and its display numbers were never in sync; both are preserved exactly so
// the generated output matches the original byte-for-byte.

const row = (id, props, columns) => ({ id, height: undefined, imageHeight: undefined, ...props, columns });
const column = (id, props, children) => ({ id, width: undefined, ...props, children });
const tileRef = (id, tileKey) => ({ id, nodeType: 'tileRef', tileKey });

export const creditRiverManorLayout = {
  tiles: {
    description: { kind: 'description' },
    1: {
      kind: 'image',
      num: 1,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg'
    },
    2: {
      kind: 'image',
      num: 2,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592704/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_2_dzqicp.jpg'
    },
    4: {
      kind: 'image',
      num: 3,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592703/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_4_jt4uq1.jpg'
    },
    3: {
      kind: 'image',
      num: 4,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/3-Two-Story-Front-Foyer_lkcpir.jpg'
    },
    10: {
      kind: 'image',
      num: 5,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/10-Main-Stair_bsfa5r.jpg'
    },
    frontFoyer: {
      kind: 'image',
      num: 6,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/2-Front-Foyer_y8wodd.jpg'
    },
    hallwayArch: {
      kind: 'image',
      num: 7,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347190/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/7-Hallway-Arch_nsi6eb.jpg'
    },
    sittingRoom: {
      kind: 'image',
      num: 8,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/5-Sitting-Room_dt8nwa.jpg'
    },
    diningRoom: {
      kind: 'image',
      num: 9,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347192/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/6-Dining-Room_n7r1av.jpg'
    },
    kitchenBreakfastBay: {
      kind: 'image',
      num: 10,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/9-Kitchen-_-Breakfast-Bay_k8qrcz.jpg'
    },
    familyRoomWithCustomMantel: {
      kind: 'image',
      num: 11,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347196/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/8-Family-Room-with-Custom-Mantel_vvgqso.jpg'
    },
    upperHall: {
      kind: 'image',
      num: 12,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347202/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/11-Upper-Hall_yfoloe.jpg'
    },
    vaultedMaster: {
      kind: 'image',
      num: 13,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347210/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/12-Vaulted-Master_z9t3hj.jpg'
    },
    bedroom: {
      kind: 'image',
      num: 14,
      imageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347209/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/13-Bedroom_nesbsz.jpg'
    }
  },

  layout: [
    row('r1', { height: 380 }, [
      column('r1c1', {}, [tileRef('r1c1p1', '1')]),
      column('r1c2', {}, [tileRef('r1c2p1', '2')])
    ]),
    row('r2', {}, [column('r2c1', {}, [tileRef('r2c1p1', 'description')])]),
    row('r3', { height: 380 }, [
      column('r3c1', { width: '50%' }, [tileRef('r3c1p1', '4')]),
      column('r3c2', { width: '25%' }, [tileRef('r3c2p1', '3')]),
      column('r3c3', { width: '25%' }, [tileRef('r3c3p1', '10')])
    ]),
    row('r4', { height: 290 }, [
      column('r4c1', { width: '38%' }, [tileRef('r4c1p1', 'frontFoyer')]),
      column('r4c2', { width: '24%' }, [tileRef('r4c2p1', 'hallwayArch')]),
      column('r4c3', { width: '38%' }, [tileRef('r4c3p1', 'sittingRoom')])
    ]),
    row('r5', { height: 230 }, [
      column('r5c1', {}, [tileRef('r5c1p1', 'diningRoom')]),
      column('r5c2', {}, [tileRef('r5c2p1', 'kitchenBreakfastBay')]),
      column('r5c3', {}, [tileRef('r5c3p1', 'familyRoomWithCustomMantel')])
    ]),
    row('r6', { height: 290 }, [
      column('r6c1', { width: ' 20%' }, [tileRef('r6c1p1', 'upperHall')]),
      column('r6c2', { width: '45%' }, [tileRef('r6c2p1', 'vaultedMaster')]),
      column('r6c3', { width: '35%' }, [tileRef('r6c3p1', 'bedroom')])
    ])
  ]
};

export const creditRiverManorPageConfig = {
  key: 'creditRiverManor',
  label: 'Credit River Manor (New Homes detail page)',
  filePath: 'src/pages/portfolio/new-homes/credit-river-manor.jsx',
  componentName: 'CreditRiverManor',
  type: 'detail',
  projectKey: 'creditRiverManor',
  mainClasses: 'portfolio',
  sectionClassName: 'contentWrapper layoutAll layoutProject',
  componentsPath: '../../../components',
  staticPath: '../../../../static'
};
