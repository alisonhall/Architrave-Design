import React from 'react';
import { render } from '@testing-library/react';

import Page from '../reviews';

describe('reviews page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/reviews/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
