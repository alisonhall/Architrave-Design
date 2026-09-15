import React from 'react';
import { render, screen } from '@testing-library/react';

import AboutPageLayout, { AboutContent } from '../aboutPageLayout';

const props = {
  intro: { heading: 'Intro', paragraphs: ['Intro paragraph.'] },
  bio: { heading: 'Bio', paragraphs: ['Bio paragraph.'] },
  approach: { heading: 'Approach', paragraphs: ['Approach paragraph one.', 'Approach paragraph two.'] }
};

describe('AboutContent', () => {
  it('renders every section heading and paragraph', () => {
    render(<AboutContent {...props} />);

    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Intro paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Bio paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Approach')).toBeInTheDocument();
    expect(screen.getByText('Approach paragraph one.')).toBeInTheDocument();
    expect(screen.getByText('Approach paragraph two.')).toBeInTheDocument();
  });
});

describe('AboutPageLayout', () => {
  it('renders within the site Layout, with AboutContent inside', () => {
    const { container } = render(<AboutPageLayout {...props} location={{ pathname: '/about/' }} />);

    expect(container.querySelector('.about')).toBeInTheDocument();
    expect(screen.getByText('Intro')).toBeInTheDocument();
  });
});
