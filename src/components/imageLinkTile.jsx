import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'gatsby';
import './imageLinkTile.scss'

import Image from './image';

/**
 * @description An image tile that links to a project and has the title of the project on it.
 * 
 * @param {Object} param
 * @param {Object} param.image
 * @param {Object} param.link
 * @param {string} param.link.linkUrl
 * @param {Object} param.text
 * @param {string} param.text.copy
 * @param {string} param.customClass
 * @param {string} param.num
 */
const ImageLinkTile = ({
  image = {},
  link: {
    linkUrl = '/'
  } = {},
  text: {
    copy = ''
  } = {},
  customClass = '',
  num = '0',
}) => (
  <Link
    to={linkUrl}
    className={`image-link clearfix ${customClass}`}
  >
    <Image num={num} {...image} />
    <p className="textOverlay">{copy}</p>
  </Link>
);

ImageLinkTile.propTypes = {
  image: PropTypes.object.isRequired,
  link: PropTypes.shape({
    linkUrl: PropTypes.string.isRequired
  }).isRequired,
  text: PropTypes.shape({
    copy: PropTypes.string.isRequired
  }).isRequired,
  customClass: PropTypes.string,
  num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default ImageLinkTile
