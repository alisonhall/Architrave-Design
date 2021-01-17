/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import Image from './image';

/**
 * @description A filler image for one of the navigation pages.
 * 
 * @param {Object} param
 * @param {Object} param.image
 * @param {Object} param.styles
 * @param {string} param.styles.width
 * @param {string} param.styles.height
 * @param {string} param.styles.float
 * @param {string} param.num
 */
const ImageFillerTile = ({
  image,
  styles: {
    width = '100px',
    height = '100px',
    float = 'left'
  } = {},
  num = '0'
}) => (
  <div className={`image image${num} clearfix imageFiller`} css={css`
    width: ${width};
    height: ${height};
    float: ${float};
  `}>
    <div className="shadowOverlay clearfix">
      <Image
        customClass="filler"
        {...image}
      />
    </div>    
    <p className="textOverlay"></p>
  </div>
)

export default ImageFillerTile
