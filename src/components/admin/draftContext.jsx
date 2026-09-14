import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import { seedDraft } from './seedData';

const STORAGE_KEY = 'architrave-admin-draft';

const DraftStateContext = createContext(null);
const DraftDispatchContext = createContext(null);

const loadInitialDraft = () => {
  if (typeof window === 'undefined') return seedDraft;

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return seedDraft;
    return { ...seedDraft, ...JSON.parse(stored) };
  } catch (error) {
    return seedDraft;
  }
};

const draftReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTION':
      return { ...state, [action.section]: action.value };
    case 'RESET':
      return seedDraft;
    default:
      return state;
  }
};

/**
 * @description Provides the in-memory, session-only admin draft state (a working copy of
 * the site's content/layout data) to the admin UI, persisted to sessionStorage so it
 * survives a refresh but never a new tab, browser restart, or the actual repo files.
 *
 * @param {Object} param
 * @param {Node} param.children
 */
export const DraftProvider = ({ children }) => {
  const [state, dispatch] = useReducer(draftReducer, undefined, loadInitialDraft);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // sessionStorage may be unavailable (e.g. private browsing); the draft simply
      // won't persist across a refresh in that case.
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <DraftStateContext.Provider value={value.state}>
      <DraftDispatchContext.Provider value={value.dispatch}>
        {children}
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
