import React from 'react';
import { render } from '@testing-library/react';

import Page from '../new-homes';

describe('new-homes page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
