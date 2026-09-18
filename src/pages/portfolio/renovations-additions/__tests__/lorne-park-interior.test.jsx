import React from 'react';
import { render } from '@testing-library/react';

import Page from '../lorne-park-interior';

describe('lorne-park-interior page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/lorne-park-interior/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
