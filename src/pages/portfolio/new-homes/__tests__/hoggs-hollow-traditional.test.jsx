import React from 'react';
import { render } from '@testing-library/react';

import Page from '../hoggs-hollow-traditional';

describe('hoggs-hollow-traditional page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/hoggs-hollow-traditional/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
