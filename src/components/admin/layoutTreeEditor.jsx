import React from 'react';
import PropTypes from 'prop-types';

import {
  replaceAt,
  removeAt,
  moveAt,
  makeBlankRow,
  makeBlankColumn,
  makeRowPlacement,
  makeTilePlacement,
  makeEmptyPlacement
} from './layoutHelpers';

const numberOrUndefined = (value) => (value === '' ? undefined : Number(value));

const ReorderControls = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown, onRemove, removeLabel }) => (
  <span className="adminLayoutTree-controls">
    <button type="button" disabled={!canMoveUp} onClick={onMoveUp}>Up</button>
    <button type="button" disabled={!canMoveDown} onClick={onMoveDown}>Down</button>
    <button type="button" onClick={onRemove}>{removeLabel}</button>
  </span>
);

ReorderControls.propTypes = {
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  removeLabel: PropTypes.string
};

ReorderControls.defaultProps = { removeLabel: 'Remove' };

const PlacementEditor = ({ placement, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown, tileKeys }) => {
  if (placement.nodeType === 'row') {
    return (
      <div className="adminLayoutTree-nestedRow">
        <RowEditor
          row={placement.row}
          onChange={(row) => onChange({ ...placement, row })}
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          tileKeys={tileKeys}
        />
      </div>
    );
  }

  if (placement.nodeType === 'empty') {
    return (
      <div className="adminLayoutTree-placement">
        <span className="adminProjectForm-hint">Empty placeholder</span>
        <ReorderControls
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onRemove={onRemove}
        />
      </div>
    );
  }

  return (
    <div className="adminLayoutTree-placement">
      <select value={placement.tileKey} onChange={(e) => onChange({ ...placement, tileKey: e.target.value })}>
        <option value="">Select a tile…</option>
        {tileKeys.map((key) => <option key={key} value={key}>{key}</option>)}
      </select>
      <ReorderControls
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
        onRemove={onRemove}
      />
    </div>
  );
};

PlacementEditor.propTypes = {
  placement: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  tileKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

const ColumnEditor = ({ column, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown, tileKeys }) => {
  const updateChild = (index, child) => onChange({ ...column, children: replaceAt(column.children, index, child) });
  const removeChild = (index) => onChange({ ...column, children: removeAt(column.children, index) });
  const moveChild = (index, delta) => onChange({ ...column, children: moveAt(column.children, index, delta) });
  const addTile = () => onChange({ ...column, children: [...column.children, makeTilePlacement('')] });
  const addNestedRow = () => onChange({ ...column, children: [...column.children, makeRowPlacement()] });
  const addEmpty = () => onChange({ ...column, children: [...column.children, makeEmptyPlacement()] });

  return (
    <div className="adminLayoutTree-column">
      <div className="adminLayoutTree-columnHeader">
        <label>
          Width <span className="adminProjectForm-hint">(e.g. "48%", blank for auto)</span>
          <input type="text" value={column.width || ''} onChange={(e) => onChange({ ...column, width: e.target.value || undefined })} />
        </label>
        <ReorderControls
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onRemove={onRemove}
          removeLabel="Remove column"
        />
      </div>
      {column.children.map((child, index) => (
        <PlacementEditor
          key={child.id}
          placement={child}
          onChange={(next) => updateChild(index, next)}
          onRemove={() => removeChild(index)}
          onMoveUp={() => moveChild(index, -1)}
          onMoveDown={() => moveChild(index, 1)}
          canMoveUp={index > 0}
          canMoveDown={index < column.children.length - 1}
          tileKeys={tileKeys}
        />
      ))}
      <div className="adminLayoutTree-addButtons">
        <button type="button" onClick={addTile}>Add tile</button>
        <button type="button" onClick={addNestedRow}>Add nested row</button>
        <button type="button" onClick={addEmpty}>Add empty placeholder</button>
      </div>
    </div>
  );
};

ColumnEditor.propTypes = {
  column: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  tileKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

const RowEditor = ({ row, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown, tileKeys }) => {
  const updateColumn = (index, column) => onChange({ ...row, columns: replaceAt(row.columns, index, column) });
  const removeColumn = (index) => onChange({ ...row, columns: removeAt(row.columns, index) });
  const moveColumn = (index, delta) => onChange({ ...row, columns: moveAt(row.columns, index, delta) });
  const addColumn = () => onChange({ ...row, columns: [...row.columns, makeBlankColumn()] });

  return (
    <div className="adminLayoutTree-row">
      <div className="adminLayoutTree-rowHeader">
        <label>
          Height (px)
          <input
            type="number"
            value={row.height ?? ''}
            onChange={(e) => onChange({ ...row, height: numberOrUndefined(e.target.value) })}
          />
        </label>
        <label>
          Image height (px)
          <input
            type="number"
            value={row.imageHeight ?? ''}
            onChange={(e) => onChange({ ...row, imageHeight: numberOrUndefined(e.target.value) })}
          />
        </label>
        <ReorderControls
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onRemove={onRemove}
          removeLabel="Remove row"
        />
      </div>
      <div className="adminLayoutTree-columns">
        {row.columns.map((column, index) => (
          <ColumnEditor
            key={column.id}
            column={column}
            onChange={(next) => updateColumn(index, next)}
            onRemove={() => removeColumn(index)}
            onMoveUp={() => moveColumn(index, -1)}
            onMoveDown={() => moveColumn(index, 1)}
            canMoveUp={index > 0}
            canMoveDown={index < row.columns.length - 1}
            tileKeys={tileKeys}
          />
        ))}
      </div>
      <button type="button" onClick={addColumn}>Add column</button>
    </div>
  );
};

RowEditor.propTypes = {
  row: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  tileKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

/**
 * @description Recursive editor for one layout variant's row/column/tile tree. Every
 * level follows the same "own its own array, delegate to children for theirs" pattern:
 * a parent never reaches into a grandchild's state directly, it just replaces its
 * immediate child when that child reports a change.
 *
 * @param {Object} param
 * @param {Array} param.rows
 * @param {Function} param.onChange
 * @param {Object} param.tiles
 */
const LayoutTreeEditor = ({ rows, onChange, tiles }) => {
  const tileKeys = Object.keys(tiles);
  const updateRow = (index, row) => onChange(replaceAt(rows, index, row));
  const removeRow = (index) => onChange(removeAt(rows, index));
  const moveRow = (index, delta) => onChange(moveAt(rows, index, delta));
  const addRow = () => onChange([...rows, makeBlankRow()]);

  return (
    <div className="adminLayoutTree">
      {rows.map((row, index) => (
        <RowEditor
          key={row.id}
          row={row}
          onChange={(next) => updateRow(index, next)}
          onRemove={() => removeRow(index)}
          onMoveUp={() => moveRow(index, -1)}
          onMoveDown={() => moveRow(index, 1)}
          canMoveUp={index > 0}
          canMoveDown={index < rows.length - 1}
          tileKeys={tileKeys}
        />
      ))}
      <button type="button" onClick={addRow}>Add row</button>
    </div>
  );
};

LayoutTreeEditor.propTypes = {
  rows: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  tiles: PropTypes.object.isRequired
};

export default LayoutTreeEditor;
