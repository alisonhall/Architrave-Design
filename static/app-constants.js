
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
    projectDescription: 'Meticulous detail and the finest craftsmanship combine to make this spacious home a show-piece. Stonework by Gino Gentile is topped with a slate roof and imported copper details. Inside, a two-storey front foyer cascades down to a wood-beamed family room and a coffered kitchen.',
    completion: null
  },
  hoggsHollowFrenchCountry: {
    key: 'hoggsHollowFrenchCountry',
    fileName: 'hoggs-hollow-french-country',
    type: projectTypes.new,
    imageFolder: '',
    projectName: "Hogg's Hollow French Country",
    projectDescription: 'This riverside retreat is a blend of formal and casual living. The heart of the home is a gracious three-story central hall wrapping around an elliptical staircase. At the rear, floor to ceiling French doors lead out to terraces, pool and gardens.',
    completion: null
  },
  hoggsHollowTraditional: {
    key: 'hoggsHollowTraditional',
    fileName: 'hoggs-hollow-traditional',
    type: projectTypes.new,
    imageFolder: '',
    projectName: "Hogg's Hollow Traditional",
    projectDescription: 'This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight.',
    completion: null
  },
  kingswayGeorgian: {
    key: 'kingswayGeorgian',
    fileName: 'kingsway-georgian',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Kingsway Georgian',
    projectDescription: 'This classic 3-storey Georgian home was built with hand-crafted detail throughout. A limestone portico leads guests into a gracious marble foyer and paneled hall. Designed for elegant entertaining, it still remains a warm and welcoming family home.',
    completion: null
  },
  kingswayTraditional: {
    key: 'kingswayTraditional',
    fileName: 'traditional-kingsway-park',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Traditional Kingsway Park',
    projectDescription: 'Set in the heart of Kingsway Park, this home uses traditional proportions and materials to evoke the character of its established neighbourhood.  Inside, a light and contemporary palette of materials makes for relaxed and casual family living.',
    completion: null
  },
  kingswayTransitional: {
    key: 'kingswayTransitional',
    fileName: 'kingsway-transitional',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Kingsway Transitional',
    projectDescription: 'A traditional street face respects the neighbourhood, but the interior of this family home is all glass, stone and clean modern lines. A winding central stair opens up the interior, flooding the home with light.',
    completion: null
  },
  oakvilleExecutiveHome: {
    key: 'oakvilleExecutiveHome',
    fileName: 'oakville-executive-home',
    type: projectTypes.new,
    imageFolder: '',
    projectName: 'Oakville Executive Home',
    projectDescription: 'Dormers and a low roofline combine to artfully downplay the size of this sprawling stone and brick home located on a private Oakville cul-de-sac.',
    completion: null
  },
  lyttonParkUpdate: {
    key: 'lyttonParkUpdate',
    fileName: 'lytton-park-manor',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Lytton Park Manor',
    projectDescription: 'Built in 1908, this lovely home was full of charming detail but the interior was dark and lacked modern amenities. A seamless addition incorporates a bright eat-in kitchen and master suite above. New windows and wide archways let in the sun, while keeping the original character intact.',
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
    projectDescription: 'An addition to this charming 1820’s Loyalist farmhouse respects the character of the old, while more than doubling the living space. A flagged centre hall joins old and new, and leads into a sunny country kitchen. Above it is an airy master bedroom with a vaulted ceiling, cozy sitting area, private balcony and sweeping views. ',
    completion: null
  },
  rosedaleRevival: {
    key: 'rosedaleRevival',
    fileName: 'rosedale-edwardian',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/4-Rosedale-Edwardian/',
    projectName: 'Rosedale Edwardian',
    projectDescription: 'The original façade of this 1917 home had been painted over, but careful power washing revealed handsome Toronto brick hidden beneath. With Heritage approval, the front was re-imagined with a bold Edwardian-style bay and copper dormers. ',
    completion: null
  },
  etobicokeRenewal: {
    key: 'etobicokeRenewal',
    fileName: 'etobicoke-arts-and-crafts',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Etobicoke Arts and Crafts',
    projectDescription: 'This post-war bungalow had been marred with characterless additions, but the proportions were ideally suited for a make-over in period Arts-and-Crafts style. The interior was rebuilt with warm wood, custom cabinetry and plenty of glass. ',
    completion: null
  },
  lorneParkInterior: {
    key: 'lorneParkInterior',
    fileName: 'lorne-park-interior',
    type: projectTypes.renovations,
    imageFolder: '',
    projectName: 'Lorne Park Interior',
    projectDescription: 'Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch.',
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
    mainImage: null,
    beforeImage: null,
    projectName: 'Kingsway Classic',
    projectDescription: null,
    completion: null
  },
  stGeorgesRebuild: {
    key: 'stGeorgesRebuild',
    fileName: null,
    type: projectTypes.upcoming,
    imageFolder: null,
    mainImage: null,
    beforeImage: null,
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
  },
  lorneParkRenovation: {
    key: 'lorneParkRenovation',
    fileName: null,
    type: projectTypes.upcoming,
    imageFolder: null,
    mainImage: 'Lorne_Park_Renovation_mihiez.jpg',
    beforeImage: 'Lorne_Park_Renovation_mihiez.jpg',
    projectName: 'Lorne Park Renovation',
    projectDescription: null,
    completion: null
  },
  etobicokeTransitional: {
    key: 'etobicokeTransitional',
    fileName: null,
    type: projectTypes.upcoming,
    imageFolder: null,
    mainImage: 'Etobicoke_Transitional_dotjej.jpg',
    beforeImage: null,
    projectName: 'Etobicoke Transitional',
    projectDescription: null,
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
  upcomingProjectsOrder: [
    projects.lorneParkRenovation.key,
    projects.etobicokeTransitional.key
  ],
  unusedNewProjects: [],
  unusedRenovationProjects: [
    projects.lorneParkInterior.key,
    projects.royalYorkFacelift.key
  ],
  unusedUpcomingProjects: [
    projects.stGeorgesRebuild.key,
    projects.kingswayClassic.key
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
  },
  defaultUpcomingImageFolder: '3-Upcoming/'
}

export default constants;
