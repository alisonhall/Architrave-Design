/** @jsx jsx */
import React from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/core';

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
 * @param {Object} param.styles
 * @param {string} param.styles.width
 * @param {string} param.styles.height
 * @param {string} param.styles.float
 */
const ImageLinkTile = ({
  image,
  link: {
    linkUrl = '/'
  } = {},
  text: {
    copy = ''
  } = {},
  customClass = '',
  num = '0',
  styles: {
    width = '100px',
    height = '100px',
    float = 'left'
  } = {}
}) => {
  if (width && height && image) {
    return (
      <Link
        to={linkUrl}
        className={`image-link image image${num} clearfix ${customClass}`}
        css={css`
          width: ${width};
          height: ${height};
          float: ${float};
        `}
      >
        <div className="shadowOverlay clearfix">
          <Image num={num} {...image} />
        </div>
        <p className="textOverlay">{copy}</p>
      </Link>
    )
  }
  return (
    <Link
      to={linkUrl}
      className={`image-link image image${num} clearfix ${customClass}`}
    >
      <div className="shadowOverlay clearfix">
        <div className={`imageDiv imageDiv${num}`}></div>
      </div>
      <p className="textOverlay">{copy}</p>
    </Link>
  )
}

export default ImageLinkTile
