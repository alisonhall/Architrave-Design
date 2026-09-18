import React from 'react';
import { render } from '@testing-library/react';

import Page from '../rosedale-edwardian';

describe('rosedale-edwardian page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/renovations-additions/rosedale-edwardian/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
