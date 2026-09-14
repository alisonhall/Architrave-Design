import React from 'react';
import { render } from '@testing-library/react';

import Page from '../hoggs-hollow-french';

describe('hoggs-hollow-french page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/hoggs-hollow-french/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
