/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import Image from './image';

const ImageTile = ({
  image = {},
  text: {
    copy = null
  } = {},
  num = '0',
  customClass = '',
  styles: {
    width = null,
    height = null,
    float = null,
    marginTop = null
  } = {}
}) => (
  <div
    className={`image-tile image image${num} clearfix ${customClass}`}
    css={css`
      width: ${width};
      height: ${height};
      float: ${float};
      ${marginTop ? `margin-top: ${marginTop}` : ''};
    `}
  >
    <div className="shadowOverlay clearfix">
      <Image num={num} {...image} />
    </div>
    {copy && <p className="textOverlay">{copy}</p>}
  </div>
)

export default ImageTile
