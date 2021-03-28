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
 */
const ImageTile = ({
  image = {},
  text: {
    copy = null
  } = {},
  num = '0',
  customClass = '',
}) => (
  <div
    className={`image-tile image image${num} clearfix ${customClass}`}
  >
    <div className="shadowOverlay clearfix">
      <Image num={num} {...image} />
    </div>
    {copy && <p className="textOverlay">{copy}</p>}
  </div>
)

export default ImageTile
