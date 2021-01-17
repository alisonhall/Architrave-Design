/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import Image from './image';

/**
 * @description A single image tile.
 * 
 * @param {Object} param
 * @param {Object} param.image
 * @param {Object} param.text
 * @param {string} param.text.copy
 * @param {string} param.num
 * @param {string} param.customClass
 * @param {Object} param.styles
 * @param {Object} param.styles.width
 * @param {Object} param.styles.height
 * @param {Object} param.styles.float
 * @param {Object} param.styles.marginTop
 */
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
