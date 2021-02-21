import React from 'react';
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
  `}>
    {children}
  </div>
)

export default Column
