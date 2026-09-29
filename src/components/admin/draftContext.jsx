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

const SEED_JSON = JSON.stringify(seedDraft);
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
 */
export const loadInitialDraft = () => {
  const fresh = { draft: seedDraft, discarded: false, staleContent: false };
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
    return {
      draft: { ...seedDraft, ...draft },
      discarded: false,
      staleContent: __seedFingerprint !== undefined && __seedFingerprint !== SEED_FINGERPRINT
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
 * previous step (see mergesWithLast), and clears `future`. Only `present` is persisted.
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
      if (mergesWithLast(state.lastEdit, action)) {
        return { ...state, present: next, future: [], lastEdit };
      }
      return {
        past: [...state.past, state.present].slice(-HISTORY_LIMIT),
        present: next,
        future: [],
        lastEdit
      };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future],
        lastEdit: null
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1),
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
export const draftHasChanges = (draft) => {
  const keys = Object.keys(seedDraft);
  if (keys.every((key) => draft[key] === seedDraft[key])) return false;
  return JSON.stringify(draft) !== SEED_JSON;
};

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
    present: initial.draft,
    future: [],
    lastEdit: null
  }));
  const [saveFailed, setSaveFailed] = useState(false);
  const [notices, setNotices] = useState({ discarded: initial.discarded, staleContent: initial.staleContent });

  const state = history.present;

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...state, __seedVersion: SEED_VERSION, __seedFingerprint: SEED_FINGERPRINT })
      );
      setSaveFailed(false);
    } catch (error) {
      // sessionStorage unavailable (private browsing) or full: the draft won't survive a
      // refresh — which the admin needs to know, not discover afterwards.
      setSaveFailed(true);
    }
  }, [state]);

  // Stamps every edit with its batch and time, which historyReducer uses to decide what
  // counts as one undo step.
  const dispatch = useMemo(() => (action) => rawDispatch({ ...action, batch: currentBatch(), time: Date.now() }), []);

  const hasChanges = useMemo(() => draftHasChanges(state), [state]);

  const meta = useMemo(() => ({
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo: () => rawDispatch({ type: 'UNDO' }),
    redo: () => rawDispatch({ type: 'REDO' }),
    reset: () => dispatch({ type: 'RESET' }),
    hasChanges,
    saveFailed,
    discardedStoredDraft: notices.discarded,
    staleContent: notices.staleContent,
    dismissNotice: (name) => setNotices((current) => ({ ...current, [name]: false }))
  }), [history.past.length, history.future.length, dispatch, hasChanges, saveFailed, notices]);

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
