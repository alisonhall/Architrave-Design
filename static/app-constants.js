
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
 * @param {string} projectKeyName.projectName - the title related to the project; used as text within the site
 * @param {string} projectKeyName.projectDescription - the description of the project; used on the project details page
 * @param {string} projectKeyName.completion - the future completion date, if applicable
 * @param {string} projectKeyName.mainImageUrl - the name of the main thumbnail image of the project within Cloudinary
 * @param {string} projectKeyName.beforeImageUrl - the name of the 'before' image of the project within Cloudinary
 */

const projects = {
  creditRiverManor: {
    key: 'creditRiverManor',
    fileName: 'credit-river-manor',
    type: projectTypes.new,
    projectName: 'Credit River Manor',
    projectDescription: 'Meticulous detail and the finest craftsmanship combine to make this spacious home a show-piece. Stonework by Gino Gentile is topped with a slate roof and imported copper details. Inside, a two-storey front foyer cascades down to a wood-beamed family room and a coffered kitchen.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1606592702/ArchitraveDesign/1-New-Homes/3-Credit-River-Manor/_1_fbaept.jpg'
  },
  hoggsHollowFrenchCountry: {
    key: 'hoggsHollowFrenchCountry',
    fileName: 'hoggs-hollow-french-country',
    type: projectTypes.new,
    projectName: "Hogg's Hollow French Country",
    projectDescription: 'This riverside retreat is a blend of formal and casual living. The heart of the home is a gracious three-story central hall wrapping around an elliptical staircase. At the rear, floor to ceiling French doors lead out to terraces, pool and gardens.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347167/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/4-Eat-in-Kitchen_owcnvf.jpg'
  },
  hoggsHollowTraditional: {
    key: 'hoggsHollowTraditional',
    fileName: 'hoggs-hollow-traditional',
    type: projectTypes.new,
    projectName: "Hogg's Hollow Traditional",
    projectDescription: 'This Don River family home opens itself to the lovely natural setting with balconies, terraces and plenty of glass. The interior wraps around a soaring elliptical staircase topped by a light-filled skylight.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347176/ArchitraveDesign/1-New-Homes/2-Hoggs-Hollow-French-Country/2-Centre-Hall-_-Elliptical-Stair_xlu5rz.jpg'
  },
  kingswayGeorgian: {
    key: 'kingswayGeorgian',
    fileName: 'kingsway-georgian',
    type: projectTypes.new,
    projectName: 'Kingsway Georgian',
    projectDescription: 'This classic 3-storey Georgian home was built with hand-crafted detail throughout. A limestone portico leads guests into a gracious marble foyer and paneled hall. Designed for elegant entertaining, it still remains a warm and welcoming family home.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347141/ArchitraveDesign/1-New-Homes/1-Kingsway-Classic-Georgian/1-Front-Facade_eohlwb.jpg'
  },
  traditionalKingswayPark: {
    key: 'traditionalKingswayPark',
    fileName: 'traditional-kingsway-park',
    type: projectTypes.new,
    projectName: 'Traditional Kingsway Park',
    projectDescription: 'Set in the heart of Kingsway Park, this home uses traditional proportions and materials to evoke the character of its established neighbourhood. Inside, a light and contemporary palette of materials makes for relaxed and casual family living.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347271/ArchitraveDesign/1-New-Homes/6-Kingsway-Park-Traditional/1-Traditional-Stone-Front_mk1zvn.jpg'
  },
  kingswayTransitional: {
    key: 'kingswayTransitional',
    fileName: 'kingsway-transitional',
    type: projectTypes.new,
    projectName: 'Kingsway Transitional',
    projectDescription: 'A traditional street face respects the neighbourhood, but the interior of this family home is all glass, stone and clean modern lines. A winding central stair opens up the interior, flooding the home with light.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347231/ArchitraveDesign/1-New-Homes/4-Kingsway-Transitional/1-Traditional-Front-Facade_xapffn.jpg'
  },
  oakvilleExecutiveHome: {
    key: 'oakvilleExecutiveHome',
    fileName: 'oakville-executive-home',
    type: projectTypes.new,
    projectName: 'Oakville Executive Home',
    projectDescription: 'Dormers and a low roofline combine to artfully downplay the size of this sprawling stone and brick home located on a private Oakville cul-de-sac.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347328/ArchitraveDesign/1-New-Homes/7-Oakville-Executive-Home/1-Front-Facade_rpftbr.jpg'
  },
  lyttonParkManor: {
    key: 'lyttonParkManor',
    fileName: 'lytton-park-manor',
    type: projectTypes.renovations,
    projectName: 'Lytton Park Manor',
    projectDescription: 'Built in 1908, this lovely home was full of charming detail but the interior was dark and lacked modern amenities. A seamless addition incorporates a bright eat-in kitchen and master suite above. New windows and wide archways let in the sun, while keeping the original character intact.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347340/ArchitraveDesign/2-Renovations-and-Additions/1-Lytton-Park-Manor/4-New-Landing-_-Stairs-to-Master-Suite_jydo7j.jpg'
  },
  princessMargaretModern: {
    key: 'princessMargaretModern',
    fileName: 'princess-margaret-modern',
    type: projectTypes.renovations,
    projectName: 'Princess Margaret Modern',
    projectDescription: 'This sixties era side-split needed a complete update inside and out. The main level was opened up, and a second floor master suite added. Stone and contemporary wood cladding combine to give the exterior a new modern look.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347401/ArchitraveDesign/2-Renovations-and-Additions/10-Princess-Margaret-Modern/2-Addition-_-_Re-facing_xddgjt.jpg'
  },
  upperCanadaFarmhouse: {
    key: 'upperCanadaFarmhouse',
    fileName: 'upper-canada-farmhouse',
    type: projectTypes.renovations,
    projectName: 'Upper Canada Farmhouse',
    projectDescription: 'An addition to this charming 1820’s Loyalist farmhouse respects the character of the old, while more than doubling the living space. A flagged centre hall joins old and new, and leads into a sunny country kitchen. Above it is an airy master bedroom with a vaulted ceiling, cozy sitting area, private balcony and sweeping views.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347369/ArchitraveDesign/2-Renovations-and-Additions/2-Cornwall-Loyalist-Farmhouse/1-1820_s-Farmhouse-_-New-Addition_qh1ha2.jpg'
  },
  rosedaleEdwardian: {
    key: 'rosedaleEdwardian',
    fileName: 'rosedale-edwardian',
    type: projectTypes.renovations,
    projectName: 'Rosedale Edwardian',
    projectDescription: 'The original façade of this 1917 home had been painted over, but careful power washing revealed handsome Toronto brick hidden beneath. With Heritage approval, the front was re-imagined with a bold Edwardian-style bay and copper dormers.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347393/ArchitraveDesign/2-Renovations-and-Additions/4-Rosedale-Edwardian/2-Edwardian-Renewal_htqqfn.jpg'
  },
  etobicokeArtsAndCrafts: {
    key: 'etobicokeArtsAndCrafts',
    fileName: 'etobicoke-arts-and-crafts',
    type: projectTypes.renovations,
    projectName: 'Etobicoke Arts and Crafts',
    projectDescription: 'This post-war bungalow had been marred with characterless additions, but the proportions were ideally suited for a make-over in period Arts-and-Crafts style. The interior was rebuilt with warm wood, custom cabinetry and plenty of glass.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347380/ArchitraveDesign/2-Renovations-and-Additions/3-Etobicoke-Arts-and-Crafts/2-Arts-and-Crafts-Restyling_jydm2x.jpg'
  },
  lorneParkInterior: {
    key: 'lorneParkInterior',
    fileName: 'lorne-park-interior',
    type: projectTypes.renovations,
    projectName: 'Lorne Park Interior',
    projectDescription: 'Updating the living area of this Lorne Park Prairie Style home is the first phase of a long term plan to remake the entire home. A dark and cluttered living-dining area was gutted, and redone with a light and modern touch.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940569/ArchitraveDesign/2-Renovations-and-Additions/Lorne-Park-Interior/Lorne-Park-4_usn7jd.jpg'
  },
  royalYorkFacelift: {
    key: 'royalYorkFacelift',
    fileName: 'royal-york-facelift',
    type: projectTypes.renovations,
    projectName: 'Royal York Facelift',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1613940687/ArchitraveDesign/2-Renovations-and-Additions/Royal-York-Facelift/Royal-York-2_ejplbx.jpg'
  },
  kingswayClassic: {
    key: 'kingswayClassic',
    type: projectTypes.upcoming,
    projectName: 'Kingsway Classic',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1571329986/ArchitraveDesign/3-Upcoming/Kingsway-Classic/_Kingsway_Classic_hpwrk4.jpg'
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
    projectName: 'Classic Centre Hall',
    projectDescription: 'This luxury home in The Kingsway boasts a classically inspired stone façade. Inside, a two-story main hall adds a sense of drama with its wrap-around second floor balcony. The bright, contemporary family room opens to the backyard with wall to wall french doors.',
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1595347266/ArchitraveDesign/1-New-Homes/5-Centre-Hall-Classic/1b-Cut-Stone-Facade_rkbnlo.jpg'
  },
  lorneParkRenovation: {
    key: 'lorneParkRenovation',
    type: projectTypes.upcoming,
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1602976686/ArchitraveDesign/3-Upcoming/Lorne-Park-Renovation/Lorne_Park_Renovation_mihiez.jpg',
    projectName: 'Lorne Park Renovation'
  },
  etobicokeTransitional: {
    key: 'etobicokeTransitional',
    type: projectTypes.upcoming,
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1602976682/ArchitraveDesign/3-Upcoming/Etobicoke-Transitional/Etobicoke_Transitional_dotjej.jpg',
    projectName: 'Etobicoke Transitional'
  },
  norsemanTopUp: {
    key: 'norsemanTopUp',
    type: projectTypes.upcoming,
    mainImageUrl: 'https://res.cloudinary.com/alisonkhall/image/upload/v1602976697/ArchitraveDesign/3-Upcoming/Norseman-Top-Up/Norseman_Top_Up_hvicw4.jpg',
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
    projects.creditRiverManor.key,
    projects.kingswayTransitional.key,
    projects.oakvilleExecutiveHome.key,
    projects.classicCentreHall.key,
    projects.hoggsHollowFrenchCountry.key,
    projects.traditionalKingswayPark.key
  ],
  renovationProjectsOrder: [
    projects.lyttonParkManor.key,
    projects.princessMargaretModern.key,
    projects.upperCanadaFarmhouse.key,
    projects.rosedaleEdwardian.key,
    projects.etobicokeArtsAndCrafts.key
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
  }
}

export default constants;
