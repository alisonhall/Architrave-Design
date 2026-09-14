import React from 'react';
import { render } from '@testing-library/react';

import Page from '../kingsway-georgian';

describe('kingsway-georgian page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/kingsway-georgian/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
