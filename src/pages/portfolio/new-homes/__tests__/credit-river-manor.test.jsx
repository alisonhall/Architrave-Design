import React from 'react';
import { render } from '@testing-library/react';

import Page from '../credit-river-manor';

describe('credit-river-manor page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/credit-river-manor/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
