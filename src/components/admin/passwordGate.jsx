import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const UNLOCK_KEY = 'architrave-admin-unlocked';

// This is a client-side speed bump, not real access control — the whole site (this
// hash included) ships publicly in the built bundle, so anyone with devtools can read
// or bypass it. It exists to keep the admin page from being stumbled into, not to
// protect anything genuinely sensitive.
//
// Default passphrase is "change-me-please" — change it before deploying by running:
//   node -e "console.log(require('crypto').createHash('sha256').update('YOUR-PASSPHRASE').digest('hex'))"
// and pasting the result below.
const PASSWORD_HASH = 'f5dcec9289c446e7099d483f2ed447c990b3868a2fab4ff4a39436c63589c70e';

const sha256Hex = async (text) => {
  const encoded = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * @description Gates its children behind a passphrase prompt. Unlock state is kept in
 * sessionStorage only, so it resets on browser/tab close.
 *
 * @param {Object} param
 * @param {Node} param.children
 */
const PasswordGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(UNLOCK_KEY) === 'true') setUnlocked(true);
    } catch (storageError) {
      // sessionStorage unavailable; fall through to the password prompt every time.
    }
  }, []);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus();
  }, [unlocked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChecking(true);
    const hash = await sha256Hex(password);
    setChecking(false);

    if (hash === PASSWORD_HASH) {
      setUnlocked(true);
      setError(false);
      try {
        window.sessionStorage.setItem(UNLOCK_KEY, 'true');
      } catch (storageError) {
        // Unlock still works for this render even if it can't persist.
      }
    } else {
      setError(true);
    }
  };

  if (unlocked) return children;

  return (
    <div className="adminPasswordGate">
      <form onSubmit={handleSubmit}>
        <h1>Admin</h1>
        <label htmlFor="admin-password">Passphrase</label>
        <input
          id="admin-password"
          type="password"
          ref={inputRef}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}
        />
        <button type="submit" disabled={checking || !password}>
          {checking ? 'Checking…' : 'Unlock'}
        </button>
        {error && <p className="adminPasswordGate-error">Incorrect passphrase.</p>}
      </form>
    </div>
  );
};

PasswordGate.propTypes = {
  children: PropTypes.node.isRequired
};

export default PasswordGate;
