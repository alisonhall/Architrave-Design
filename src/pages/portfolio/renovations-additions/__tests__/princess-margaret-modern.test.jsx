import React from 'react';
import { render } from '@testing-library/react';

import Page from '../princess-margaret-modern';

describe('princess-margaret-modern page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/princess-margaret-modern/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
