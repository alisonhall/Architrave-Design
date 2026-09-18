import React from 'react';
import { render } from '@testing-library/react';

import Page from '../404';

describe('404 page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/404/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
