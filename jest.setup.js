require('@testing-library/jest-dom');

// jsdom doesn't implement TextEncoder/TextDecoder or the Web Crypto API's `subtle` —
// polyfill both from Node's built-ins so code using them (e.g. the admin password
// gate's SHA-256 check) is testable without mocking per-test.
if (typeof window !== 'undefined') {
  if (!window.TextEncoder) {
    const { TextEncoder, TextDecoder } = require('util');
    window.TextEncoder = TextEncoder;
    window.TextDecoder = TextDecoder;
  }

  if (!window.crypto?.subtle) {
    const { webcrypto } = require('crypto');
    Object.defineProperty(window.crypto, 'subtle', { value: webcrypto.subtle });
  }
}
