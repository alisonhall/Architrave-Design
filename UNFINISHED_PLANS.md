# Unfinished Plans

Tracks work that's been planned (and approved) for the in-repo admin/CMS tool but not yet implemented. The full, authoritative plan lives outside this repo at `~/.claude/plans/majestic-waddling-hejlsberg.md` — this file is just a pointer so "what's left" doesn't require digging through Claude's plan-mode history to find.

Phases 1–6 of that plan are all shipped. **Nothing is currently outstanding.**

## Phase 6 — resize for nested rows, and structural editing moved into the preview *(done)*

The side-panel tree editor (`layoutTreeEditor.jsx`) is gone; every layout edit now happens directly on the live preview. What shipped, by planned step:

1. **Nested-row resize fixed** — tree walking is shared in `layoutHelpers.js` (`flattenLayout`, `findRowById`/`findColumnById`, `updateRowById`/`updateColumnById`, `updateRowContainer`, `updateRowColumns`, `updateColumnChildren`), used by all three overlays. Every row and column gets a resize handle at any depth, except where a nested edge lands on its parent's own edge (the outer handle wins; the nested row stays sizable via "Edit size…").
2. **Shared DOM measurement** — `layoutDomMeasurement.js` (`measureLayout` / `useLayoutMeasurement`), tagging each box with `depth`, `topLevel`, sibling `index`/`siblingCount` and parent ids; it also re-measures via `ResizeObserver`.
3. **Row/column toolbars** — `layoutStructureOverlay.jsx`: a toolbar on every row (top-left) and column (top-right), nudged apart where they'd overlap. Menus cover move, duplicate, add column, edit size/width, and remove. Top-level rows and sibling columns also have a drag handle; this uses **pointer events** rather than the planned HTML5 `DragHandle`/`useDropTarget`, because HTML5 drag-and-drop has no touch support and in testing silently cancelled drops in the real preview.
4. **Add affordances** — "Add row" under each preview; "Add column" in the row menu; "Add tile" / "Add nested row" / "Add empty placeholder" in the column menu. A tile placement with no tile yet (or whose tile was deleted) now renders as a clickable "Empty slot" in the admin preview only (`renderLayoutTree`'s new `renderUnresolved` option), and empty rows/columns get a minimum size so they can be seen and edited.
5. **Image height** — the resize overlay's inline form now edits a row's Height and Image height together.
6. **Placement Move up / Move down / Remove from layout** — in `tileEditPopover.jsx`, backed by `resolvePlacementClick`'s new `getMovedRows`/`getRemovedRows`.
7. **Nested row controls** — each nested row has its own "Nested row ▾" toolbar (move up/down within its column, duplicate, add column, edit size, remove).
8. **Removed** `layoutTreeEditor.jsx`, its tests, and the two-column CSS layout.
