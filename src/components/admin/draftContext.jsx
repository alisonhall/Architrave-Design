import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { seedDraft, SEED_VERSION } from './seedData';

const STORAGE_KEY = 'architrave-admin-draft';

// How many edits back undo can go.
export const HISTORY_LIMIT = 100;

// Consecutive changes to the same single section closer together than this (ms) are
// one undo step — so undo takes back a burst of typing, not one keystroke.
export const TYPING_MERGE_WINDOW = 1000;

const DraftStateContext = createContext(null);
const DraftDispatchContext = createContext(null);
const DraftMetaContext = createContext(null);

// A cheap fingerprint of some text (djb2) — enough to tell whether the site's committed
// content (and so seedDraft) has changed since a stored draft was started.
const fingerprint = (text) => {
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) hash = ((hash * 33) + text.charCodeAt(i)) % 4294967296;
  return hash.toString(36);
};

/**
 * @description The draft's actual content as text, for comparing — leaving out every
 * `id`: those are editor-only (React keys and node addresses, never written to any file;
 * see hydrateLayoutData/hydrateReviews), and freshly random on every page load. Compared
 * with them, a draft restored after a refresh would never match the site's own content,
 * even untouched.
 */
export const contentJSON = (value) => JSON.stringify(value, (key, entry) => (key === 'id' ? undefined : entry));

export const sameContent = (a, b) => a === b || contentJSON(a) === contentJSON(b);

const SEED_JSON = contentJSON(seedDraft);
const SEED_FINGERPRINT = fingerprint(SEED_JSON);

/**
 * @description Restores the draft stashed in sessionStorage, if there is one — and
 * reports anything the admin needs to know about how that went:
 *
 * - `discarded`: a stored draft existed but couldn't be restored — saved under an older
 *   seed shape (a stale top-level section, e.g. an old empty `layouts: {}`, would
 *   silently win over a newly-seeded one if shallow-merged), or unreadable.
 * - `staleContent`: it was restored, but the site's committed content has changed since
 *   it was started (a deploy happened in between). The draft still holds the old
 *   versions of everything, so applying Review Changes as-is would undo that update.
 * - `baseFingerprint`: the fingerprint of the content the draft was started from, to
 *   keep saving alongside it (see DraftProvider).
 */
export const loadInitialDraft = () => {
  const fresh = { draft: seedDraft, discarded: false, staleContent: false, baseFingerprint: SEED_FINGERPRINT };
  if (typeof window === 'undefined') return fresh;

  let stored;
  try {
    stored = window.sessionStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return fresh;
  }
  if (!stored) return fresh;

  try {
    const parsed = JSON.parse(stored);
    if (parsed.__seedVersion !== SEED_VERSION) return { ...fresh, discarded: true };

    const { __seedVersion, __seedFingerprint, ...draft } = parsed;
    const baseFingerprint = __seedFingerprint === undefined ? SEED_FINGERPRINT : __seedFingerprint;
    return {
      draft: { ...seedDraft, ...draft },
      discarded: false,
      staleContent: baseFingerprint !== SEED_FINGERPRINT,
      baseFingerprint
    };
  } catch (error) {
    return { ...fresh, discarded: true };
  }
};

// Edits dispatched in the same turn of the event loop — several sections changed by one
// click, e.g. hiding a project (its shown and hidden lists) — share a batch number, so
// they become a single undo step.
let batchNumber = 0;
let batchOpen = false;
const currentBatch = () => {
  if (!batchOpen) {
    batchNumber += 1;
    batchOpen = true;
    setTimeout(() => { batchOpen = false; }, 0);
  }
  return batchNumber;
};

const changedSections = (action) => (action.type === 'SET_SECTION' ? [action.section] : Object.keys(action.values));

const applyEdit = (present, action) => {
  if (action.type === 'SET_SECTION') return { ...present, [action.section]: action.value };
  if (action.type === 'SET_SECTIONS') return { ...present, ...action.values };
  return seedDraft; // RESET
};

// Whether this edit folds into the previous undo step rather than starting a new one.
const mergesWithLast = (lastEdit, action) => {
  if (!lastEdit || action.type === 'RESET') return false;
  if (action.batch !== undefined && action.batch === lastEdit.batch) return true;
  const sections = changedSections(action);
  return action.type === 'SET_SECTION'
    && lastEdit.sections.length === 1
    && lastEdit.sections[0] === sections[0]
    && action.time - lastEdit.time < TYPING_MERGE_WINDOW;
};

/**
 * @description The draft plus its undo/redo history. Every edit (SET_SECTION,
 * SET_SECTIONS, RESET) records the draft as it was in `past`, unless it merges into the
 * previous step (see mergesWithLast), and clears `future`.
 *
 * Alongside each draft in the history is its `base`: the fingerprint of the site
 * content that draft was started from (see loadInitialDraft's `staleContent`). It moves
 * through undo/redo with its draft — so undoing "Discard all changes" on a draft that
 * predates a deploy brings back not just that draft but the fact that it's out of date.
 * RESET bases the draft on the current content; so does any edit made while the draft
 * doesn't differ from the site at all (there's nothing left from the older content).
 * Only `present` and `base` are persisted.
 */
