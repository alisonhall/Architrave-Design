import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  replaceAt,
  removeAt,
  insertAt,
  moveAt,
  moveToIndex,
  makeBlankRow,
  makeBlankColumn,
  makeRowPlacement,
  makeTilePlacement,
  makeEmptyPlacement,
  cloneRowWithNewIds,
  cloneColumnWithNewIds
} from './layoutHelpers';
import ActionsMenu from './actionsMenu';

const numberOrUndefined = (value) => (value === '' ? undefined : Number(value));

// Consolidated into one menu (rather than 3-4 separate buttons) since this repeats at
// every row/column/placement in the tree — with several buttons each, deeply nested
// trees ran out of room to also show their own fields (see Phase 5 of the admin plan).
// `onDuplicate` is only ever supplied for rows/columns (not individual tile/empty
// placements) — many layouts are near-identical rows with one image swapped in, so
// cloning an existing one beats rebuilding from scratch each time.
const ReorderControls = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown, onDuplicate, duplicateLabel, onRemove, removeLabel }) => (
  <ActionsMenu
    actions={[
      { label: 'Move up', onClick: onMoveUp, disabled: !canMoveUp },
      { label: 'Move down', onClick: onMoveDown, disabled: !canMoveDown },
      ...(onDuplicate ? [{ label: duplicateLabel, onClick: onDuplicate }] : []),
      { label: removeLabel, onClick: onRemove }
    ]}
  />
);

ReorderControls.propTypes = {
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  onDuplicate: PropTypes.func,
  duplicateLabel: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  removeLabel: PropTypes.string
};

ReorderControls.defaultProps = { onDuplicate: null, duplicateLabel: 'Duplicate', removeLabel: 'Remove' };

// A row/column you're not actively editing can just be folded up — with 3 unrelated
// fields plus a menu at every level, a page with many rows/columns quickly ran out of
// vertical room to reach the one actually being worked on (Phase 5 of the admin plan).
const CollapseToggle = ({ collapsed, onToggle }) => (
  <button type="button" className="adminLayoutTree-collapseToggle" onClick={onToggle} aria-expanded={!collapsed}>
    {collapsed ? '▸' : '▾'}
  </button>
);

CollapseToggle.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

const pluralize = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;

// Native HTML5 drag-and-drop, replacing (well, joining — see below) the Move up/Move
// down menu items for reordering rows and columns: dragging carries the source index as
// plain text via the DOM's own dataTransfer, and the drop target reads it back to know
// what moved where. Move up/down stay in the menu too rather than being removed, since
// drag has no keyboard-accessible equivalent on its own.
const DragHandle = (props) => (
  <button type="button" className="adminLayoutTree-dragHandle" draggable aria-label="Drag to reorder" {...props}>⠿</button>
);

const useDropTarget = (onReorder, index) => {
  const [dragOver, setDragOver] = useState(false);
  if (!onReorder) return { dragOver: false };

  return {
    onDragOver: (event) => { event.preventDefault(); setDragOver(true); },
    onDragLeave: () => setDragOver(false),
    onDrop: (event) => {
      event.preventDefault();
      setDragOver(false);
      // An empty string (no drag data at all — a drop from outside this tree, e.g.)
      // coerces to 0 via Number(''), not NaN, so it must be rejected explicitly rather
      // than relying on Number.isNaN alone, or a stray drop would silently reorder as
      // if row/column 0 had been dragged.
      const raw = event.dataTransfer.getData('text/plain');
      if (raw === '') return;
      const fromIndex = Number(raw);
      if (!Number.isNaN(fromIndex)) onReorder(fromIndex, index);
    },
    dragOver
  };
};

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

const ColumnEditor = ({ column, index, onReorder, onDuplicate, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown, tileKeys }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { dragOver, ...dropTargetProps } = useDropTarget(onReorder, index);
  const updateChild = (childIndex, child) => onChange({ ...column, children: replaceAt(column.children, childIndex, child) });
  const removeChild = (childIndex) => onChange({ ...column, children: removeAt(column.children, childIndex) });
  const moveChild = (childIndex, delta) => onChange({ ...column, children: moveAt(column.children, childIndex, delta) });
  const addTile = () => onChange({ ...column, children: [...column.children, makeTilePlacement('')] });
  const addNestedRow = () => onChange({ ...column, children: [...column.children, makeRowPlacement()] });
  const addEmpty = () => onChange({ ...column, children: [...column.children, makeEmptyPlacement()] });

  return (
    <div className={`adminLayoutTree-column${dragOver ? ' adminLayoutTree-column--dragOver' : ''}`} {...dropTargetProps}>
      <div className="adminLayoutTree-columnHeader">
        <DragHandle onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(index)); }} />
        <CollapseToggle collapsed={collapsed} onToggle={() => setCollapsed((current) => !current)} />
        {collapsed ? (
          <span className="adminProjectForm-hint">Column — {pluralize(column.children.length, 'item')}</span>
        ) : (
          <label>
            Width <span className="adminProjectForm-hint">(e.g. "48%", blank for auto)</span>
            <input type="text" value={column.width || ''} onChange={(e) => onChange({ ...column, width: e.target.value || undefined })} />
          </label>
        )}
        <ReorderControls
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onDuplicate={onDuplicate}
          duplicateLabel="Duplicate column"
          onRemove={onRemove}
          removeLabel="Remove column"
        />
      </div>
      {!collapsed && (
        <>
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
        </>
      )}
    </div>
  );
};

