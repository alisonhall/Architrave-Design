# Unfinished Plans

Tracks work that's been planned (and approved) for the in-repo admin/CMS tool but not yet implemented. The full, authoritative plan lives outside this repo at `~/.claude/plans/majestic-waddling-hejlsberg.md` — this file is just a pointer so "what's left" doesn't require digging through Claude's plan-mode history to find.

Phases 1–5 of that plan (Foundation, Projects editor, data-driven Layout editor, About & Reviews editors, Layouts UI rework) are all shipped and marked `*(done)*` there.

## Phase 6 — resize for nested rows, and structural editing moved into the preview

**Status: approved, not started.** Two requests prompted this:

1. Drag-to-resize handles don't appear for nested rows/columns (a row placed as a placement inside a column) — a real, narrow bug in `layoutResizeOverlay.jsx`'s `measureRects`, which only walks the top-level `rows` array and never recurses into a column's `children` to find nested `{ nodeType: 'row', row }` placements.
2. Remove `layoutTreeEditor.jsx`'s side-panel UI (the fields/buttons next to the preview) and reach full functional parity via small contextual buttons/handles directly in the live preview instead — the user chose this over a hover toolbar or a side-panel-lite compromise.

Planned steps (see the plan file for full detail on each):

1. Fix the nested-row resize bug — recursive `measureRects`, plus new `findRowById`/`updateRowById`/`flattenRows` helpers in `layoutHelpers.js` (and moving `findColumnById`/`updateColumnById` there from `layoutClickOverlay.jsx` so all three overlay modules share one tree-walking implementation).
2. Extract shared DOM measurement into `layoutDomMeasurement.js`, tagging each measured row/column with the structural metadata (`topLevel`, `parentColumnId`, `placementIndex`, etc.) the next steps need.
3. Row/column structural toolbars in the preview (drag-reorder, duplicate, remove, move up/down) — new `layoutStructureOverlay.jsx`, reusing the existing `ActionsMenu`/`DragHandle`/`useDropTarget` components.
4. "Add row" / "Add column" / "Add tile, nested row, or empty placeholder" affordances in the preview.
5. Fold a row's "Image height" field into the resize overlay's click-to-edit popup (currently only in the side panel).
6. Placement-level Remove/Move up/Move down for tiles and empty slots, added to `tileEditPopover.jsx`.
7. A nested row's own Remove/Move up/Move down (it has no natural click target of its own, so this needs a small dedicated control).
8. Delete `layoutTreeEditor.jsx`, its test file, and the two-column CSS layout once steps 1–7 give full parity; mark this phase `*(done)*` in the plan file.

Each step ships with its own unit + e2e tests and a real production-build check before moving to the next, matching how every prior phase in this plan was verified.
