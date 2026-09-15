import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { DraftProvider } from '../draftContext';
import AboutEditor from '../aboutEditor';

const renderEditor = () => render(
  <DraftProvider>
    <AboutEditor />
  </DraftProvider>
);

describe('AboutEditor', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('shows the three section headings with their seeded content', () => {
    renderEditor();

    // "Approach" also appears as a live-preview heading, hence getAllByRole here.
    expect(screen.getByRole('heading', { name: 'Introduction' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Bio' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: 'Approach' }).length).toBeGreaterThan(0);
    expect(screen.getAllByDisplayValue('Bill Hall').length).toBeGreaterThan(0);
  });

  it('editing a heading updates the live preview', () => {
    const { container } = renderEditor();

    const introSection = screen.getByRole('heading', { name: 'Introduction' }).closest('section');
    const headingInput = introSection.querySelector('input');
    fireEvent.change(headingInput, { target: { value: 'A New Intro Heading' } });

    const preview = container.querySelector('.adminAboutPreview');
    expect(within(preview).getByText('A New Intro Heading')).toBeInTheDocument();
  });

  it('editing a paragraph updates the live preview', () => {
    const { container } = renderEditor();

    const introSection = screen.getByRole('heading', { name: 'Introduction' }).closest('section');
    const textarea = introSection.querySelector('textarea');
    fireEvent.change(textarea, { target: { value: 'A brand new paragraph.' } });

    const preview = container.querySelector('.adminAboutPreview');
    expect(within(preview).getByText('A brand new paragraph.')).toBeInTheDocument();
  });

  it('adds and removes a paragraph', () => {
    renderEditor();

    const bioSection = screen.getByRole('heading', { name: 'Bio' }).closest('section');
    const paragraphCountBefore = bioSection.querySelectorAll('textarea').length;

    fireEvent.click(within(bioSection).getByRole('button', { name: 'Add paragraph' }));
    expect(bioSection.querySelectorAll('textarea').length).toBe(paragraphCountBefore + 1);

    const removeButtons = within(bioSection).getAllByRole('button', { name: 'Remove paragraph' });
    fireEvent.click(removeButtons[removeButtons.length - 1]);
    expect(bioSection.querySelectorAll('textarea').length).toBe(paragraphCountBefore);
  });
});
