import React from 'react';
import { render, screen } from '@testing-library/react';

import TextBlurb from '../textBlurb';

describe('TextBlurb', () => {
  it('renders the copy text', () => {
    render(<TextBlurb text={{ copy: 'Some copy' }} />);

    expect(screen.getByText('Some copy')).toBeInTheDocument();
  });

  it('renders the title and subtitle when provided', () => {
    render(
      <TextBlurb
        text={{ copy: 'Some copy', title: 'A title', subTitle: 'A subtitle' }}
      />
    );

    expect(screen.getByText('A title')).toBeInTheDocument();
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('does not render a heading section when title and subTitle are absent', () => {
    const { container } = render(<TextBlurb text={{ copy: 'Some copy' }} />);

    expect(container.querySelector('.headingSection')).not.toBeInTheDocument();
  });

  it('applies the customClass prop', () => {
    const { container } = render(
      <TextBlurb text={{ copy: 'Some copy' }} customClass="highlight" />
    );

    expect(container.querySelector('.textBlurb')).toHaveClass('highlight');
  });
});
