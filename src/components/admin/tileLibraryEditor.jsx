import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeBlankTile, suggestTileKey } from './layoutHelpers';

const TileFields = ({ kind, values, onChange, projects }) => {
  if (kind === 'project') {
    return (
      <>
        <label>
          Project
          <select value={values.projectKey} onChange={(e) => onChange({ ...values, projectKey: e.target.value })}>
            <option value="">Select a project…</option>
            {Object.keys(projects).map((key) => (
              <option key={key} value={key}>{projects[key].projectName}</option>
            ))}
          </select>
        </label>
        <label>
          Background position <span className="adminProjectForm-hint">(optional, e.g. "100% 0%")</span>
          <input
            type="text"
            value={values.backgroundPosition || ''}
            onChange={(e) => onChange({ ...values, backgroundPosition: e.target.value })}
          />
        </label>
      </>
    );
  }

  if (kind === 'filler') {
    return (
      <>
        <label>
          Image URL
          <input
            type="text"
            value={values.imageUrl || ''}
            onChange={(e) => onChange({ ...values, imageUrl: e.target.value })}
          />
        </label>
        <label>
          Related project <span className="adminProjectForm-hint">(optional)</span>
          <select value={values.projectKey || ''} onChange={(e) => onChange({ ...values, projectKey: e.target.value })}>
            <option value="">None</option>
            {Object.keys(projects).map((key) => (
              <option key={key} value={key}>{projects[key].projectName}</option>
            ))}
          </select>
        </label>
      </>
    );
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={values.useIntroText}
          onChange={(e) => onChange({ ...values, useIntroText: e.target.checked })}
        />
        Use the shared portfolio introduction text
      </label>
      {!values.useIntroText && (
        <label>
          Text
          <textarea
            rows={2}
            value={values.text || ''}
            onChange={(e) => onChange({ ...values, text: e.target.value })}
          />
        </label>
      )}
    </>
  );
};

TileFields.propTypes = {
  kind: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

const tileSummary = (tile, projects) => {
  if (tile.kind === 'project') return `Project tile — ${projects[tile.projectKey]?.projectName || tile.projectKey}`;
  if (tile.kind === 'filler') return `Filler image${tile.projectKey ? ` — ${projects[tile.projectKey]?.projectName}` : ''}`;
  return tile.useIntroText ? 'Text — shared introduction' : `Text — "${(tile.text || '').slice(0, 40)}"`;
};

/**
 * @description Manages the reusable tile definitions for one page's layout — each tile
 * (a project image, a filler image, or a text blurb) can be placed one or more times
 * across the defaultLayout/wideLayout trees; editing it here updates every placement.
 *
 * @param {Object} param
 * @param {Object} param.tiles
 * @param {Function} param.onChange
 * @param {Object} param.projects
 */
const TileLibraryEditor = ({ tiles, onChange, projects }) => {
  const [editingKey, setEditingKey] = useState(null);
  const [addingKind, setAddingKind] = useState(null);
  const [draftValues, setDraftValues] = useState(null);

  const startAdd = (kind) => {
    setEditingKey(null);
    setAddingKind(kind);
    setDraftValues(makeBlankTile(kind));
  };

  const startEdit = (key) => {
    setAddingKind(null);
    setEditingKey(key);
    setDraftValues({ ...tiles[key] });
  };

  const cancel = () => {
    setEditingKey(null);
    setAddingKind(null);
    setDraftValues(null);
  };

  const saveEdit = () => {
    onChange({ ...tiles, [editingKey]: draftValues });
    cancel();
  };

  const saveAdd = () => {
    const key = suggestTileKey(addingKind, draftValues.projectKey, tiles);
    onChange({ ...tiles, [key]: draftValues });
    cancel();
  };

  const deleteTile = (key) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this tile? Any layout placements using it will need to be removed too.')) return;
    const next = { ...tiles };
    delete next[key];
    onChange(next);
    if (editingKey === key) cancel();
  };

  return (
    <div className="adminTileLibrary">
      <h3>Tiles</h3>
      <ul>
        {Object.keys(tiles).map((key) => (
          <li key={key} className="adminProjectsEditor-row">
            <span className="adminProjectsEditor-name">{key} — {tileSummary(tiles[key], projects)}</span>
            <span className="adminProjectsEditor-rowActions">
              <button type="button" onClick={() => startEdit(key)}>Edit</button>
              <button type="button" onClick={() => deleteTile(key)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

      {editingKey && (
        <div className="adminProjectForm">
          <h4>Editing tile: {editingKey}</h4>
          <TileFields kind={draftValues.kind} values={draftValues} onChange={setDraftValues} projects={projects} />
          <div className="adminProjectForm-actions">
            <button type="button" onClick={saveEdit}>Save</button>
            <button type="button" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      {addingKind && (
        <div className="adminProjectForm">
          <h4>New {addingKind} tile</h4>
          <TileFields kind={addingKind} values={draftValues} onChange={setDraftValues} projects={projects} />
          <div className="adminProjectForm-actions">
            <button type="button" onClick={saveAdd}>Add tile</button>
            <button type="button" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      {!editingKey && !addingKind && (
        <div className="adminTileLibrary-addButtons">
          <button type="button" onClick={() => startAdd('project')}>Add project tile</button>
          <button type="button" onClick={() => startAdd('filler')}>Add filler tile</button>
          <button type="button" onClick={() => startAdd('text')}>Add text tile</button>
        </div>
      )}
    </div>
  );
};

TileLibraryEditor.propTypes = {
  tiles: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

export default TileLibraryEditor;
