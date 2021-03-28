import React from 'react';
import { Link } from 'gatsby';

import constants from '../../static/app-constants';
import './prevNextProjectLinks.scss';

import leftArrow from '../images/arrow-left-solid.svg';
import rightArrow from '../images/arrow-right-solid.svg';

const { projectTypes, projects, newProjectsOrder, renovationProjectsOrder, portfolio } = constants;

/**
 * @description Either the previous or the next project links. Link is dynamically generated based on the project passed in.
 * 
 * @param {Object} param
 * @param {Object} param.project
 * @param {string} param.project.type
 * @param {string} param.project.key
 */
const PrevNextProjectLinks = ({
  project: {
    type,
    key
  } = {}
} = {}) => {
  let projectsOrder;
  if (type === projectTypes.renovations) {
    projectsOrder = renovationProjectsOrder;
  } else if (type === projectTypes.new) {
    projectsOrder = newProjectsOrder;
  }
  const currentProjectIndex = key && projectsOrder && projectsOrder.indexOf(key);

  if (currentProjectIndex >= 0) {
    const prevProjectIndex = currentProjectIndex === 0 ? projectsOrder.length - 1 : currentProjectIndex - 1;
    const nextProjectIndex = currentProjectIndex === projectsOrder.length - 1 ? 0 : currentProjectIndex + 1;
    const prevProject = prevProjectIndex >= 0 && projects[projectsOrder[prevProjectIndex]];
    const nextProject = nextProjectIndex >= 0 && projects[projectsOrder[nextProjectIndex]];

    if (!prevProject || !nextProject) {
      return null;
    }

    return (
      <>
        <Link
          to={`/${portfolio}/${type}/${prevProject.fileName}`}
          className="prevProject"
        >
          <img src={leftArrow} alt="" />
          <span>Previous Project</span>
        </Link>
        <Link
          to={`/${portfolio}/${type}/${nextProject.fileName}`}
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
