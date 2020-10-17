import React from 'react';
import { css, jsx } from '@emotion/core';

const Column = ({ children, width }) => (
  <div className="column" css={css`
    ${width ? `width: ${width}` : ''};
  `}>
    {children}
  </div>
)

export default Column
