
const projectTypes = {
  renovations: 'renovations-additions',
  new: 'new-homes',
  upcoming: 'upcoming'
}

const projectKeys = {
  creditRiverClassic: 'creditRiverClassic',
  hoggsHollowFrenchCountry: 'hoggsHollowFrenchCountry',
  hoggsHollowTraditional: 'hoggsHollowTraditional',
  kingswayGeorgian: 'kingswayGeorgian',
  kingswayTraditional: 'kingswayTraditional',
  kingswayTransitional: 'kingswayTransitional',
  oakvilleExecutiveHome: 'oakvilleExecutiveHome',
  lyttonParkUpdate: 'lyttonParkUpdate',
  princessMargaretFacelift: 'princessMargaretFacelift',
  cornwallHeritageAddition: 'cornwallHeritageAddition',
  rosedaleRevival: 'rosedaleRevival',
  etobicokeRenewal: 'etobicokeRenewal',
  lorneParkInterior: 'lorneParkInterior',
  royalYorkFacelift: 'royalYorkFacelift',
  kingswayClassic: 'kingswayClassic',
  stGeorgesRebuild: 'stGeorgesRebuild'
}

const projects = {
  [projectKeys.creditRiverClassic]: {
    fileName: 'credit-river-classic',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.creditRiverClassic
  },
  [projectKeys.hoggsHollowFrenchCountry]: {
    fileName: 'hoggs-hollow-french-country',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.hoggsHollowFrenchCountry
  },
  [projectKeys.hoggsHollowTraditional]: {
    fileName: 'hoggs-hollow-traditional',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.hoggsHollowTraditional
  },
  [projectKeys.kingswayGeorgian]: {
    fileName: 'kingsway-georgian',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.kingswayGeorgian
  },
  [projectKeys.kingswayTraditional]: {
    fileName: 'kingsway-traditional',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.kingswayTraditional
  },
  [projectKeys.kingswayTransitional]: {
    fileName: 'kingsway-transitional',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.kingswayTransitional
  },
  [projectKeys.oakvilleExecutiveHome]: {
    fileName: 'oakville-executive-home',
    type: projectTypes.new,
    imageFolder: '',
    key: projectKeys.oakvilleExecutiveHome
  },
  [projectKeys.lyttonParkUpdate]: {
    fileName: 'lytton-park-update',
    type: projectTypes.renovations,
    imageFolder: '',
    key: projectKeys.lyttonParkUpdate
  },
  [projectKeys.princessMargaretFacelift]: {
    fileName: 'princess-margaret-facelift',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/10-Princess-Margaret-Modern/',
    key: projectKeys.princessMargaretFacelift
  },
  [projectKeys.cornwallHeritageAddition]: {
    fileName: 'cornwall-heritage-addition',
    type: projectTypes.renovations,
    imageFolder: '',
    key: projectKeys.cornwallHeritageAddition
  },
  [projectKeys.rosedaleRevival]: {
    fileName: 'rosedale-revival',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/4-Rosedale-Edwardian/',
    key: projectKeys.rosedaleRevival
  },
  [projectKeys.etobicokeRenewal]: {
    fileName: 'etobicoke-renewal',
    type: projectTypes.renovations,
    imageFolder: '',
    key: projectKeys.etobicokeRenewal
  },
  [projectKeys.lorneParkInterior]: {
    fileName: 'lorne-park-interior',
    type: projectTypes.renovations,
    imageFolder: '',
    key: projectKeys.lorneParkInterior
  },
  [projectKeys.royalYorkFacelift]: {
    fileName: 'royal-york-facelift',
    type: projectTypes.renovations,
    imageFolder: '',
    key: projectKeys.royalYorkFacelift
  },
  [projectKeys.kingswayClassic]: {
    type: projectTypes.upcoming,
    imageFolder: 'Kingsway-Classic',
    key: projectKeys.kingswayClassic
  },
  [projectKeys.stGeorgesRebuild]: {
    type: projectTypes.upcoming,
    imageFolder: null,
    key: projectKeys.stGeorgesRebuild
  }
}

const constants = {
  projectTypes,
  projects,
  projectKeys,
  [projectTypes.new + 'order']: [
    projectKeys.hoggsHollowTraditional,
    projectKeys.kingswayGeorgian,
    projectKeys.creditRiverClassic,
    projectKeys.kingswayTransitional,
    projectKeys.oakvilleExecutiveHome,
    projectKeys.hoggsHollowFrenchCountry,
    projectKeys.kingswayTraditional
  ],
  [projectTypes.renovations + '-order']: [
    projectKeys.lyttonParkUpdate,
    projectKeys.princessMargaretFacelift,
    projectKeys.cornwallHeritageAddition,
    projectKeys.rosedaleRevival,
    projectKeys.etobicokeRenewal
  ],
  cloudinary: {
    user: 'alisonkhall',
    account: 'v1571329783',
    siteFolder: 'ArchitraveDesign/'
  }
}

export default constants;
