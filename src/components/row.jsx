import React from 'react';
import { css, jsx } from '@emotion/core';
import './row.scss';

/**
 * @description The row layout
 * 
 * @param {Object} param
 * @param {Node} param.children
 * @param {string} param.height
 */
const Row = ({ children, height }) => (
  <div className="row" css={css`
    ${height ? `max-height: ${height}; min-height: ${height}` : ''};
    @media screen and (max-width: 520px) {
      max-height: none;
      min-height: 1px;
    }
  `}>
    {children}
  </div>
)

export default Row
