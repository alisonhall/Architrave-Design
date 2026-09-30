import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { DraftProvider } from '../draftContext';
import ProjectsEditor from '../projectsEditor';
import { seedDraft } from '../seedData';

const renderEditor = () => render(
  <DraftProvider>
    <ProjectsEditor />
  </DraftProvider>
);

const newHomesSection = () => screen.getByRole('heading', { name: 'New Homes' }).closest('section');

describe('ProjectsEditor', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.confirm = jest.fn(() => true);
  });

  it('lists shown and unused projects for each portfolio type', () => {
    renderEditor();

    const section = within(newHomesSection());
    // Note: a project can legitimately appear in both lists at once in the live data
    // (e.g. one currently listed as both shown and unused), hence getAllByText here.
    [...seedDraft.newProjectsOrder, ...seedDraft.unusedNewProjects].forEach((key) => {
      expect(section.getAllByText(seedDraft.projects[key].projectName).length).toBeGreaterThan(0);
    });
  });

  it('shows a thumbnail for each project row, identifying it by image', () => {
    renderEditor();

    const firstShownKey = seedDraft.newProjectsOrder[0];
    const firstShownName = seedDraft.projects[firstShownKey].projectName;
    const row = within(newHomesSection()).getByText(firstShownName).closest('li');

    const thumbnail = row.querySelector('img.adminThumbnail');
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', expect.stringContaining('c_fill'));
  });

  it('moves a shown project to "not shown" and back', () => {
    renderEditor();
    const firstShownKey = seedDraft.newProjectsOrder[0];
    const firstShownName = seedDraft.projects[firstShownKey].projectName;

    const section = within(newHomesSection());
    const row = section.getByText(firstShownName).closest('li');

    fireEvent.click(within(row).getByRole('button', { name: 'Hide' }));

    const notShownHeading = section.getByRole('heading', { name: 'Not shown' });
    expect(within(notShownHeading.closest('section') || section.container).getAllByText(firstShownName).length)
      .toBeGreaterThan(0);

    fireEvent.click(section.getAllByRole('button', { name: 'Show' }).find((button) =>
      button.closest('li').textContent.includes(firstShownName)
    ));

    expect(section.getByText(firstShownName).closest('li').querySelector('button')).toBeInTheDocument();
  });

  it('reorders shown projects with Up/Down', () => {
    renderEditor();
    const [firstKey, secondKey] = seedDraft.newProjectsOrder;
    const section = within(newHomesSection());

    const firstRow = section.getByText(seedDraft.projects[firstKey].projectName).closest('li');
    fireEvent.click(within(firstRow).getByRole('button', { name: 'Down' }));

    const rows = section.getAllByRole('listitem');
    expect(within(rows[0]).getByText(seedDraft.projects[secondKey].projectName)).toBeInTheDocument();
    expect(within(rows[1]).getByText(seedDraft.projects[firstKey].projectName)).toBeInTheDocument();
  });

  it('deletes a project after confirmation', () => {
    renderEditor();
    const key = seedDraft.newProjectsOrder[0];
    const name = seedDraft.projects[key].projectName;
    const section = within(newHomesSection());

    fireEvent.click(within(section.getByText(name).closest('li')).getByRole('button', { name: 'Delete' }));

    expect(window.confirm).toHaveBeenCalled();
    expect(section.queryByText(name)).not.toBeInTheDocument();
  });

  it('does not delete a project when the confirmation is declined', () => {
    window.confirm = jest.fn(() => false);
    renderEditor();
    const key = seedDraft.newProjectsOrder[0];
    const name = seedDraft.projects[key].projectName;
    const section = within(newHomesSection());

    fireEvent.click(within(section.getByText(name).closest('li')).getByRole('button', { name: 'Delete' }));

    expect(section.getByText(name)).toBeInTheDocument();
  });

  it('edits a project and shows a live preview', () => {
    renderEditor();
    const key = seedDraft.newProjectsOrder[0];
    const name = seedDraft.projects[key].projectName;
    const section = within(newHomesSection());

    fireEvent.click(within(section.getByText(name).closest('li')).getByRole('button', { name: 'Edit' }));

    const nameInput = screen.getByLabelText('Project name');
    fireEvent.change(nameInput, { target: { value: 'A Whole New Name' } });

    expect(screen.getByRole('heading', { name: 'Preview' })).toBeInTheDocument();
    expect(screen.getByText('A Whole New Name')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(section.getByText('A Whole New Name')).toBeInTheDocument();
  });

  it('cancels an edit without saving changes', () => {
    renderEditor();
    const key = seedDraft.newProjectsOrder[0];
    const name = seedDraft.projects[key].projectName;
    const section = within(newHomesSection());

    fireEvent.click(within(section.getByText(name).closest('li')).getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Should not stick' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(section.getByText(name)).toBeInTheDocument();
    expect(screen.queryByText('Should not stick')).not.toBeInTheDocument();
  });

  it('switching Edit to a different project without saving discards the first project\'s unsaved edits', () => {
    renderEditor();
    const [firstKey, secondKey] = seedDraft.newProjectsOrder;
    const firstName = seedDraft.projects[firstKey].projectName;
    const secondName = seedDraft.projects[secondKey].projectName;
    const section = within(newHomesSection());

    fireEvent.click(within(section.getByText(firstName).closest('li')).getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Unsaved draft text' } });

    fireEvent.click(within(section.getByText(secondName).closest('li')).getByRole('button', { name: 'Edit' }));

    // The form must reset to the second project's own data — not keep showing the first
    // project's unsaved edit, and not keep showing the first project's original name
    // either (this is now a fresh form for a different project entirely).
    expect(screen.getByLabelText('Project name')).toHaveValue(secondName);
    expect(screen.getByRole('heading', { name: `Editing: ${secondName}` })).toBeInTheDocument();
    expect(screen.queryByText('Unsaved draft text')).not.toBeInTheDocument();
  });

  it('adds a new project as "not shown" by default', () => {
    renderEditor();
    const section = within(newHomesSection());

    fireEvent.click(section.getByRole('button', { name: 'Add New Homes project' }));
    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Test Estate' } });
    fireEvent.change(screen.getByLabelText('Main image URL'), {
      target: { value: 'https://example.com/test-estate.jpg' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(section.getByText('Test Estate')).toBeInTheDocument();
    expect(section.getByText('Test Estate').closest('li').querySelector('button').textContent).toBe('Show');
  });

  it('moves a shown project up', () => {
    renderEditor();
    const shown = () => within(within(newHomesSection()).getAllByRole('list')[0]).getAllByRole('listitem')
      .map((item) => item.querySelector('.adminProjectsEditor-name').textContent);
    const [first, second] = shown();

    fireEvent.click(within(within(within(newHomesSection()).getAllByRole('list')[0]).getAllByRole('listitem')[1]).getByRole('button', { name: 'Up' }));

    expect(shown().slice(0, 2)).toEqual([second, first]);
  });
});
