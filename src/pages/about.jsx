import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/_about.scss';

const About = (props) => (
  <Layout urlPath={props.location.pathname} mainClasses="about">
    <SEO />
    <section className="contentWrapper clearfix">
      <div className="contentBackground clearfix">
        <section className="textContent">
          <h2 className="heading">Architrave Design, Architect</h2>
          <p>Architrave Design is an architectural firm known for its stylish, imaginative designs and personalized service. There is no typical project for us. We design small one-room additions to full custom homes. Whether working in Traditional or Contemporary style, we always explore a range of options with our clients until we find the perfect expression of their vision and sensibilities.</p>
          <p>As a member of the Ontario Association of Architects, we have the experience to take you through the entire design, approvals, and building process.</p>
        </section>
        <section className="centerContent clearfix">
          <section className="aboutImage">
          </section>
          <section className="textBlurb">
            <h2 className="heading">Bill Hall</h2>
            <p>Bill Hall is a licensed architect and has been a member of the OAA  for over 25 years. Bill has worked for some of the finest architectural firms in the Toronto area, designing homes and cottages across the country. In 2003, Bill founded Architrave Design Architect, a firm specializing solely in Custom homes and Renovations.</p>
          </section>
        </section>
        <section className="textContent">
          <h2 className="heading">Approach</h2>
          <p>Our approach is a simple one. Every single client works directly with Bill, meaning you have the benefit of an architect’s expertise from beginning to end of your construction project. He listens carefully, makes sure he understands your tastes, and works constantly on your behalf to ensure those wishes and visions are realized- from initial design through to the day your home is complete. Most importantly, he is always there to provide solid, practical advice for any and all questions you might have, before, during, and even after you have moved in.</p>
          <p>Behind Bill is a network of professionals- engineers, interior designers, landscape architects, arborists- experts in their fields available (if needed) to guarantee the success of your project. </p>
          <p>We work closely with all the major municipalities in Southern Ontario, from Toronto to cottage country. We can recommend reliable and skilled contractors wherever you might be building.</p>
        </section>
      </div>
    </section>
  </Layout>
)

export default About
