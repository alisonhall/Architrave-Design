import React from 'react';
import { render } from '@testing-library/react';

import TextBlurbFiller from '../textBlurbFiller';

describe('TextBlurbFiller', () => {
  it('renders an empty section with the textBlurbFiller class', () => {
    const { container } = render(<TextBlurbFiller />);

    const section = container.querySelector('section.textBlurbFiller');
    expect(section).toBeInTheDocument();
    expect(section).toBeEmptyDOMElement();
  });

  it('applies the customClass prop', () => {
    const { container } = render(<TextBlurbFiller customClass="extra" />);

    expect(container.querySelector('section')).toHaveClass(
      'textBlurbFiller',
      'extra'
    );
  });
});
