import React from 'react';
import { render } from '@testing-library/react';

import Page from '../about';

describe('about page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/about/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
