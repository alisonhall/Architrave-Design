import React from 'react';
import { render } from '@testing-library/react';

import Page from '../princess-margaret-classic';

describe('princess-margaret-classic page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/princess-margaret-classic/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
