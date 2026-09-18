import React from 'react';
import { render } from '@testing-library/react';

import Page from '../lytton-park-manor';

describe('lytton-park-manor page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/lytton-park-manor/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
