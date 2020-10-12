
const projectTypes = {
  renovations: 'renovations-additions',
  new: 'new-homes',
  upcoming: 'upcoming'
}

const projects = {
  creditRiverClassic: {
    key: 'creditRiverClassic',
    fileName: 'credit-river-manor',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  hoggsHollowFrenchCountry: {
    key: 'hoggsHollowFrenchCountry',
    fileName: 'hoggs-hollow-french-country',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  hoggsHollowTraditional: {
    key: 'hoggsHollowTraditional',
    fileName: 'hoggs-hollow-traditional',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  kingswayGeorgian: {
    key: 'kingswayGeorgian',
    fileName: 'kingsway-georgian',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  kingswayTraditional: {
    key: 'kingswayTraditional',
    fileName: 'traditional-kingsway-park',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  kingswayTransitional: {
    key: 'kingswayTransitional',
    fileName: 'kingsway-transitional',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  oakvilleExecutiveHome: {
    key: 'oakvilleExecutiveHome',
    fileName: 'oakville-executive-home',
    type: projectTypes.new,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  lyttonParkUpdate: {
    key: 'lyttonParkUpdate',
    fileName: 'lytton-park-manor',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  princessMargaretFacelift: {
    key: 'princessMargaretFacelift',
    fileName: 'princess-margaret-modern',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/10-Princess-Margaret-Modern/',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  cornwallHeritageAddition: {
    key: 'cornwallHeritageAddition',
    fileName: 'upper-canada-farmhouse',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  rosedaleRevival: {
    key: 'rosedaleRevival',
    fileName: 'rosedale-edwardian',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/4-Rosedale-Edwardian/',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  etobicokeRenewal: {
    key: 'etobicokeRenewal',
    fileName: 'etobicoke-arts-and-crafts',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  lorneParkInterior: {
    key: 'lorneParkInterior',
    fileName: 'lorne-park-interior',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  royalYorkFacelift: {
    key: 'royalYorkFacelift',
    fileName: 'royal-york-facelift',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: '',
    projectDescription: '',
    completion: null
  },
  kingswayClassic: {
    key: 'kingswayClassic',
    fileName: null,
    type: projectTypes.upcoming,
    imageFolder: 'Kingsway-Classic',
    projectName: 'Kingsway Classic',
    projectDescription: null,
    completion: null
  },
  stGeorgesRebuild: {
    key: 'stGeorgesRebuild',
    fileName: null,
    type: projectTypes.upcoming,
    imageFolder: null,
    projectName: '',
    projectDescription: null,
    completion: 'Completion 2019'
  },
  classicCentreHall: {
    key: 'classicCentreHall',
    fileName: 'classic-centre-hall',
    type: projectTypes.new,
    imageFolder: '1-New-Homes/5-Centre-Hall-Classic/',
    projectName: '',
    projectDescription: '',
    completion: null
  }
}

const constants = {
  portfolio: 'portfolio',
  projectTypes,
  projects,
  newProjectsOrder: [
    projects.hoggsHollowTraditional.key,
    projects.kingswayGeorgian.key,
    projects.creditRiverClassic.key,
    projects.kingswayTransitional.key,
    projects.oakvilleExecutiveHome.key,
    projects.classicCentreHall.key,
    projects.hoggsHollowFrenchCountry.key,
    projects.kingswayTraditional.key
  ],
  renovationProjectsOrder: [
    projects.lyttonParkUpdate.key,
    projects.princessMargaretFacelift.key,
    projects.cornwallHeritageAddition.key,
    projects.rosedaleRevival.key,
    projects.etobicokeRenewal.key
  ],
  unusedNewProjects: [],
  unusedRenovationProjects: [
    projects.lorneParkInterior.key,
    projects.royalYorkFacelift.key
  ],
  cloudinary: {
    user: 'alisonkhall',
    account: 'v1571329783',
    siteFolder: 'ArchitraveDesign/'
  },
  defaultIntroductionText: 'Designing stylish new homes and renovations in Etobicoke and the Greater Toronto Area.',
  houzz: {
    url: 'http://www.houzz.com/pro/architrave/architrave-design-architect',
    reviewsUrl: 'http://www.houzz.com/browseReviews/architrave'
  }
}

export default constants;
