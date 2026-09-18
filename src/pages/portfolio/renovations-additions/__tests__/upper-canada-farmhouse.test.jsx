import React from 'react';
import { render } from '@testing-library/react';

import Page from '../upper-canada-farmhouse';

describe('upper-canada-farmhouse page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/upper-canada-farmhouse/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
