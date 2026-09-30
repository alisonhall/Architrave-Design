import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { REVEAL_STEPS, REST, BY_POSITION, isRevealedTile, revealSlotOf, setRevealSlot } from './revealOrder';
import { tileSummary, tileThumbnailUrl } from './tileLibraryEditor';
import AdminThumbnail from './adminThumbnail';

// When each slot fades in (item.scss).
const SLOT_TIMES = { 1: '1s', 2: '1.5s', 3: '2s', 4: '2.5s', 5: '3s', [REST]: '3.5s' };

const slotLabel = (slot) => {
  if (slot === REST) return `With the rest — ${SLOT_TIMES[REST]}`;
  if (slot === BY_POSITION) return 'By position — not set yet';
  return `Step ${slot} — ${SLOT_TIMES[slot]}`;
};

const parseSlot = (value) => {
  if (value === REST || value === BY_POSITION) return value;
  return Number(value);
};

// Movement below this (px) counts as a click on a drag handle, not a drag.
const DRAG_THRESHOLD = 4;

/**
 * @description Pointer-driven drag of a tile onto a reveal slot (the same pointer-event
 * approach as the layout toolbars, so it works on touch screens too): press a tile's
 * handle, move, and release over a slot. `dragOver` is the slot under the pointer while
 * a drag is under way.
 */
const useSlotDrag = (onDrop) => {
  const [drag, setDrag] = useState(null);

  const slotAt = (x, y) => {
    const el = document.elementFromPoint(x, y);
    const slotEl = el && el.closest('[data-reveal-slot]');
    return slotEl ? parseSlot(slotEl.dataset.revealSlot) : null;
  };

  const startDrag = (event, tileKey) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const start = { x: event.clientX, y: event.clientY };
    let current = null;

    const handleMove = (moveEvent) => {
      if (moveEvent.buttons === 0) {
        cleanUp();
        return;
      }
      const moved = Math.abs(moveEvent.clientX - start.x) > DRAG_THRESHOLD || Math.abs(moveEvent.clientY - start.y) > DRAG_THRESHOLD;
      if (!current && !moved) return;
      current = { tileKey, over: slotAt(moveEvent.clientX, moveEvent.clientY) };
      setDrag(current);
    };

    function cleanUp() {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointercancel', cleanUp);
      setDrag(null);
    }

    function handleUp(upEvent) {
      cleanUp();
      if (!current) return;
      const slot = slotAt(upEvent.clientX, upEvent.clientY);
      if (slot !== null && slot !== BY_POSITION) onDrop(tileKey, slot);
    }

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    document.addEventListener('pointercancel', cleanUp);
  };

  return { drag, startDrag };
};

/**
 * @description The Reveal order panel: the order a page's image tiles fade in when it
 * loads. Steps 1–5 fade in one after another; every other image fades in last, all
 * together. Each tile can be moved to a step by dragging its handle onto it, or with its
 * dropdown; several tiles can share a step (they fade in together). Tiles still
 * numbered by position (no `num` yet) are listed separately until given a step. See
 * revealOrder.js for how this maps onto each tile's `num`.
 *
 * @param {Object} param
 * @param {Object} param.tiles
 * @param {Object} param.projects
 * @param {Function} param.onChangeTiles
 * @param {Function} param.onReplay - replays the fade-in on the page previews
 * @param {boolean} param.showSteps - whether the previews show each tile's step
 * @param {Function} param.onShowStepsChange
 */
const RevealOrderEditor = ({ tiles, projects, onChangeTiles, onReplay, showSteps, onShowStepsChange }) => {
  const moveTile = (tileKey, slot) => {
    const next = setRevealSlot(tiles, tileKey, slot);
    if (next !== tiles) onChangeTiles(next);
  };
  const { drag, startDrag } = useSlotDrag(moveTile);

  const revealedKeys = Object.keys(tiles).filter((key) => isRevealedTile(tiles[key]));
  const bySlot = (slot) => revealedKeys.filter((key) => revealSlotOf(tiles[key]) === slot);
  const unset = bySlot(BY_POSITION);
  const slots = [...REVEAL_STEPS, REST, ...(unset.length > 0 ? [BY_POSITION] : [])];

  return (
    <details className="adminRevealOrder">
      <summary>Reveal order</summary>
      <p className="adminProjectForm-hint">
        The order this page&apos;s images fade in when it loads. Steps 1–5 fade in one after another; everything else
        fades in last, all together. Tiles in the same step fade in together. Drag a tile by its handle onto a step, or
        pick one from its list.
      </p>
      <div className="adminRevealOrder-controls">
        <button type="button" onClick={onReplay}>Replay reveal</button>
        <label>
          <input type="checkbox" checked={showSteps} onChange={(e) => onShowStepsChange(e.target.checked)} />
          Show steps on the previews
        </label>
      </div>
      <div className="adminRevealOrder-slots">
        {slots.map((slot) => {
          const keys = slot === BY_POSITION ? unset : bySlot(slot);
          const over = drag && drag.over === slot && slot !== BY_POSITION;
          return (
            <section
              key={slot}
              className={`adminRevealOrder-slot${over ? ' adminRevealOrder-slot--over' : ''}`}
              data-reveal-slot={slot}
              aria-label={slotLabel(slot)}
            >
              <h4>{slotLabel(slot)}</h4>
              {slot === BY_POSITION && (
                <p className="adminProjectForm-hint">
                  These fade in according to where they first appear on the page, which changes as the layout does.
                </p>
              )}
              {keys.length === 0 && <p className="adminProjectForm-hint">No tiles.</p>}
              <ul>
                {keys.map((key) => (
                  <li key={key} className={drag && drag.tileKey === key ? 'adminRevealOrder-tile--dragging' : ''}>
                    <button
                      type="button"
                      className="adminDragHandle"
                      aria-label={`Drag ${key} to a step`}
                      onPointerDown={(event) => startDrag(event, key)}
                    >
                      ⠿
                    </button>
                    <AdminThumbnail imageUrl={tileThumbnailUrl(tiles[key], projects)} />
                    <span className="adminRevealOrder-tileName">
                      <strong>{key}</strong> <span className="adminProjectForm-hint">{tileSummary(tiles[key], projects)}</span>
                    </span>
                    <select
                      aria-label={`Reveal step for ${key}`}
                      value={String(revealSlotOf(tiles[key]))}
                      onChange={(e) => moveTile(key, parseSlot(e.target.value))}
                    >
                      {slot === BY_POSITION && <option value={BY_POSITION} disabled>By position</option>}
                      {REVEAL_STEPS.map((step) => <option key={step} value={String(step)}>Step {step}</option>)}
                      <option value={REST}>With the rest</option>
                    </select>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </details>
  );
};

RevealOrderEditor.propTypes = {
  tiles: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  onChangeTiles: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired,
  showSteps: PropTypes.bool.isRequired,
  onShowStepsChange: PropTypes.func.isRequired
};

export default RevealOrderEditor;
