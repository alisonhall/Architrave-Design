import React from 'react';
import { render } from '@testing-library/react';

import Page from '../renovations-additions';

describe('renovations-additions page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
