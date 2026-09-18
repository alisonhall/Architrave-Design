import React from 'react';
import { render } from '@testing-library/react';

import Page from '../upcoming';

describe('upcoming page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/upcoming/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
