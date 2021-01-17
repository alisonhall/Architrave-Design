import React from 'react';
import { css, jsx } from '@emotion/core';

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
  `}>
    {children}
  </div>
)

export default Row
