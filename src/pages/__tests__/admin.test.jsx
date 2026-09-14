import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Page from '../admin';

describe('admin page', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('is not indexable by search engines', async () => {
    render(<Page />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="robots"]');
      expect(meta).toHaveAttribute('content', 'noindex,nofollow');
    });
  });

  it('renders behind the password gate by default', () => {
    render(<Page />);

    expect(screen.getByLabelText('Passphrase')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Page />);

    expect(container).toMatchSnapshot();
  });
});
