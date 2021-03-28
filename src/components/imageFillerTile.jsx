/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import Image from './image';

/**
 * @description A filler image for one of the navigation pages.
 * 
 * @param {Object} param
 * @param {Object} param.customClass
 * @param {Object} param.image
 * @param {string} param.num
 */
const ImageFillerTile = ({
  customClass,
  image,
  num = '0'
}) => (
  <div className={`${customClass} image image${num} clearfix imageFiller`}>
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
