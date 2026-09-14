import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import PasswordGate from '../passwordGate';

const CORRECT_PASSWORD = 'change-me-please';
const UNLOCK_KEY = 'architrave-admin-unlocked';

const enterPassword = (value) => {
  fireEvent.change(screen.getByLabelText('Passphrase'), { target: { value } });
  fireEvent.click(screen.getByRole('button', { name: /unlock/i }));
};

describe('PasswordGate', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('shows the passphrase prompt and hides children by default', () => {
    render(
      <PasswordGate>
        <p>secret content</p>
      </PasswordGate>
    );

    expect(screen.getByLabelText('Passphrase')).toBeInTheDocument();
    expect(screen.queryByText('secret content')).not.toBeInTheDocument();
  });

  it('disables the unlock button until a passphrase is entered', () => {
    render(
      <PasswordGate>
        <p>secret content</p>
      </PasswordGate>
    );

    expect(screen.getByRole('button', { name: /unlock/i })).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Passphrase'), { target: { value: 'x' } });

    expect(screen.getByRole('button', { name: /unlock/i })).toBeEnabled();
  });

  it('shows an error and keeps children hidden for an incorrect passphrase', async () => {
    render(
      <PasswordGate>
        <p>secret content</p>
      </PasswordGate>
    );

    enterPassword('wrong-password');

    await waitFor(() => expect(screen.getByText('Incorrect passphrase.')).toBeInTheDocument());
    expect(screen.queryByText('secret content')).not.toBeInTheDocument();
  });

  it('reveals children and persists the unlock for a correct passphrase', async () => {
    render(
      <PasswordGate>
        <p>secret content</p>
      </PasswordGate>
    );

    enterPassword(CORRECT_PASSWORD);

    await waitFor(() => expect(screen.getByText('secret content')).toBeInTheDocument());
    expect(window.sessionStorage.getItem(UNLOCK_KEY)).toBe('true');
  });

  it('skips the prompt when already unlocked in sessionStorage', () => {
    window.sessionStorage.setItem(UNLOCK_KEY, 'true');

    render(
      <PasswordGate>
        <p>secret content</p>
      </PasswordGate>
    );

    expect(screen.getByText('secret content')).toBeInTheDocument();
  });
});