export const historyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTION':
    case 'SET_SECTIONS':
    case 'RESET': {
      const next = applyEdit(state.present, action);
      if (next === state.present) return state;
      const sections = action.type === 'RESET' ? [] : changedSections(action);
      const lastEdit = { batch: action.batch, time: action.time, sections };
      const base = action.type === 'RESET' || (state.base !== SEED_FINGERPRINT && !draftHasChanges(state.present))
        ? SEED_FINGERPRINT
        : state.base;
      if (mergesWithLast(state.lastEdit, action)) {
        return { ...state, present: next, base, future: [], futureBases: [], lastEdit };
      }
      return {
        past: [...state.past, state.present].slice(-HISTORY_LIMIT),
        pastBases: [...state.pastBases, state.base].slice(-HISTORY_LIMIT),
        present: next,
        base,
        future: [],
        futureBases: [],
        lastEdit
      };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      return {
        past: state.past.slice(0, -1),
        pastBases: state.pastBases.slice(0, -1),
        present: state.past[state.past.length - 1],
        base: state.pastBases[state.pastBases.length - 1],
        future: [state.present, ...state.future],
        futureBases: [state.base, ...state.futureBases],
        lastEdit: null
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      return {
        past: [...state.past, state.present],
        pastBases: [...state.pastBases, state.base],
        present: state.future[0],
        base: state.futureBases[0],
        future: state.future.slice(1),
        futureBases: state.futureBases.slice(1),
        lastEdit: null
      };
    }
    default:
      return state;
  }
};

// Whether the draft differs from the site's committed content at all. Sections still
// holding seedDraft's own objects are unchanged by definition; anything else (e.g. a
// draft restored from sessionStorage, which is all fresh objects) is compared in full.
export function draftHasChanges(draft) {
  const keys = Object.keys(seedDraft);
  if (keys.every((key) => draft[key] === seedDraft[key])) return false;
  return contentJSON(draft) !== SEED_JSON;
}

/**
 * @description Provides the in-memory, session-only admin draft state (a working copy of
 * the site's content/layout data) to the admin UI, persisted to sessionStorage so it
 * survives a refresh but never a new tab, browser restart, or the actual repo files —
 * along with its undo/redo history and its status (see useDraftMeta).
 *
 * @param {Object} param
 * @param {Node} param.children
 */
export const DraftProvider = ({ children }) => {
  const [initial] = useState(loadInitialDraft);
  const [history, rawDispatch] = useReducer(historyReducer, undefined, () => ({
    past: [],
    pastBases: [],
    present: initial.draft,
    base: initial.baseFingerprint,
    future: [],
    futureBases: [],
    lastEdit: null
  }));
  const [saveFailed, setSaveFailed] = useState(false);
  const [notices, setNotices] = useState({ discarded: initial.discarded, staleContent: true });

  const state = history.present;
  // The content the draft was started from (see historyReducer). Saved with the draft —
  // not the current content's fingerprint — so a draft that predates a deploy stays
  // recognizable as such on every later refresh, not just the first.
  const baseFingerprint = history.base;
  const hasChanges = useMemo(() => draftHasChanges(state), [state]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...state, __seedVersion: SEED_VERSION, __seedFingerprint: baseFingerprint })
      );
      setSaveFailed(false);
    } catch (error) {
      // sessionStorage unavailable (private browsing) or full: the draft won't survive a
      // refresh — which the admin needs to know, not discover afterwards.
      setSaveFailed(true);
    }
  }, [state, baseFingerprint]);

  // Stamps every edit with its batch and time, which historyReducer uses to decide what
  // counts as one undo step.
  const dispatch = useMemo(() => (action) => rawDispatch({ ...action, batch: currentBatch(), time: Date.now() }), []);

  const meta = useMemo(() => ({
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo: () => rawDispatch({ type: 'UNDO' }),
    redo: () => rawDispatch({ type: 'REDO' }),
    reset: () => dispatch({ type: 'RESET' }),
    hasChanges,
    saveFailed,
    discardedStoredDraft: notices.discarded,
    // An old draft with no changes of its own can't undo anything, so isn't flagged.
    staleContent: notices.staleContent && hasChanges && baseFingerprint !== SEED_FINGERPRINT,
    dismissNotice: (name) => setNotices((current) => ({ ...current, [name]: false }))
  }), [history.past.length, history.future.length, dispatch, hasChanges, saveFailed, notices, baseFingerprint]);

  return (
    <DraftStateContext.Provider value={state}>
      <DraftDispatchContext.Provider value={dispatch}>
        <DraftMetaContext.Provider value={meta}>
          {children}
        </DraftMetaContext.Provider>
      </DraftDispatchContext.Provider>
    </DraftStateContext.Provider>
  );
};

DraftProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useDraftState = () => {
  const context = useContext(DraftStateContext);
  if (context === null) throw new Error('useDraftState must be used within a DraftProvider');
  return context;
};

export const useDraftDispatch = () => {
  const context = useContext(DraftDispatchContext);
  if (context === null) throw new Error('useDraftDispatch must be used within a DraftProvider');
  return context;
};

/**
 * @description The draft's history and status: `canUndo`/`canRedo`/`undo`/`redo`;
 * `reset` (discard every change — itself undoable); `hasChanges`; `saveFailed` (the last
 * save to sessionStorage failed); `discardedStoredDraft`/`staleContent` (see
 * loadInitialDraft) with `dismissNotice(name)` to hide either.
 */
export const useDraftMeta = () => {
  const context = useContext(DraftMetaContext);
  if (context === null) throw new Error('useDraftMeta must be used within a DraftProvider');
  return context;
};

/**
 * @description Convenience hook for reading and replacing a single top-level section of
 * the draft (e.g. 'projects', 'reviews') without hand-rolling the action each time.
 *
 * @param {string} section
 */
export const useDraftSection = (section) => {
  const state = useDraftState();
  const dispatch = useDraftDispatch();
  const setSection = (value) => dispatch({ type: 'SET_SECTION', section, value });
  return [state[section], setSection];
};

/**
 * @description Sets several draft sections at once, as a single edit — for a change
 * that spans sections and should never be seen (or undone) half-applied.
 */
export const useDraftUpdate = () => {
  const dispatch = useDraftDispatch();
  return (values) => dispatch({ type: 'SET_SECTIONS', values });
};
