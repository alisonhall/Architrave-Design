import React from 'react';
import { render } from '@testing-library/react';

import Page from '../classic-centre-hall';

describe('classic-centre-hall page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/classic-centre-hall/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
