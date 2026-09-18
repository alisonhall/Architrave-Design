import React from 'react';
import { render } from '@testing-library/react';

import Page from '../royal-york-facelift';

describe('royal-york-facelift page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/royal-york-facelift/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
