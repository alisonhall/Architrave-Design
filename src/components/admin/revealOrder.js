import { computeTileOrder } from '../layoutTreeRenderer';

// Pages fade their image tiles in one step at a time on load: a tile's `num` becomes its
// `image<num>` class, and item.scss gives image1–image5 their own delays (1s, 1.5s, 2s,
// 2.5s, 3s); every other image — any other num — fades in together, last (3.5s).
export const REVEAL_STEPS = [1, 2, 3, 4, 5];
export const REST = 'rest';
export const BY_POSITION = 'position';

// The tile kinds that take part. Text, description and placeholder tiles are never
// numbered (see computeTileOrder in layoutTreeRenderer.jsx).
export const REVEALED_KINDS = ['project', 'filler', 'image', 'embed'];

export const isRevealedTile = (tile) => Boolean(tile) && REVEALED_KINDS.includes(tile.kind);

/**
 * @description Which reveal slot a tile is in: its step (1–5), REST (any other `num`),
 * or BY_POSITION (no `num` at all — the page numbers it by where it first appears, which
 * can change as the layout does).
 */
export const revealSlotOf = (tile) => {
  if (tile.num === undefined || tile.num === null) return BY_POSITION;
  return REVEAL_STEPS.includes(tile.num) ? tile.num : REST;
};

/**
 * @description The number for a tile that should fade in "with the rest": one past the
 * highest `num` already on the page, and never 5 or below — the same way the committed
 * layouts number those tiles (6, 7, 8, ...).
 */
export const nextRestNum = (tiles) => Math.max(
  5,
  ...Object.values(tiles).map((tile) => (typeof tile.num === 'number' ? tile.num : 0))
) + 1;

/**
 * @description A newly created tile's values with its reveal number filled in: "with
 * the rest", so a new tile never jumps ahead of the page's chosen order (without a
 * `num`, it would be numbered by position — first on the page would make it step 1).
 * Tiles that aren't revealed, or that already have a number, are returned unchanged.
 */
export const withRevealNum = (values, tiles) => (
  isRevealedTile(values) && values.num === undefined ? { ...values, num: nextRestNum(tiles) } : values
);

/**
 * @description `tiles` with one tile moved into a reveal slot. Moving into REST keeps a
 * tile's existing number if it's already one of the rest (so the file doesn't change
 * for nothing), and otherwise gives it the next one free.
 */
export const setRevealSlot = (tiles, tileKey, slot) => {
  const tile = tiles[tileKey];
  if (slot === REST) {
    if (revealSlotOf(tile) === REST) return tiles;
    const others = { ...tiles };
    delete others[tileKey];
    return { ...tiles, [tileKey]: { ...tile, num: nextRestNum(others) } };
  }
  if (tile.num === slot) return tiles;
  return { ...tiles, [tileKey]: { ...tile, num: slot } };
};

/**
 * @description The step each placed tile actually fades in at, in one layout tree —
 * exactly as the live page works it out (renderLayoutTree): its own `num`, or, without
 * one, its position among the page's revealed tiles. Only steps 1–5 are included; tiles
 * fading in with the rest are left out.
 *
 * @param {Array} rows
 * @param {Object} tiles
 * @returns {Object} { [tileKey]: 1–5 }
 */
export const revealStepsFor = (rows, tiles) => {
  const steps = {};
  computeTileOrder(rows, tiles).forEach((tileKey, index) => {
    const num = tiles[tileKey].num ?? index + 1;
    if (REVEAL_STEPS.includes(num)) steps[tileKey] = num;
  });
  return steps;
};
