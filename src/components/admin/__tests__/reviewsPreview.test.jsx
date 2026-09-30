import React from 'react';
import { render, screen } from '@testing-library/react';

import ReviewsPreview from '../reviewsPreview';

describe('ReviewsPreview', () => {
  it('renders every review, including a multi-paragraph one', () => {
    render(
      <ReviewsPreview
        reviews={[
          { name: 'A Client', projectDate: 'June 2025', text: 'Single paragraph review.' },
          { name: 'B Client', projectDate: 'May 2025', text: ['First paragraph.', 'Second paragraph.'] }
        ]}
      />
    );

    expect(screen.getByText('A Client')).toBeInTheDocument();
    expect(screen.getByText('Single paragraph review.')).toBeInTheDocument();
    expect(screen.getByText('B Client')).toBeInTheDocument();
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
  });

  it("always includes the Houzz reviews link", () => {
    render(<ReviewsPreview reviews={[]} />);
    expect(screen.getByRole('link', { name: /houzz reviews/i })).toBeInTheDocument();
  });
});
