import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

const Header = ({ className = '' }) => (
  <header className={className}>
    <p>Architrave Design</p>
    <p>|</p>
    <p>Architect</p>
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
}

export default Header
