
const projectTypes = {
  renovations: 'renovations-additions',
  new: 'new-homes',
  upcoming: 'upcoming'
}

/**
 * Options for project constants
 * 
 * @param {Object} projectKeyName
 * @param {string} projectKeyName.key - the projectKeyName
 * @param {string} projectKeyName.fileName - the filename of the page
 * @param {string} projectKeyName.type - the type of project it is (one of the options from the projectTypes constant object)
 * @param {string} projectKeyName.imageFolder - the path to the folder within Cloudinary that contains the project's images
 * @param {string} projectKeyName.projectName - the title related to the project; used as text within the site
 * @param {string} projectKeyName.projectDescription - the description of the project; used on the project details page
 * @param {string} projectKeyName.completion - the future completion date, if applicable
 * @param {string} projectKeyName.mainImage - the name of the main thumbnail image of the project within Cloudinary
 * @param {string} projectKeyName.beforeImage - the name of the 'before' image of the project within Cloudinary
 */

const projects = {
  creditRiverClassic: {
    key: 'creditRiverClassic',
    fileName: 'credit-river-manor',
    type: projectTypes.new,
    projectName: 'Credit River Manor',
    projectDescription: 'Meticulous detail and the finest craftsmanship combine to make this spacious home a show-piece. Stonework by Gino Gentile is topped with a slate roof and imported copper details. Inside, a two-storey front foyer cascades down to a wood-beamed family room and a coffered kitchen.'
  },
  hoggsHollowFrenchCountry: {
    key: 'hoggsHollowFrenchCountry',
    fileName: 'hoggs-hollow-french-country',
    type: projectTypes.new,
    projectName: "Hogg's Hollow French Country",
    projectDescription: 'This riverside retreat is a blend of formal and casual living. The heart of the home is a gracious three-story central hall wrapping around an elliptical staircase. At the rear, floor to ceiling French doors lead out to terraces, pool and gardens.'
  },
  hoggsHollowTraditional: {
    key: 'hoggsHollowTraditional',
    fileName: 'hoggs-hollow-traditional',
    type: projectTypes.new,
    projectName: "Hogg's Hollow Traditional",
    projectDescription: 'This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight.'
  },
  kingswayGeorgian: {
    key: 'kingswayGeorgian',
    fileName: 'kingsway-georgian',
    type: projectTypes.new,
    projectName: 'Kingsway Georgian',
    projectDescription: 'This classic 3-storey Georgian home was built with hand-crafted detail throughout. A limestone portico leads guests into a gracious marble foyer and paneled hall. Designed for elegant entertaining, it still remains a warm and welcoming family home.'
  },
  kingswayTraditional: {
    key: 'kingswayTraditional',
    fileName: 'traditional-kingsway-park',
    type: projectTypes.new,
    projectName: 'Traditional Kingsway Park',
    projectDescription: 'Set in the heart of Kingsway Park, this home uses traditional proportions and materials to evoke the character of its established neighbourhood.  Inside, a light and contemporary palette of materials makes for relaxed and casual family living.'
  },
  kingswayTransitional: {
    key: 'kingswayTransitional',
    fileName: 'kingsway-transitional',
    type: projectTypes.new,
    projectName: 'Kingsway Transitional',
    projectDescription: 'A traditional street face respects the neighbourhood, but the interior of this family home is all glass, stone and clean modern lines. A winding central stair opens up the interior, flooding the home with light.'
  },
  oakvilleExecutiveHome: {
    key: 'oakvilleExecutiveHome',
    fileName: 'oakville-executive-home',
    type: projectTypes.new,
    projectName: 'Oakville Executive Home',
    projectDescription: 'Dormers and a low roofline combine to artfully downplay the size of this sprawling stone and brick home located on a private Oakville cul-de-sac.'
  },
  lyttonParkUpdate: {
    key: 'lyttonParkUpdate',
    fileName: 'lytton-park-manor',
    type: projectTypes.renovations,
    projectName: 'Lytton Park Manor',
    projectDescription: 'Built in 1908, this lovely home was full of charming detail but the interior was dark and lacked modern amenities. A seamless addition incorporates a bright eat-in kitchen and master suite above. New windows and wide archways let in the sun, while keeping the original character intact.'
  },
  princessMargaretFacelift: {
    key: 'princessMargaretFacelift',
    fileName: 'princess-margaret-modern',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/10-Princess-Margaret-Modern/',
    projectName: 'Princess Margaret Modern',
    projectDescription: 'This sixties era side-split needed a complete update inside and out. The main level was opened up, and a second floor master suite added. Stone and contemporary wood cladding combine to give the exterior a new modern look.'
  },
  cornwallHeritageAddition: {
    key: 'cornwallHeritageAddition',
    fileName: 'upper-canada-farmhouse',
    type: projectTypes.renovations,
    projectName: 'Upper Canada Farmhouse',
    projectDescription: 'An addition to this charming 1820’s Loyalist farmhouse respects the character of the old, while more than doubling the living space. A flagged centre hall joins old and new, and leads into a sunny country kitchen. Above it is an airy master bedroom with a vaulted ceiling, cozy sitting area, private balcony and sweeping views. '
  },
  rosedaleRevival: {
    key: 'rosedaleRevival',
    fileName: 'rosedale-edwardian',
    type: projectTypes.renovations,
    imageFolder: '2-Renovations-and-Additions/4-Rosedale-Edwardian/',
    projectName: 'Rosedale Edwardian',
    projectDescription: 'The original façade of this 1917 home had been painted over, but careful power washing revealed handsome Toronto brick hidden beneath. With Heritage approval, the front was re-imagined with a bold Edwardian-style bay and copper dormers. '
  },
  etobicokeRenewal: {
    key: 'etobicokeRenewal',
    fileName: 'etobicoke-arts-and-crafts',
    type: projectTypes.renovations,
    projectName: 'Etobicoke Arts and Crafts',
    projectDescription: 'This post-war bungalow had been marred with characterless additions, but the proportions were ideally suited for a make-over in period Arts-and-Crafts style. The interior was rebuilt with warm wood, custom cabinetry and plenty of glass. '
  },
  lorneParkInterior: {
    key: 'lorneParkInterior',
    fileName: 'lorne-park-interior',
    type: projectTypes.renovations,
    projectName: 'Lorne Park Interior',
    projectDescription: 'Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch.'
  },
  royalYorkFacelift: {
    key: 'royalYorkFacelift',
    fileName: 'royal-york-facelift',
    type: projectTypes.renovations,
    projectName: 'Royal York Facelift'
  },
  kingswayClassic: {
    key: 'kingswayClassic',
    type: projectTypes.upcoming,
    imageFolder: 'Kingsway-Classic',
    projectName: 'Kingsway Classic'
  },
  stGeorgesRebuild: {
    key: 'stGeorgesRebuild',
    type: projectTypes.upcoming,
    projectName: "St. George's Rebuild",
    completion: 'Completion 2019'
  },
  classicCentreHall: {
    key: 'classicCentreHall',
    fileName: 'classic-centre-hall',
    type: projectTypes.new,
    imageFolder: '1-New-Homes/5-Centre-Hall-Classic/',
    projectName: 'Classic Centre Hall',
    projectDescription: 'This luxury home in The Kingsway boasts a classically inspired stone façade. Inside, a two-story main hall adds a sense of drama with its wrap-around second floor balcony. The bright, contemporary family room opens to the backyard with wall to wall french doors.'
  },
  lorneParkRenovation: {
    key: 'lorneParkRenovation',
    type: projectTypes.upcoming,
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1602976686/ArchitraveDesign/3-Upcoming/Lorne_Park_Renovation_mihiez.jpg',
    projectName: 'Lorne Park Renovation'
  },
  etobicokeTransitional: {
    key: 'etobicokeTransitional',
    type: projectTypes.upcoming,
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1602976682/ArchitraveDesign/3-Upcoming/Etobicoke_Transitional_dotjej.jpg',
    projectName: 'Etobicoke Transitional'
  },
  norsemanTopUp: {
    key: 'norsemanTopUp',
    type: projectTypes.upcoming,
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1602976697/ArchitraveDesign/3-Upcoming/Norseman_Top_Up_hvicw4.jpg',
    projectName: 'Norseman Top Up'
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
    projects.norsemanTopUp.key,
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
    projects.kingswayClassic.key,
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
