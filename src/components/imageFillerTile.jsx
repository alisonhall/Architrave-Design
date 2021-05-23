import React from 'react';
import { PropTypes } from 'prop-types';

import Image from './image';

/**
 * @description A filler image for one of the navigation pages.
 * 
 * @param {Object} param
 * @param {Object} param.customClass
 * @param {Object} param.image
 * @param {Object} param.dimensions
 */
const ImageFillerTile = ({
  customClass,
  image,
  dimensions
}) => (
  <div className={`${customClass} clearfix imageFiller`}>
    <Image
      customClass="filler"
      {...image}
      dimensions={dimensions}
    />
    <p className="textOverlay"></p>
  </div>
);

ImageFillerTile.propTypes = {
  customClass: PropTypes.string,
  image: PropTypes.shape({}).isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.number
  })
}

export default ImageFillerTile;
