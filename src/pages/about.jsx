import React from 'react';

import aboutData from '../../static/about';
import AboutPageLayout from '../components/aboutPageLayout';

const About = (props) => <AboutPageLayout {...aboutData} location={props.location} />;

export default About;
