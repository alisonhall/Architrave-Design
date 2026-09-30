import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @description A compact "Actions ▾" menu button that reveals a list of actions on
 * click, replacing a row of separate buttons — used wherever a list row or tree node
 * has several actions that don't all need to be visible (and taking up horizontal
 * space) at once. Closes on an outside click or after choosing an action.
 *
 * @param {Object} param
 * @param {Array} param.actions - [{ label, onClick, disabled? }]
 * @param {string} [param.label] - the menu button's own label
 * @param {string} [param.align] - which edge of the button the open list lines up with:
 * 'right' (the default, extending leftward) or 'left' (extending rightward — for a menu
 * sitting near the left edge of the screen, where extending leftward would clip)
 */
const ActionsMenu = ({ actions, label, align }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <span className="adminActionsMenu" ref={containerRef}>
      <button type="button" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        {label}
      </button>
      {open && (
        <ul className={`adminActionsMenu-list${align === 'left' ? ' adminActionsMenu-list--alignLeft' : ''}`} role="menu">
          {actions.map((action) => (
            <li key={action.label} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={action.disabled}
                onClick={() => { setOpen(false); action.onClick(); }}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

ActionsMenu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  })).isRequired,
  label: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right'])
};

ActionsMenu.defaultProps = { label: 'Actions ▾', align: 'right' };

export default ActionsMenu;
