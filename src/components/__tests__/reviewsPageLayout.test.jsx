import React from 'react';
import { render, screen } from '@testing-library/react';

import ReviewsPageLayout, { ReviewsContent, ReviewSection } from '../reviewsPageLayout';

describe('ReviewSection', () => {
  it('renders a single-paragraph review', () => {
    render(<ReviewSection name="A Client" projectDate="June 2025" text="Great experience." />);

    expect(screen.getByText('A Client')).toBeInTheDocument();
    expect(screen.getByText('Project Date:')).toBeInTheDocument();
    expect(screen.getByText('June 2025')).toBeInTheDocument();
    expect(screen.getByText('Great experience.')).toBeInTheDocument();
  });

  it('renders a multi-paragraph review as separate paragraphs', () => {
    render(<ReviewSection name="B Client" projectDate="May 2025" text={['First.', 'Second.']} />);

    expect(screen.getByText('First.')).toBeInTheDocument();
    expect(screen.getByText('Second.')).toBeInTheDocument();
  });
});

describe('ReviewsContent', () => {
  it('renders every review plus the Houzz reviews link', () => {
    render(<ReviewsContent reviews={[{ name: 'A Client', projectDate: 'June 2025', text: 'Great.' }]} />);

    expect(screen.getByText('A Client')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /houzz reviews/i })).toBeInTheDocument();
  });
});

describe('ReviewsPageLayout', () => {
  it('renders within the site Layout, with ReviewsContent inside', () => {
    const { container } = render(
      <ReviewsPageLayout
        reviews={[{ name: 'A Client', projectDate: 'June 2025', text: 'Great.' }]}
        location={{ pathname: '/reviews/' }}
      />
    );

    expect(container.querySelector('.reviews')).toBeInTheDocument();
    expect(screen.getByText('A Client')).toBeInTheDocument();
  });
});
