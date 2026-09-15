import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ActionsMenu from '../actionsMenu';

describe('ActionsMenu', () => {
  it('does not show its actions until opened', () => {
    render(<ActionsMenu actions={[{ label: 'Edit', onClick: jest.fn() }]} />);
    expect(screen.queryByRole('menuitem', { name: 'Edit' })).not.toBeInTheDocument();
  });

  it('shows its actions after clicking the menu button', () => {
    render(<ActionsMenu actions={[{ label: 'Edit', onClick: jest.fn() }, { label: 'Delete', onClick: jest.fn() }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Actions ▾' }));

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls the action and closes the menu when an item is clicked', () => {
    const onClick = jest.fn();
    render(<ActionsMenu actions={[{ label: 'Edit', onClick }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Actions ▾' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onClick).toHaveBeenCalled();
    expect(screen.queryByRole('menuitem', { name: 'Edit' })).not.toBeInTheDocument();
  });

  it('closes when clicking outside the menu', () => {
    render(
      <div>
        <ActionsMenu actions={[{ label: 'Edit', onClick: jest.fn() }]} />
        <button type="button">Elsewhere</button>
      </div>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Actions ▾' }));
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Elsewhere' }));
    expect(screen.queryByRole('menuitem', { name: 'Edit' })).not.toBeInTheDocument();
  });

  it('disables an action and does not call it when clicked', () => {
    const onClick = jest.fn();
    render(<ActionsMenu actions={[{ label: 'Up', onClick, disabled: true }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Actions ▾' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Up' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports a custom menu button label', () => {
    render(<ActionsMenu label="⋯" actions={[{ label: 'Edit', onClick: jest.fn() }]} />);
    expect(screen.getByRole('button', { name: '⋯' })).toBeInTheDocument();
  });
});
