import React from 'react';
import { render } from '@testing-library/react';

import Page from '../kingsway-transitional';

describe('kingsway-transitional page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/kingsway-transitional/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
