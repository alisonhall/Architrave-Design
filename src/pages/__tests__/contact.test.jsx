import React from 'react';
import { render } from '@testing-library/react';

import Page from '../contact';

describe('contact page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/contact/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
