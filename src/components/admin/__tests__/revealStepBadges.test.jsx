import React, { useState } from 'react';
import { render } from '@testing-library/react';

import RevealStepBadges from '../revealStepBadges';

const rect = (overrides) => ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {}, ...overrides });

const tiles = {
  a: { kind: 'image', num: 2 },
  b: { kind: 'image', num: 9 },
  words: { kind: 'text' }
};
const rows = [
  { id: 'r1', columns: [{ id: 'c1', children: [{ nodeType: 'tileRef', tileKey: 'a' }, { nodeType: 'tileRef', tileKey: 'b' }] }] },
  { id: 'r2', columns: [{ id: 'c2', children: [{ nodeType: 'tileRef', tileKey: 'words' }, { nodeType: 'empty' }] }, { children: [] }] }
];

// Stands in for the real preview: a column's DOM children are its placements, in order.
const Harness = ({ layoutRows = rows }) => {
  const [el, setEl] = useState(null);
  return (
    <div ref={setEl}>
      <div data-row-id="r1">
        <div data-column-id="c1"><div className="tile-a" /><div className="tile-b" /></div>
      </div>
      <div data-row-id="r2">
        <div data-column-id="c2"><div /><div /></div>
      </div>
      <RevealStepBadges containerEl={el} rows={layoutRows} tiles={tiles} />
    </div>
  );
};

beforeEach(() => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mockImpl() {
    if (this.className === 'tile-a') return rect({ top: 10, bottom: 110, left: 20 });
    return rect({ top: 0, bottom: 0, left: 0 });
  });
});
afterEach(() => jest.restoreAllMocks());

describe('RevealStepBadges', () => {
  it('numbers each tile that fades in at steps 1–5, at its bottom-left, and nothing else', () => {
    const { container } = render(<Harness />);
    const badges = container.querySelectorAll('.adminRevealStepBadge');

    expect(badges).toHaveLength(1);
    expect(badges[0]).toHaveTextContent('2');
    expect(badges[0].style.top).toBe('110px');
    expect(badges[0].style.left).toBe('20px');
  });

  it('skips placements it can\'t find in the page', () => {
    const missing = [{ id: 'r9', columns: [{ id: 'nope', children: [{ nodeType: 'tileRef', tileKey: 'a' }] }] }];
    const extra = [{ id: 'r1', columns: [{ id: 'c1', children: [{ nodeType: 'tileRef', tileKey: 'b' }, { nodeType: 'tileRef', tileKey: 'words' }, { nodeType: 'tileRef', tileKey: 'a' }] }] }];
    expect(render(<Harness layoutRows={missing} />).container.querySelectorAll('.adminRevealStepBadge')).toHaveLength(0);
    expect(render(<Harness layoutRows={extra} />).container.querySelectorAll('.adminRevealStepBadge')).toHaveLength(0);
  });

  it('shows nothing before the preview exists', () => {
    const { container } = render(<RevealStepBadges containerEl={null} rows={rows} tiles={tiles} />);
    expect(container.querySelectorAll('.adminRevealStepBadge')).toHaveLength(0);
  });
});
