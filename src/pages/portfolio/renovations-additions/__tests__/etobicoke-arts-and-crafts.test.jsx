import React from 'react';
import { render } from '@testing-library/react';

import Page from '../etobicoke-arts-and-crafts';

describe('etobicoke-arts-and-crafts page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/etobicoke-arts-and-crafts/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
