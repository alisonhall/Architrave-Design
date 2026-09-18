import React from 'react';
import { render } from '@testing-library/react';

import Page from '../oakville-executive-home';

describe('oakville-executive-home page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/oakville-executive-home/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
