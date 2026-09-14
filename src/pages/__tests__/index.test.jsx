import React from 'react';
import { render } from '@testing-library/react';

import Page from '../index';

describe('index page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
