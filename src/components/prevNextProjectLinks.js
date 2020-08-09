import React from 'react';
import { Link } from 'gatsby';

import leftArrow from '../images/arrow-left-solid.svg';
import rightArrow from '../images/arrow-right-solid.svg';

import constants from '../../static/app-constants';

const PrevNextProjectLinks = ({
  project: {
    type,
    key
  } = {}
} = {}) => {
  const projectsOrder = constants[type + '-order'];
  const currentProjectIndex = key && projectsOrder && projectsOrder.indexOf(key);

  if (currentProjectIndex >= 0) {
    const prevProjectIndex = currentProjectIndex === 0 ? projectsOrder.length - 1 : currentProjectIndex - 1;
    const nextProjectIndex = currentProjectIndex === projectsOrder.length - 1 ? 0 : currentProjectIndex + 1;
    const prevProject = prevProjectIndex >= 0 && constants.projects[projectsOrder[prevProjectIndex]];
    const nextProject = nextProjectIndex >= 0 && constants.projects[projectsOrder[nextProjectIndex]];

    if (!prevProject || !nextProject) {
      return null;
    }

    return (
      <>
        <Link
          to={`/portfolio/${type}/${prevProject.fileName}`}
          className="prevProject"
        >
          <img src={leftArrow} alt="" />
          <span>Previous Project</span>
        </Link>
        <Link
          to={`/portfolio/${type}/${nextProject.fileName}`}
          className="nextProject"
        >
          <span>Next Project</span>
          <img src={rightArrow} alt="" />
        </Link>
      </>
    )
  }

  return null;
}

export default PrevNextProjectLinks
