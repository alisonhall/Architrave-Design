import React from 'react';
import { PropTypes } from 'prop-types';

import Image from './image';

/**
 * @description A filler image for one of the navigation pages.
 * 
 * @param {Object} param
 * @param {Object} param.customClass
 * @param {Object} param.image
 */
const ImageFillerTile = ({
  customClass,
  image
}) => (
  <div className={`${customClass} clearfix imageFiller`}>
    <Image
      customClass="filler"
      {...image}
    />
    <p className="textOverlay"></p>
  </div>
);

ImageFillerTile.propTypes = {
  customClass: PropTypes.string,
  image: PropTypes.shape({}).isRequired
}

export default ImageFillerTile;
