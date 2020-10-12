import React from 'react';
import { css, jsx } from '@emotion/core';

const Row = ({ children, height }) => (
  <div className="row" css={css`
    ${height ? `max-height: ${height}; min-height: ${height}` : ''};
  `}>
    {children}
  </div>
)

export default Row
