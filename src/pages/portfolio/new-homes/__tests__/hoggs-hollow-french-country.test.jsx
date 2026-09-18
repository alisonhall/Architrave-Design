import React from 'react';
import { render } from '@testing-library/react';

import Page from '../hoggs-hollow-french-country';

describe('hoggs-hollow-french-country page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/hoggs-hollow-french-country/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
