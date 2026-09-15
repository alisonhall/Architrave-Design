// Canonical content for src/pages/reviews.jsx, rendered via
// src/components/reviewsPageLayout.jsx — the single source of truth both the real page
// and the admin tool's Reviews editor read, following the same data-file pattern as
// static/app-constants.js and static/layouts/*.js. The Houzz reviews link at the bottom
// of the page isn't part of this list — it comes from static/app-constants.js's
// `houzz.reviewsUrl`, since it's a fixed site-wide link, not one review among others.

const reviews = [
  {
    name: 'Marisa C',
    projectDate: 'April 2025',
    text: 'My husband and I are so incredibly happy that we chose Bill from Architrave Design to design our custom build in Etobicoke. Bill was an absolute pleasure to work with. Highly attentive to clients, detail oriented, excellent in exploring creative innovative solutions, problem solving, budget management. Bill was very professional and clear in his communication in all aspects of his service from design to documentation through to tender process. Highly personable and a significantly talented Architect with decades of expertise behind him. Bill most certainly went above and beyond to ensure our development was approved with council, which we are very grateful for. Thank you Bill for making this such a remarkable experience. We could not be more thrilled with our home.'
  },
  {
    name: 'Mike Attardo',
    projectDate: 'July 2025',
    text: 'Bill Hall from Architrave Design was an absolute pleasure to work with. The way he took our family by the hand through the process of planning, designing our dream home and going through all City Variance and Permitting processes was very impressive. We went back and forth a few times during the design phase making adjustments to our wish list and Bill was not only accommodating but extremely helpful in suggesting ideas to take the project to the next level. Overall, Bill was able to design a home that is very welcoming and enjoyable for our family to live and grow in.'
  },
  {
    name: 'Client',
    projectDate: 'June 2025',
    text: "We engaged Bill from Architrave to design a whole house renovation and addition, essentially giving us a new house. Our experience working with Bill was very positive. He was very knowledgeable and experienced in his field. He thought of everything that we could possibly want in our house, took us through the various permits required with ease, and checked in with us and our contractors throughout the process. We couldn't be happier with the end result! We absolutely love our new space and plan to enjoy it for many years to come."
  },
  {
    name: 'Mike Langdon',
    projectDate: 'November 2020',
    text: [
      "From the minute we met Bill, we had a sense he was the right architect to guide us through the design stage of our new home build. Bill designed a number of houses in our central Etobicoke neighbourhood (all of which we liked), so we were confident from the outset that his plans would be to our taste (which turned out to be absolutely true).",
      "And while that's important, it's not actually the reason we hired Bill.  More important to us were traits that were evident in our first meeting: Bill is calm, experienced and isn't afraid to share his perspective about what will actually work.  All three of those traits were exceptionally helpful during the design process -- and even as questions (mostly caused by our indecision) arose during the build.  Bill even gave us great counsel on some landscaping issues that arose with the city once the build was complete.",
      "In short: We love the house Bill designed.  We found him a calming and helpful resource when needed during the build phase.  And he really seemed invested in delivering on the design we had in mind.  10/10.  Would recommend him without reservation."
    ]
  },
  {
    name: 'Sean Holman',
    projectDate: 'October 2020',
    text: 'Doing a home renovation requires a lot of decision making and one of the most critical decisions is the selection of your architect.  After considering our options we selected Bill Hall and Architrave as our architect.  Simply put, Bill just "got" our project and had the same enthusiasm for it as we did.  He didn\'t see it simply as a job, he saw it as an opportunity to do something special in delivering on our dream.  He presented excellent drawings, continually asked us questions, was open to our thoughts and presented us options to get us to where we wanted to be.  Most importantly he listened.  He was there when we needed his feedback, but wasn\'t pushing us to his deadlines - he worked with our schedule.  He explained all the steps, simplified the permit process, including the challenge of the arborist and always made sure we were comfortable before we moved forward.  We couldn\'t be happier with the results.  We make sure to tell people who compliment us on the house the role that Bill and Architrave played.  If you want an architect that is easy to work with Bill and Architrave should be your choiuce.'
  },
  {
    name: 'sandyporter',
    projectDate: 'September 2020',
    text: [
      'We had been thinking of a complete renovation and addition to our 1940’s Sunnylea home for a number of years when met Bill Hall of Architrave Design. He had so many creative ideas to help us achieve exactly what we were looking for in our home.  He was patient and listened to all of our wishes. We knew there would be some limitations between what we wanted to do and what we could do in our space but his insight and approach really allowed us to build a beautiful, spacious and functional home. His design transformed our existing space to reflect the more modern/transitional feel that we wanted in our home.',
      'Not only was the design process seamless with Bill, he was able to guide us through the arduous process of applying for permits and going through the committee of adjustments.',
      'We have appreciated Bill’s availability to help us with not only his talent in design but also with his wealth of information and experience throughout the entire process from the start to finish. ',
      'We are thrilled with the end result and love our new home.  We would not hesitate to recommend Bill.'
    ]
  },
  {
    name: 'rezartasawhney',
    projectDate: 'January 2017',
    text: 'When it came time to build our dream home my husband & I had a very specific house in mind. We knew we wanted a Georgian style house but we also wanted it to feel unique to us. Bill listened to our ideas and delivered a beautiful and coherent design. Bill provided sound and practical advice from the drawings and design phase, to obtaining permits and going through the committee of adjustments. Building a home is a very collaborative process and Bill was always available to answer questions and help in making decisions throughout the construction whether by phone or on sight. From start to finish a pleasure to work with.'
  },
  {
    name: 'thekingsway',
    projectDate: 'October 2015',
    text: 'We highly recommend Bill from Architrave Design. Our family chose Bill to design a new build to replace the 1930s home we had been living in. Bill understood and delivered on our very specific requirements for a design that met with the character of the Kingsway, but appealed to our preference for a transitional open concept layout with centre hall plan and generous sized bedrooms and bathrooms. Throughout the process, Bill was a great listener and patient with our requests and iterations in the design process, yet remained focused on meeting the defined project budget. Bill also remained a great resource and continued to advise/engage/help ourselves as well as our contractor and sub-trades to ensure the integrity and intent of the final product were met. Overall, Bill was reliable, professional and delivered on promised timelines with an end result that met our expectations.'
  },
  {
    name: 'mrewa',
    projectDate: 'March 2013',
    text: 'From start to finish with building our new 7,500 sq ft home Bill Hall was fantastic. He listens and works with you to incorporate all of your needs and wants in designing your home. Bill is very talented and has a great eye for design, your house will not only look beautiful it will be extremely functional as well. When constructing a new home there are always issues that arise, Bill Hall was always there to help with a solution. I would highly recommend Architrave Design for any house project.'
  },
  {
    name: 'scottIon',
    projectDate: 'September 2013',
    text: 'Architrave Design (Bill) was wonderful to work with on our reno project. We chose Bill because his portfolio expressed a respect for the existing architecture, and how to integrate a new reno into an existing house to make it look like it had always ‘been like that’. He was flexible in meeting times/schedule, and provided a great deal of insight and experience. He worked within our budget, but was always realistic about the cost/feature tradeoff, and made helpful suggestions about different ways of approaching things. He also helped us navigate the (confusing) bureaucracy around the city by-laws process, and took an active role in working through some exemption applications. Throughout the project he was always available and would drop by to check on progress or to answer any questions that our GC had about the plans. We are thrilled with the end result, and were happy that Bill was part of the process.'
  },
  {
    name: 'msvobach',
    projectDate: 'January 2008',
    text: 'We hired Bill Hall of Architrave Design to bring our 1904 Edwardian home into the 21st century and he did an excellent job. He was very careful to maintain the gracious feeling and architectural heritage of the house and yet made it much more comfortable and livable. His design met virtually all of our requirements, was affordable and relatively easy for the contractor to implement. Bill was easy for all of us, including the contractor, to work with. Although he is a very talented professional, his ego never got in the way, and he always took our concerns and preferences into consideration. He was available on short notice to answer the contractors’ questions or resolve surprise issues which inevitably arise in renovation work. We could not have asked for a better person to help with our project and we were delighted with the end result. The renovated house is stunning!'
  },
  {
    name: 'Mark Rechsteiner',
    projectDate: 'August 2006',
    text: 'Working with Bill was great. We had decided to update our house with an Arts and Crafts theme and found Bill based on a referral. Not only does Bill have great design sensibilities, he is down to earth and has a manner that is easy to work with. He listened to our thoughts and was able to quickly come back with ideas that really worked. From re-imagining the exterior and interior, to designing our built-in furniture, Bill helped us create a house that we love to live in. We have recommended Architrave to several of our friends and they have all been very happy with quality of the work. We are grateful for the chance to work with Bill.'
  }
];

export default reviews;
