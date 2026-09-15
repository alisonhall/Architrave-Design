import React from 'react';
import { render, screen } from '@testing-library/react';

import AboutPreview from '../aboutPreview';

describe('AboutPreview', () => {
  it('renders each section heading and paragraphs', () => {
    render(
      <AboutPreview
        intro={{ heading: 'Intro Heading', paragraphs: ['Intro paragraph.'] }}
        bio={{ heading: 'Bio Heading', paragraphs: ['Bio paragraph.'] }}
        approach={{ heading: 'Approach Heading', paragraphs: ['Approach paragraph.'] }}
      />
    );

    expect(screen.getByText('Intro Heading')).toBeInTheDocument();
    expect(screen.getByText('Intro paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Bio Heading')).toBeInTheDocument();
    expect(screen.getByText('Bio paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Approach Heading')).toBeInTheDocument();
    expect(screen.getByText('Approach paragraph.')).toBeInTheDocument();
  });
});
