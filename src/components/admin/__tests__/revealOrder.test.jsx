import {
  REST,
  BY_POSITION,
  revealSlotOf,
  nextRestNum,
  withRevealNum,
  setRevealSlot,
  revealStepsFor,
  isRevealedTile
} from '../revealOrder';

const tileRef = (tileKey) => ({ nodeType: 'tileRef', tileKey });

describe('revealSlotOf', () => {
  it('is the step for 1–5, REST for any other number, and BY_POSITION with none', () => {
    expect(revealSlotOf({ num: 1 })).toBe(1);
    expect(revealSlotOf({ num: 5 })).toBe(5);
    expect(revealSlotOf({ num: 6 })).toBe(REST);
    expect(revealSlotOf({ num: 0 })).toBe(REST);
    expect(revealSlotOf({})).toBe(BY_POSITION);
    expect(revealSlotOf({ num: null })).toBe(BY_POSITION);
  });
});

describe('isRevealedTile', () => {
  it('covers project, filler, image and embed tiles only', () => {
    ['project', 'filler', 'image', 'embed'].forEach((kind) => expect(isRevealedTile({ kind })).toBe(true));
    ['text', 'description', 'placeholder'].forEach((kind) => expect(isRevealedTile({ kind })).toBe(false));
    expect(isRevealedTile(undefined)).toBe(false);
  });
});

describe('nextRestNum', () => {
  it('is one past the highest number on the page, and never 5 or below', () => {
    expect(nextRestNum({})).toBe(6);
    expect(nextRestNum({ a: { num: 2 }, b: { kind: 'text' } })).toBe(6);
    expect(nextRestNum({ a: { num: 10 }, b: { num: 3 } })).toBe(11);
  });
});

describe('withRevealNum', () => {
  it('gives a new revealed tile the next number with the rest', () => {
    expect(withRevealNum({ kind: 'image', imageUrl: 'x' }, { a: { num: 8 } })).toEqual({ kind: 'image', imageUrl: 'x', num: 9 });
  });

  it('leaves a tile alone if it isn\'t revealed, or already has a number', () => {
    const text = { kind: 'text', text: 'hi' };
    expect(withRevealNum(text, {})).toBe(text);
    const numbered = { kind: 'image', num: 2 };
    expect(withRevealNum(numbered, {})).toBe(numbered);
  });
});

describe('setRevealSlot', () => {
  const tiles = { a: { kind: 'image', num: 1 }, b: { kind: 'image', num: 7 }, c: { kind: 'image' } };

  it('sets a step directly', () => {
    expect(setRevealSlot(tiles, 'c', 3).c).toEqual({ kind: 'image', num: 3 });
  });

  it('moves a tile to the rest with the next free number', () => {
    expect(setRevealSlot(tiles, 'a', REST).a.num).toBe(8);
    expect(setRevealSlot(tiles, 'c', REST).c.num).toBe(8);
  });

  it('changes nothing when the tile is already there', () => {
    expect(setRevealSlot(tiles, 'a', 1)).toBe(tiles);
    expect(setRevealSlot(tiles, 'b', REST)).toBe(tiles);
  });

  it('doesn\'t count the tile\'s own number when picking one for the rest', () => {
    expect(setRevealSlot({ only: { kind: 'image', num: 2 } }, 'only', REST).only.num).toBe(6);
  });
});

describe('revealStepsFor', () => {
  it('uses each tile\'s own number, else its position — and leaves out everything after step 5', () => {
    const tiles = {
      first: { kind: 'image' },
      second: { kind: 'image', num: 4 },
      later: { kind: 'image', num: 9 },
      words: { kind: 'text' },
      third: { kind: 'image' }
    };
    const rows = [{ columns: [{ children: [tileRef('first'), tileRef('words'), tileRef('second'), tileRef('later'), tileRef('third')] }] }];

    // first: position 1; second: its own 4; later: 9 (not a step); third: position 4.
    expect(revealStepsFor(rows, tiles)).toEqual({ first: 1, second: 4, third: 4 });
  });
});
