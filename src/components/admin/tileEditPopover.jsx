import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeBlankTile, suggestTileKey } from './layoutHelpers';
import { TileFields, TILE_KIND_LABELS, tileSummary, tileThumbnailUrl } from './tileLibraryEditor';
import AdminThumbnail from './adminThumbnail';

// Reserves roughly enough room for the popover's own content (it can still scroll
// internally past that, via max-height/overflow-y in _admin.scss) so it doesn't get
// anchored so close to the viewport's bottom/right edge that its own buttons end up
// unreachable off-screen.
const anchorStyle = (anchor) => {
  if (!anchor || typeof anchor.getBoundingClientRect !== 'function') return {};
  const rect = anchor.getBoundingClientRect();
  const maxTop = Math.max(8, window.innerHeight - 420);
  const maxLeft = Math.max(8, window.innerWidth - 320);
  return {
    position: 'fixed',
    top: Math.max(8, Math.min(rect.bottom + 6, maxTop)),
    left: Math.max(8, Math.min(rect.left, maxLeft))
  };
};

const AssignTile = ({ tiles, projects, kinds, onAssignExisting, onCreateAndAssign, onCancel }) => {
  const [creatingKind, setCreatingKind] = useState(null);
  const [draftValues, setDraftValues] = useState(null);
  const [draftKey, setDraftKey] = useState('');

  const startCreate = (kind) => {
    setCreatingKind(kind);
    setDraftValues(makeBlankTile(kind));
    setDraftKey('');
  };

  const saveCreate = () => {
    const key = draftKey.trim() || suggestTileKey(creatingKind, draftValues.projectKey, tiles);
    if (Object.prototype.hasOwnProperty.call(tiles, key)) {
      // eslint-disable-next-line no-alert
      window.alert(`"${key}" is already used by another tile.`);
      return;
    }
    onCreateAndAssign(key, draftValues);
  };

  if (creatingKind) {
    return (
      <div className="adminTileEditPopover-form">
        <h4>New {creatingKind} tile</h4>
        <label>
          Key <span className="adminProjectForm-hint">(optional — auto-generated if left blank)</span>
          <input type="text" value={draftKey} onChange={(e) => setDraftKey(e.target.value)} />
        </label>
        <TileFields kind={creatingKind} values={draftValues} onChange={setDraftValues} projects={projects} />
        <div className="adminProjectForm-actions">
          <button type="button" onClick={saveCreate}>Add &amp; assign</button>
          <button type="button" onClick={() => setCreatingKind(null)}>Back</button>
        </div>
      </div>
    );
  }

  const tileKeys = Object.keys(tiles);

  return (
    <div className="adminTileEditPopover-assign">
      <h4>Assign a tile</h4>
      {tileKeys.length > 0 && (
        <ul className="adminTileEditPopover-existing">
          {tileKeys.map((key) => (
            <li key={key}>
              <button type="button" onClick={() => onAssignExisting(key)}>
                <AdminThumbnail imageUrl={tileThumbnailUrl(tiles[key], projects)} />
                <span>{key} — {tileSummary(tiles[key], projects)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="adminProjectForm-hint">Or add a new tile:</p>
      <div className="adminTileLibrary-addButtons">
        {kinds.map((kind) => (
          <button key={kind} type="button" onClick={() => startCreate(kind)}>Add {TILE_KIND_LABELS[kind]}</button>
        ))}
      </div>
      <div className="adminProjectForm-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

AssignTile.propTypes = {
  tiles: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  kinds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAssignExisting: PropTypes.func.isRequired,
  onCreateAndAssign: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const EditTile = ({ tileKey, tiles, projects, onSave, onRenameTile, onDelete, onReassign, onCancel }) => {
  const [draftValues, setDraftValues] = useState({ ...tiles[tileKey] });
  const [draftKey, setDraftKey] = useState(tileKey);

  const save = () => {
    const nextKey = draftKey.trim();
    if (!nextKey) {
      // eslint-disable-next-line no-alert
      window.alert('A tile needs a key.');
      return;
    }
    if (nextKey !== tileKey && Object.prototype.hasOwnProperty.call(tiles, nextKey)) {
      // eslint-disable-next-line no-alert
      window.alert(`"${nextKey}" is already used by another tile.`);
      return;
    }

    if (nextKey === tileKey) {
      onSave({ ...tiles, [tileKey]: draftValues });
    } else {
      const nextTiles = { ...tiles, [nextKey]: draftValues };
      delete nextTiles[tileKey];
      if (onRenameTile) onRenameTile(tileKey, nextKey, nextTiles);
      else onSave(nextTiles);
    }
  };

  return (
    <div className="adminTileEditPopover-form">
      <h4>Editing tile: {tileKey}</h4>
      <label>
        Key <span className="adminProjectForm-hint">(renaming updates its placements)</span>
        <input type="text" value={draftKey} onChange={(e) => setDraftKey(e.target.value)} />
      </label>
      <TileFields kind={draftValues.kind} values={draftValues} onChange={setDraftValues} projects={projects} />
      <div className="adminProjectForm-actions">
        <button type="button" onClick={save}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
      <div className="adminProjectForm-actions">
        <button type="button" onClick={onReassign}>Use a different tile here</button>
        <button type="button" onClick={onDelete}>Delete this tile</button>
      </div>
    </div>
  );
};

EditTile.propTypes = {
  tileKey: PropTypes.string.isRequired,
  tiles: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onRenameTile: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onReassign: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

EditTile.defaultProps = { onRenameTile: null };

/**
 * @description The click-to-edit-in-preview popover: opened by clicking a tile (or an
 * empty slot) in the live preview via layoutClickOverlay.jsx. Editing a tile here edits
 * its shared definition in `tiles` — the same object every placement referencing that
 * key already points at — exactly like the Tile Library's own edit form (this reuses
 * its `TileFields`), just anchored to where the tile actually appears instead of a
 * separately-scrolled list.
 *
 * `selection.getNextRows(tileKey)` (from layoutClickOverlay.jsx) is a pure function, so
 * assigning an existing tile only needs `onAssignRows`, but creating a brand-new tile
 * and assigning it in the same step needs both `tiles` and `rows` updated together —
 * `onCreateTileAndAssign` lets the caller apply both in one atomic update.
 *
 * @param {Object} param
 * @param {Object} [param.selection] - { tileKey, isEmpty, anchor, getNextRows }, or null to render nothing
 * @param {Object} param.tiles
 * @param {Function} param.onChangeTiles - a tile's own fields changed, no placement affected
 * @param {Function} [param.onRenameTile]
 * @param {Function} param.onAssignRows - called with the new `rows` after picking an existing tile for this slot
 * @param {Function} param.onCreateTileAndAssign - called with (key, values, rows) after creating a tile and assigning it here
 * @param {Object} param.projects
 * @param {Array} param.kinds
 * @param {Function} param.onClose
 */
const TileEditPopover = ({
  selection,
  tiles,
  onChangeTiles,
  onRenameTile,
  onAssignRows,
  onCreateTileAndAssign,
  projects,
  kinds,
  onClose
}) => {
  const [reassigning, setReassigning] = useState(false);

  if (!selection) return null;

  const showAssignMode = selection.isEmpty || reassigning;

  return (
    <div
      className="adminTileEditPopover"
      style={anchorStyle(selection.anchor)}
      role="dialog"
      aria-label={showAssignMode ? 'Assign a tile' : 'Edit tile'}
    >
      {showAssignMode ? (
        <AssignTile
          tiles={tiles}
          projects={projects}
          kinds={kinds}
          onAssignExisting={(key) => { onAssignRows(selection.getNextRows(key)); setReassigning(false); onClose(); }}
          onCreateAndAssign={(key, values) => {
            onCreateTileAndAssign(key, values, selection.getNextRows(key));
            setReassigning(false);
            onClose();
          }}
          onCancel={() => { setReassigning(false); onClose(); }}
        />
      ) : (
        <EditTile
          tileKey={selection.tileKey}
          tiles={tiles}
          projects={projects}
          onSave={(nextTiles) => { onChangeTiles(nextTiles); onClose(); }}
          onRenameTile={onRenameTile ? (oldKey, newKey, nextTiles) => { onRenameTile(oldKey, newKey, nextTiles); onClose(); } : null}
          onDelete={() => {
            // eslint-disable-next-line no-alert
            if (!window.confirm('Delete this tile? Any layout placements using it will need to be removed too.')) return;
            const nextTiles = { ...tiles };
            delete nextTiles[selection.tileKey];
            onChangeTiles(nextTiles);
            onClose();
          }}
          onReassign={() => setReassigning(true)}
          onCancel={onClose}
        />
      )}
    </div>
  );
};

TileEditPopover.propTypes = {
  selection: PropTypes.shape({
    tileKey: PropTypes.string,
    isEmpty: PropTypes.bool,
    anchor: PropTypes.object,
    getNextRows: PropTypes.func
  }),
  tiles: PropTypes.object.isRequired,
  onChangeTiles: PropTypes.func.isRequired,
  onRenameTile: PropTypes.func,
  onAssignRows: PropTypes.func.isRequired,
  onCreateTileAndAssign: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  kinds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

TileEditPopover.defaultProps = {
  selection: null,
  onRenameTile: null
};

export default TileEditPopover;
