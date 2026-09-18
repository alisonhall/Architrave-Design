import React from 'react';
import { render } from '@testing-library/react';

import Page from '../traditional-kingsway-park';

describe('traditional-kingsway-park page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/portfolio/new-homes/traditional-kingsway-park/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
