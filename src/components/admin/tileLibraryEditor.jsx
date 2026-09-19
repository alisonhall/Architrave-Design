import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeBlankTile, suggestTileKey } from './layoutHelpers';
import AdminThumbnail from './adminThumbnail';
import ActionsMenu from './actionsMenu';

// Exported so tileEditPopover.jsx (the click-to-edit-in-preview UI) can reuse the exact
// same kind-specific fields as this library's own add/edit forms — one set of tile
// field definitions, two entry points to them.
export const TileFields = ({ kind, values, onChange, projects }) => {
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

  if (kind === 'image') {
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
          Background position <span className="adminProjectForm-hint">(optional, e.g. "100% 0%")</span>
          <input
            type="text"
            value={values.backgroundPosition || ''}
            onChange={(e) => onChange({ ...values, backgroundPosition: e.target.value })}
          />
        </label>
        <label>
          Overlay text <span className="adminProjectForm-hint">(optional, e.g. "Before")</span>
          <input
            type="text"
            value={values.overlayText || ''}
            onChange={(e) => onChange({ ...values, overlayText: e.target.value })}
          />
        </label>
      </>
    );
  }

  if (kind === 'description') {
    return <p className="adminProjectForm-hint">Always shows this page&apos;s project name and description — nothing to configure.</p>;
  }

  if (kind === 'embed') {
    return (
      <label>
        Embed HTML <span className="adminProjectForm-hint">(paste an iframe embed's full markup, e.g. from Kuula)</span>
        <textarea
          rows={4}
          value={values.html || ''}
          onChange={(e) => onChange({ ...values, html: e.target.value })}
        />
      </label>
    );
  }

  if (kind === 'placeholder') {
    return <p className="adminProjectForm-hint">A plain blue filler section — no image, text, or link. Nothing to configure.</p>;
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

export const TILE_KIND_LABELS = {
  project: 'project tile',
  filler: 'filler tile',
  image: 'image tile',
  text: 'text tile',
  description: 'description tile',
  embed: 'embed tile',
  placeholder: 'placeholder tile'
};

export const tileSummary = (tile, projects) => {
  if (tile.kind === 'project') return `Project tile — ${projects[tile.projectKey]?.projectName || tile.projectKey}`;
  if (tile.kind === 'filler') return `Filler image${tile.projectKey ? ` — ${projects[tile.projectKey]?.projectName}` : ''}`;
  if (tile.kind === 'image') return 'Image tile';
  if (tile.kind === 'description') return "Description — this page's project";
  if (tile.kind === 'embed') return 'Embed — pasted iframe markup';
  if (tile.kind === 'placeholder') return 'Placeholder — plain blue filler';
  return tile.useIntroText ? 'Text — shared introduction' : `Text — "${(tile.text || '').slice(0, 40)}"`;
};

// A quick visual identifier for the tile list — only the kinds that actually carry an
// image URL have one; everything else (text/description/embed/placeholder) has none.
export const tileThumbnailUrl = (tile, projects) => {
  if (tile.kind === 'project') return projects[tile.projectKey]?.mainImageUrl;
  if (tile.kind === 'filler' || tile.kind === 'image') return tile.imageUrl;
  return null;
};

// Matches against the same text the list already shows (key + summary), so what you
// see is what you can search by — used both by this library's own list and by the
// click-to-edit popover's "assign a tile" list (tileEditPopover.jsx).
export const filterTileKeys = (tiles, projects, query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return Object.keys(tiles);
  return Object.keys(tiles).filter(
    (key) => `${key} ${tileSummary(tiles[key], projects)}`.toLowerCase().includes(normalized)
  );
};

/**
 * @description A search box for a list of tile keys, shared by the Tile Library's own
 * list and the click-to-edit popover's "assign a tile" list — one filtering UI, two
 * places that show a tile list.
 */
export const TileFilterInput = ({ value, onChange }) => (
  <label className="adminTileLibrary-filter">
    Filter tiles
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by key or summary…"
    />
  </label>
);

TileFilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * @description Manages the reusable tile definitions for one page's layout — each tile
 * can be placed one or more times across its layout tree(s); editing it here updates
 * every placement. Which kinds of tile can be added depends on the page: listing pages
 * offer project/filler/text tiles, detail pages offer plain image/description tiles.
 *
 * @param {Object} param
 * @param {Object} param.tiles
 * @param {Function} param.onChange
 * @param {Object} param.projects
 * @param {Array} param.kinds - which tile kinds this page supports adding
 * @param {Function} [param.onRenameTile] - called (oldKey, newKey, nextTiles) instead of
 * `onChange` when an existing tile's key is changed, so the caller can apply the tile
 * map update and its placements' key update together in one atomic step; if omitted,
 * the tile is renamed in the map alone via `onChange` and its placements are left
 * pointing at the old key
 */
const TileLibraryEditor = ({ tiles, onChange, projects, kinds, onRenameTile }) => {
  const [editingKey, setEditingKey] = useState(null);
  const [addingKind, setAddingKind] = useState(null);
  const [draftValues, setDraftValues] = useState(null);
  const [draftKey, setDraftKey] = useState('');
  const [filter, setFilter] = useState('');
  const visibleKeys = filterTileKeys(tiles, projects, filter);

  const startAdd = (kind) => {
    setEditingKey(null);
    setAddingKind(kind);
    setDraftValues(makeBlankTile(kind));
    setDraftKey('');
  };

  const startEdit = (key) => {
    setAddingKind(null);
    setEditingKey(key);
    setDraftValues({ ...tiles[key] });
    setDraftKey(key);
  };

  const cancel = () => {
    setEditingKey(null);
    setAddingKind(null);
    setDraftValues(null);
    setDraftKey('');
  };

  const keyCollides = (key, ignoringKey) => key !== ignoringKey && Object.prototype.hasOwnProperty.call(tiles, key);

  const saveEdit = () => {
    const nextKey = draftKey.trim();
    if (!nextKey) {
      // eslint-disable-next-line no-alert
      window.alert('A tile needs a key.');
      return;
    }
    if (keyCollides(nextKey, editingKey)) {
      // eslint-disable-next-line no-alert
      window.alert(`"${nextKey}" is already used by another tile.`);
      return;
    }

    if (nextKey === editingKey) {
      onChange({ ...tiles, [editingKey]: draftValues });
    } else {
      const nextTiles = { ...tiles, [nextKey]: draftValues };
      delete nextTiles[editingKey];
      // Renaming touches both the tile map and every placement referencing the old key
      // — onRenameTile applies both in one update rather than two separate onChange
      // calls, which (since each is computed from the same pre-update snapshot) would
      // otherwise have the second call silently clobber the first.
      if (onRenameTile) onRenameTile(editingKey, nextKey, nextTiles);
      else onChange(nextTiles);
    }
    cancel();
  };

  const saveAdd = () => {
    const key = draftKey.trim() || suggestTileKey(addingKind, draftValues.projectKey, tiles);
    if (keyCollides(key, null)) {
      // eslint-disable-next-line no-alert
      window.alert(`"${key}" is already used by another tile.`);
      return;
    }
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

  // Not assigned to any placement yet — many pages have several near-identical tiles
  // (e.g. a handful of plain images), so starting from a copy beats rebuilding one from
  // scratch. Uses the Tile Library's own list, not the layout tree, so this never
  // touches placements at all.
  const duplicateTile = (key) => {
    let newKey = `${key}Copy`;
    let suffix = 2;
    while (Object.prototype.hasOwnProperty.call(tiles, newKey)) {
      newKey = `${key}Copy${suffix}`;
      suffix += 1;
    }
    onChange({ ...tiles, [newKey]: { ...tiles[key] } });
  };

  return (
    <div className="adminTileLibrary">
      <h3>Tiles</h3>
      <TileFilterInput value={filter} onChange={setFilter} />
      <ul>
        {visibleKeys.map((key) => (
          <li key={key} className="adminProjectsEditor-row">
            <span className="adminProjectsEditor-nameGroup">
              <AdminThumbnail imageUrl={tileThumbnailUrl(tiles[key], projects)} />
              <span className="adminProjectsEditor-name">{key} — {tileSummary(tiles[key], projects)}</span>
            </span>
            <span className="adminProjectsEditor-rowActions">
              <ActionsMenu
                actions={[
                  { label: 'Edit', onClick: () => startEdit(key) },
                  { label: 'Duplicate', onClick: () => duplicateTile(key) },
                  { label: 'Delete', onClick: () => deleteTile(key) }
                ]}
              />
            </span>
          </li>
        ))}
      </ul>
      {filter && visibleKeys.length === 0 && (
        <p className="adminProjectForm-hint">No tiles match &quot;{filter}&quot;.</p>
      )}

      {editingKey && (
        <div className="adminProjectForm">
          <h4>Editing tile: {editingKey}</h4>
          <label>
            Key <span className="adminProjectForm-hint">(referenced by this tile's placements — renaming updates them)</span>
            <input type="text" value={draftKey} onChange={(e) => setDraftKey(e.target.value)} />
          </label>
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
          <label>
            Key <span className="adminProjectForm-hint">(optional — auto-generated from your selections if left blank)</span>
            <input type="text" value={draftKey} onChange={(e) => setDraftKey(e.target.value)} />
          </label>
          <TileFields kind={addingKind} values={draftValues} onChange={setDraftValues} projects={projects} />
          <div className="adminProjectForm-actions">
            <button type="button" onClick={saveAdd}>Add tile</button>
            <button type="button" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      {!editingKey && !addingKind && (
        <div className="adminTileLibrary-addButtons">
          {kinds.map((kind) => (
            <button key={kind} type="button" onClick={() => startAdd(kind)}>Add {TILE_KIND_LABELS[kind]}</button>
          ))}
        </div>
      )}
    </div>
  );
};

TileLibraryEditor.propTypes = {
  tiles: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  kinds: PropTypes.arrayOf(PropTypes.string),
  onRenameTile: PropTypes.func
};

TileLibraryEditor.defaultProps = {
  kinds: ['project', 'filler', 'text'],
  onRenameTile: null
};

export default TileLibraryEditor;
