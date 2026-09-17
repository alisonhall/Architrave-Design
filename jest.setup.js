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

  // jsdom has no PointerEvent constructor at all (confirmed: `new PointerEvent(...)`
  // throws ReferenceError), so @testing-library/react's fireEvent.pointerDown/Move/Up
  // silently fall back to a bare Event with none of the clientX/clientY init fields
  // applied — drag-resize logic reading event.clientY sees `undefined`, not a thrown
  // error, so this was easy to miss without a dedicated test. It's a real MouseEvent
  // subclass in browsers; this polyfill only carries the fields this codebase reads.
  if (!window.PointerEvent) {
    window.PointerEvent = class PointerEvent extends window.MouseEvent {
      constructor(type, params = {}) {
        super(type, params);
        this.pointerId = params.pointerId ?? 1;
        this.pointerType = params.pointerType ?? 'mouse';
      }
    };
  }
}
