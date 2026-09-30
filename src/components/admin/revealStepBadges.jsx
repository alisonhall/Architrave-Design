import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { flattenLayout } from './layoutHelpers';
import { useLayoutMeasurement } from './layoutDomMeasurement';
import { revealStepsFor } from './revealOrder';

/**
 * @description Where each badge goes: the bottom-left corner of every placed tile that
 * fades in at steps 1–5, found the same way click-to-edit finds a placement — a column's
 * DOM children are its `children` placements, in order (layoutClickOverlay.jsx).
 */
const placeBadges = (containerEl, rows, steps) => {
  if (!containerEl) return [];
  const origin = containerEl.getBoundingClientRect();
  const badges = [];
  flattenLayout(rows).columns.forEach(({ column }) => {
    const columnEl = column.id ? containerEl.querySelector(`[data-column-id="${column.id}"]`) : null;
    if (!columnEl) return;
    column.children.forEach((placement, index) => {
      if (placement.nodeType !== 'tileRef' || !steps[placement.tileKey]) return;
      const el = columnEl.children[index];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      badges.push({
        key: `${column.id}-${index}`,
        step: steps[placement.tileKey],
        top: rect.bottom - origin.top,
        left: rect.left - origin.left
      });
    });
  });
  return badges;
};

/**
 * @description Numbers each tile in the preview with the step it fades in at when the
 * page loads (1–5), exactly as the live page will work it out — tiles that fade in with
 * the rest get no badge.
 *
 * @param {Object} param
 * @param {Element} param.containerEl
 * @param {Array} param.rows
 * @param {Object} param.tiles
 */
const RevealStepBadges = ({ containerEl = null, rows, tiles }) => {
  // Re-measured whenever the layout itself is (resizes, image loads, edits).
  const measurement = useLayoutMeasurement(containerEl, rows);
  const [badges, setBadges] = useState([]);

  useLayoutEffect(() => {
    setBadges(placeBadges(containerEl, rows, revealStepsFor(rows, tiles)));
  }, [containerEl, rows, tiles, measurement]);

  return (
    <div className="adminRevealStepBadges" aria-hidden="true">
      {badges.map(({ key, step, top, left }) => (
        <span key={key} className="adminRevealStepBadge" style={{ top, left }} data-reveal-step={step}>{step}</span>
      ))}
    </div>
  );
};

RevealStepBadges.propTypes = {
  containerEl: PropTypes.instanceOf(typeof Element !== 'undefined' ? Element : Object),
  rows: PropTypes.array.isRequired,
  tiles: PropTypes.object.isRequired
};

export default RevealStepBadges;
