import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ProjectForm from '../projectForm';

describe('ProjectForm', () => {
  it('starts blank in "add" mode', () => {
    render(<ProjectForm onSubmit={jest.fn()} onCancel={jest.fn()} />);

    expect(screen.getByLabelText('Project name')).toHaveValue('');
    expect(screen.getByLabelText('Main image URL')).toHaveValue('');
  });

  it('pre-fills fields from an initial project', () => {
    render(
      <ProjectForm
        initialProject={{ projectName: 'Existing Project', mainImageUrl: 'https://example.com/a.jpg' }}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Project name')).toHaveValue('Existing Project');
    expect(screen.getByLabelText('Main image URL')).toHaveValue('https://example.com/a.jpg');
  });

  it('calls onChange with the current values on every edit', () => {
    const onChange = jest.fn();
    render(<ProjectForm onChange={onChange} onSubmit={jest.fn()} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'New Name' } });

    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ projectName: 'New Name' }));
  });

  it('fills the file name from the project name on "Suggest from name"', () => {
    render(<ProjectForm onSubmit={jest.fn()} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: "Hogg's Hollow Estate" } });
    fireEvent.click(screen.getByRole('button', { name: 'Suggest from name' }));

    expect(screen.getByLabelText(/File name/)).toHaveValue('hogg-s-hollow-estate');
  });

  it('calls onSubmit with the current field values', () => {
    const onSubmit = jest.fn((event) => event);
    render(<ProjectForm onSubmit={onSubmit} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'Submitted Project' } });
    fireEvent.change(screen.getByLabelText('Main image URL'), {
      target: { value: 'https://example.com/submitted.jpg' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        projectName: 'Submitted Project',
        mainImageUrl: 'https://example.com/submitted.jpg'
      })
    );
  });

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = jest.fn();
    render(<ProjectForm onSubmit={jest.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalled();
  });
});
