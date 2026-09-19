import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { DraftProvider } from '../draftContext';
import ReviewsEditor from '../reviewsEditor';

const renderEditor = () => render(
  <DraftProvider>
    <ReviewsEditor />
  </DraftProvider>
);

describe('ReviewsEditor', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.confirm = jest.fn(() => true);
  });

  it('lists the seeded reviews', () => {
    renderEditor();

    expect(screen.getAllByText(/Marisa C —/).length).toBeGreaterThan(0);
  });

  it('adds a new review and shows it in the live preview', () => {
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Add review' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Client' } });
    fireEvent.change(screen.getByLabelText(/Project date/), { target: { value: 'January 2026' } });
    fireEvent.change(screen.getByLabelText(/^Text/), { target: { value: 'A wonderful experience.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add review' }));

    expect(screen.getAllByText(/New Client —/).length).toBeGreaterThan(0);
    expect(screen.getByText('A wonderful experience.')).toBeInTheDocument();
  });

  it('splits a blank-line-separated text into multiple paragraphs on save', () => {
    renderEditor();

    fireEvent.click(screen.getByRole('button', { name: 'Add review' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Multi Para Client' } });
    fireEvent.change(screen.getByLabelText(/Project date/), { target: { value: 'February 2026' } });
    fireEvent.change(screen.getByLabelText(/^Text/), { target: { value: 'First paragraph.\n\nSecond paragraph.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add review' }));

    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
  });

  it('edits an existing review in place', () => {
    renderEditor();

    const row = screen.getAllByText(/Marisa C —/)[0].closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Marisa Renamed' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getAllByText(/Marisa Renamed —/).length).toBeGreaterThan(0);
  });

  it('deletes a review after confirmation', () => {
    renderEditor();

    const rowsBefore = screen.getAllByRole('listitem').length;
    const row = screen.getAllByText(/Marisa C —/)[0].closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Delete' }));

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.getAllByRole('listitem').length).toBe(rowsBefore - 1);
  });

  it('does not delete when confirmation is declined', () => {
    window.confirm = jest.fn(() => false);
    renderEditor();

    const rowsBefore = screen.getAllByRole('listitem').length;
    const row = screen.getAllByText(/Marisa C —/)[0].closest('li');
    fireEvent.click(within(row).getByRole('button', { name: 'Delete' }));

    expect(screen.getAllByRole('listitem').length).toBe(rowsBefore);
  });

  it('reorders a review with the Up/Down buttons', () => {
    renderEditor();

    const rows = screen.getAllByRole('listitem');
    const firstNameBefore = within(rows[0]).getByText(/—/).textContent;

    fireEvent.click(within(rows[0]).getByRole('button', { name: 'Down' }));

    const rowsAfter = screen.getAllByRole('listitem');
    expect(within(rowsAfter[0]).getByText(/—/).textContent).not.toBe(firstNameBefore);
  });

  it('cancels adding a review without changing the list', () => {
    renderEditor();

    const rowsBefore = screen.getAllByRole('listitem').length;
    fireEvent.click(screen.getByRole('button', { name: 'Add review' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getAllByRole('listitem').length).toBe(rowsBefore);
    expect(screen.getByRole('button', { name: 'Add review' })).toBeInTheDocument();
  });
});