ColumnEditor.propTypes = {
  column: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onReorder: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  tileKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

const RowEditor = ({ row, index, onReorder, onDuplicate, onChange, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown, tileKeys }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { dragOver, ...dropTargetProps } = useDropTarget(onReorder, index);
  const updateColumn = (columnIndex, column) => onChange({ ...row, columns: replaceAt(row.columns, columnIndex, column) });
  const removeColumn = (columnIndex) => onChange({ ...row, columns: removeAt(row.columns, columnIndex) });
  const moveColumn = (columnIndex, delta) => onChange({ ...row, columns: moveAt(row.columns, columnIndex, delta) });
  const reorderColumn = (fromIndex, toIndex) => onChange({ ...row, columns: moveToIndex(row.columns, fromIndex, toIndex) });
  const duplicateColumn = (columnIndex) => onChange({
    ...row,
    columns: insertAt(row.columns, columnIndex + 1, cloneColumnWithNewIds(row.columns[columnIndex]))
  });
  const addColumn = () => onChange({ ...row, columns: [...row.columns, makeBlankColumn()] });

  return (
    <div className={`adminLayoutTree-row${dragOver ? ' adminLayoutTree-row--dragOver' : ''}`} {...dropTargetProps}>
      <div className="adminLayoutTree-rowHeader">
        {onReorder && (
          <DragHandle onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(index)); }} />
        )}
        <CollapseToggle collapsed={collapsed} onToggle={() => setCollapsed((current) => !current)} />
        {collapsed ? (
          <span className="adminProjectForm-hint">Row — {pluralize(row.columns.length, 'column')}</span>
        ) : (
          <>
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
          </>
        )}
        <ReorderControls
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onDuplicate={onDuplicate}
          duplicateLabel="Duplicate row"
          onRemove={onRemove}
          removeLabel="Remove row"
        />
      </div>
      {!collapsed && (
        <>
          <div className="adminLayoutTree-columns">
            {row.columns.map((column, columnIndex) => (
              <ColumnEditor
                key={column.id}
                column={column}
                index={columnIndex}
                onReorder={reorderColumn}
                onDuplicate={() => duplicateColumn(columnIndex)}
                onChange={(next) => updateColumn(columnIndex, next)}
                onRemove={() => removeColumn(columnIndex)}
                onMoveUp={() => moveColumn(columnIndex, -1)}
                onMoveDown={() => moveColumn(columnIndex, 1)}
                canMoveUp={columnIndex > 0}
                canMoveDown={columnIndex < row.columns.length - 1}
                tileKeys={tileKeys}
              />
            ))}
          </div>
          <button type="button" onClick={addColumn}>Add column</button>
        </>
      )}
    </div>
  );
};

RowEditor.propTypes = {
  row: PropTypes.object.isRequired,
  // Only top-level rows (rendered directly by LayoutTreeEditor) are drag-reorderable or
  // duplicable — a nested row (a `nodeType: 'row'` placement, rendered by
  // PlacementEditor) has no sibling rows of its own to reorder or duplicate itself
  // into, so it omits all three.
  index: PropTypes.number,
  onReorder: PropTypes.func,
  onDuplicate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
  tileKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

RowEditor.defaultProps = {
  index: undefined,
  onReorder: undefined,
  onDuplicate: undefined
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
  const reorderRow = (fromIndex, toIndex) => onChange(moveToIndex(rows, fromIndex, toIndex));
  const duplicateRow = (index) => onChange(insertAt(rows, index + 1, cloneRowWithNewIds(rows[index])));
  const addRow = () => onChange([...rows, makeBlankRow()]);

  return (
    <div className="adminLayoutTree">
      {rows.map((row, index) => (
        <RowEditor
          key={row.id}
          row={row}
          index={index}
          onReorder={reorderRow}
          onDuplicate={() => duplicateRow(index)}
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
