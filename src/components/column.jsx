/** @jsx jsx */
import React from 'react';
import { PropTypes } from 'prop-types';
import { css, jsx } from '@emotion/core';

import './column.scss';

/**
 * @description The column layout.
 * 
 * @param {Object} param
 * @param {Node} param.children
 * @param {string} param.width
 */
const Column = ({ children, width }) => (
  <div className="column" css={css`
    ${width ? `width: ${width}` : ''};
    @media screen and (max-width: 520px) {
      width: 100%;
    }
  `}>
    {children}
  </div>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string
};

export default Column;
