import React from 'react';
import { PropTypes } from 'prop-types';

import Image from './image';
import './imageTile.scss';

/**
 * @description A single image tile.
 * 
 * @param {Object} param
 * @param {Object} param.image
 * @param {Object} param.text
 * @param {string} param.text.copy
 * @param {string} param.num
 * @param {string} param.customClass
 * @param {Object} param.dimensions
 */
const ImageTile = ({
  image = {},
  text: {
    copy = null
  } = {},
  num = '0',
  customClass = '',
  dimensions
}) => (
  <div
    className={`image-tile clearfix ${customClass}`}
  >
    <Image num={num} {...image} dimensions={dimensions} />
    {copy && <p className="textOverlay">{copy}</p>}
  </div>
);

ImageTile.propTypes = {
  image: PropTypes.object.isRequired,
  text: PropTypes.shape({
    copy: PropTypes.string
  }),
  num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  customClass: PropTypes.string,
  dimensions: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.number
  })
};

export default ImageTile;
