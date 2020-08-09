import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import houzzReviewsLogo from '../images/houzz_logo_reviews.png';

const Reviews = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="reviews">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textContent">
          <section className="review review1">
            <h3>rezartasawhney</h3>
            <h4>Project Date: </h4>
            <h5>January 2017</h5>
            <p>When it came time to build our dream home my husband & I had a very specific house in mind. We knew we wanted a Georgian style house but we also wanted it to feel unique to us. Bill listened to our ideas and delivered a beautiful and coherent design. Bill provided sound and practical advice from the drawings and design phase, to obtaining permits and going through the committee of adjustments. Building a home is a very collaborative process and Bill was always available to answer questions and help in making decisions throughout the construction whether by phone or on sight. From start to finish a pleasure to work with.</p>
          </section>
          <section className="review review2">
            <h3>thekingsway</h3>
            <h4>Project Date: </h4>
            <h5>October 2015</h5>
            <p>We highly recommend Bill from Architrave Design. Our family chose Bill to design a new build to replace the 1930s home we had been living in. Bill understood and delivered on our very specific requirements for a design that met with the character of the Kingsway, but appealed to our preference for a transitional open concept layout with centre hall plan and generous sized bedrooms and bathrooms. Throughout the process, Bill was a great listener and patient with our requests and iterations in the design process, yet remained focused on meeting the defined project budget. Bill also remained a great resource and continued to advise/engage/help ourselves as well as our contractor and sub-trades to ensure the integrity and intent of the final product were met. Overall, Bill was reliable, professional and delivered on promised timelines with an end result that met our expectations.</p>
          </section>
          <section className="review review3">
            <h3>mrewa</h3>
            <h4>Project Date: </h4>
            <h5>March 2013</h5>
            <p>From start to finish with building our new 7,500 sq ft home Bill Hall was fantastic. He listens and works with you to incorporate all of your needs and wants in designing your home. Bill is very talented and has a great eye for design, your house will not only look beautiful it will be extremely functional as well. When constructing a new home there are always issues that arise, Bill Hall was always there to help with a solution. I would highly recommend Architrave Design for any house project.</p>
          </section>
          <section className="review review4">
            <h3>scottIon</h3>
            <h4>Project Date: </h4>
            <h5>September 2013</h5>
            <p>Architrave Design (Bill) was wonderful to work with on our reno project. We chose Bill because his portfolio expressed a respect for the existing architecture, and how to integrate a new reno into an existing house to make it look like it had always ‘been like that’. He was flexible in meeting times/schedule, and provided a great deal of insight and experience. He worked within our budget, but was always realistic about the cost/feature tradeoff, and made helpful suggestions about different ways of approaching things. He also helped us navigate the (confusing) bureaucracy around the city by-laws process, and took an active role in working through some exemption applications. Throughout the project he was always available and would drop by to check on progress or to answer any questions that our GC had about the plans. We are thrilled with the end result, and were happy that Bill was part of the process.</p>
          </section>
          <section className="review review5">
            <h3>msvobach</h3>
            <h4>Project Date: </h4>
            <h5>January 2008</h5>
            <p>We hired Bill Hall of Architrave Design to bring our 1904 Edwardian home into the 21st century and he did an excellent job. He was very careful to maintain the gracious feeling and architectural heritage of the house and yet made it much more comfortable and livable. His design met virtually all of our requirements, was affordable and relatively easy for the contractor to implement. Bill was easy for all of us, including the contractor, to work with. Although he is a very talented professional, his ego never got in the way, and he always took our concerns and preferences into consideration. He was available on short notice to answer the contractors’ questions or resolve surprise issues which inevitably arise in renovation work. We could not have asked for a better person to help with our project and we were delighted with the end result. The renovated house is stunning!</p>
          </section>
          <section className="review review6">
            <h3>Mark Rechsteiner</h3>
            <h4>Project Date: </h4>
            <h5>August 2006</h5>
            <p>Working with Bill was great. We had decided to update our house with an Arts and Crafts theme and found Bill based on a referral. Not only does Bill have great design sensibilities, he is down to earth and has a manner that is easy to work with. He listened to our thoughts and was able to quickly come back with ideas that really worked. From re-imagining the exterior and interior, to designing our built-in furniture, Bill helped us create a house that we love to live in. We have recommended Architrave to several of our friends and they have all been very happy with quality of the work. We are grateful for the chance to work with Bill.</p>
          </section>
          <section className="textBlurb">
            <p>
              <a href="http://www.houzz.com/browseReviews/architrave">
                <img src={houzzReviewsLogo} alt="Houzz Reviews"/>
              </a>
            </p>
					</section>
          </section>
			</div>
		</section>
  </Layout>
)
    
export default Reviews
