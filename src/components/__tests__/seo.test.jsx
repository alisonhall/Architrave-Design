import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Seo from '../seo';

describe('Seo', () => {
  it('sets the default document title when no title is provided', async () => {
    render(<Seo />);

    await waitFor(() =>
      expect(document.title).toBe('Architrave Design, Architect | Residential Designs')
    );
  });

  it('sets a templated document title when a title is provided', async () => {
    render(<Seo title="404: Not found" />);

    await waitFor(() =>
      expect(document.title).toBe(
        '404: Not found | Architrave Design, Architect | Residential Designs'
      )
    );
  });

  it('sets the description meta tag to the provided description', async () => {
    render(<Seo description="Custom description" />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).toHaveAttribute('content', 'Custom description');
    });
  });

  it('falls back to the site description when none is provided', async () => {
    render(<Seo />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).toHaveAttribute(
        'content',
        'Architrave Design, Architect is a Residential Architect designing Homes and Additions in Etobicoke, Toronto, Mississauga, and Oakville.'
      );
    });
  });

  it('includes provided keywords in the keywords meta tag', async () => {
    render(<Seo keywords={['custom', 'keywords']} />);

    await waitFor(() => {
      const meta = document.querySelector('meta[name="keywords"]');
      expect(meta).toHaveAttribute('content', 'custom, keywords');
    });
  });
});
