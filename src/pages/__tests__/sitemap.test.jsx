import React from 'react';
import { render } from '@testing-library/react';

import Page from '../sitemap';

describe('sitemap page', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Page location={{ pathname: '/sitemap/' }} />
    );

    expect(container).toMatchSnapshot();
  });
});
