import React from 'react';
import { render, screen } from '@testing-library/react';

import PrevNextProjectLinks from '../prevNextProjectLinks';
import constants from '../../../static/app-constants';

const { newProjectsOrder, projects, projectTypes } = constants;

describe('PrevNextProjectLinks', () => {
  it('renders links to the previous and next projects in the order', () => {
    const currentKey = newProjectsOrder[1];
    const currentProject = projects[currentKey];
    const prevProject = projects[newProjectsOrder[0]];
    const nextProject = projects[newProjectsOrder[2]];

    render(
      <PrevNextProjectLinks project={{ type: currentProject.type, key: currentKey }} />
    );

    expect(screen.getByText('Previous Project').closest('a')).toHaveAttribute(
      'href',
      `/portfolio/${projectTypes.new}/${prevProject.fileName}`
    );
    expect(screen.getByText('Next Project').closest('a')).toHaveAttribute(
      'href',
      `/portfolio/${projectTypes.new}/${nextProject.fileName}`
    );
  });

  it('wraps around to the last project when on the first project', () => {
    const currentKey = newProjectsOrder[0];
    const currentProject = projects[currentKey];
    const lastProject = projects[newProjectsOrder[newProjectsOrder.length - 1]];

    render(
      <PrevNextProjectLinks project={{ type: currentProject.type, key: currentKey }} />
    );

    expect(screen.getByText('Previous Project').closest('a')).toHaveAttribute(
      'href',
      `/portfolio/${projectTypes.new}/${lastProject.fileName}`
    );
  });

  it('returns nothing when the project key is not found in any order', () => {
    const { container } = render(
      <PrevNextProjectLinks project={{ type: projectTypes.upcoming, key: 'unknownKey' }} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
