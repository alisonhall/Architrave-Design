
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
    projectName: 'Credit River Manor',
    projectDescription: '',
    completion: null
  },
  hoggsHollowFrenchCountry: {
    key: 'hoggsHollowFrenchCountry',
    fileName: 'hoggs-hollow-french-country',
    type: projectTypes.new,
    imageFolder: '',
    projectName: "Hogg's Hollow French Country",
    projectDescription: '',
    completion: null
  },
  hoggsHollowTraditional: {
    key: 'hoggsHollowTraditional',
    fileName: 'hoggs-hollow-traditional',
    type: projectTypes.new,
    imageFolder: '',
    projectName: "Hogg's Hollow Traditional",
    projectDescription: '',
    completion: null
  },
  kingswayGeorgian: {
    key: 'kingswayGeorgian',
    fileName: 'kingsway-georgian',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Kingsway Georgian',
    projectDescription: '',
    completion: null
  },
  kingswayTraditional: {
    key: 'kingswayTraditional',
    fileName: 'traditional-kingsway-park',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Traditional Kingsway Park',
    projectDescription: '',
    completion: null
  },
  kingswayTransitional: {
    key: 'kingswayTransitional',
    fileName: 'kingsway-transitional',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Kingsway Transitional',
    projectDescription: '',
    completion: null
  },
  oakvilleExecutiveHome: {
    key: 'oakvilleExecutiveHome',
    fileName: 'oakville-executive-home',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Oakville Executive Home',
    projectDescription: '',
    completion: null
  },
  lyttonParkUpdate: {
    key: 'lyttonParkUpdate',
    fileName: 'lytton-park-manor',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Lytton Park Manor',
    projectDescription: '',
    completion: null
  },
  princessMargaretFacelift: {
    key: 'princessMargaretFacelift',
    fileName: 'princess-margaret-modern',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/10-Princess-Margaret-Modern/',
    projectName: 'Princess Margaret Modern',
    projectDescription: 'This sixties era side-split needed a complete update inside and out. The main level was opened up, and a second floor master suite added. Stone and contemporary wood cladding combine to give the exterior a new modern look.',
    completion: null
  },
  cornwallHeritageAddition: {
    key: 'cornwallHeritageAddition',
    fileName: 'upper-canada-farmhouse',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Upper Canada Farmhouse',
    projectDescription: '',
    completion: null
  },
  rosedaleRevival: {
    key: 'rosedaleRevival',
    fileName: 'rosedale-edwardian',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/4-Rosedale-Edwardian/',
    projectName: 'Rosedale Edwardian',
    projectDescription: '',
    completion: null
  },
  etobicokeRenewal: {
    key: 'etobicokeRenewal',
    fileName: 'etobicoke-arts-and-crafts',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Etobicoke Arts and Crafts',
    projectDescription: '',
    completion: null
  },
  lorneParkInterior: {
    key: 'lorneParkInterior',
    fileName: 'lorne-park-interior',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Lorne Park Interior',
    projectDescription: '',
    completion: null
  },
  royalYorkFacelift: {
    key: 'royalYorkFacelift',
    fileName: 'royal-york-facelift',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Royal York Facelift',
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
    projectName: "St. George's Rebuild",
    projectDescription: null,
    completion: 'Completion 2019'
  },
  classicCentreHall: {
    key: 'classicCentreHall',
    fileName: 'classic-centre-hall',
    type: projectTypes.new,
    imageFolder: '1-New-Homes/5-Centre-Hall-Classic/',
    projectName: 'Classic Centre Hall',
    projectDescription: 'This luxury home in The Kingsway boasts a classically inspired stone façade. Inside, a two-story main hall adds a sense of drama with its wrap-around second floor balcony. The bright, contemporary family room opens to the backyard with wall to wall french doors.',
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
