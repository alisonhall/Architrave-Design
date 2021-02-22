/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import constants from '../../static/app-constants';

/**
 * @description An image within a tile.
 * 
 * @param {Object} param
 * @param {string} param.customClass
 * @param {number} param.num
 * @param {File} param.image
 * @param {string} param.imageUrl
 * @param {string} param.imageModifier
 * @param {string} param.altText
 * @param {string} param.backgroundPosition
 */
const Image = ({
  customClass = '',
  num = 0,
  image,
  imageUrl,
  imageModifier = 'w_auto,c_scale,f_auto,q_auto',
  altText = '',
  backgroundPosition = '50% 40%'
}) => {
  let imageSrc;

  /* Handle/Compile the imageSrc based on the props */
  if (imageUrl) {
    imageSrc = imageUrl;
    if (imageUrl.indexOf('upload') >= 0 && imageUrl.indexOf('w_auto') === -1 && imageUrl.indexOf('h_auto') === -1) {
      const imageParts = imageUrl.split('upload');
      imageSrc = `${imageParts[0]}upload/${imageModifier}${imageParts[1]}`
    }
  } else if (image) {
    imageSrc = image;
  } else {
    return null;
  }

  return (
    <img
      className={`imageDiv imageDiv${num} cld-responsive ${customClass}`}
      src={imageSrc}
      alt={altText}
      css={css`
        object-position: ${backgroundPosition};
      `}
    />
    // <picture>
      //   <source media="(min-width: 650px)" srcSet={image} />
      //   <source media="(max-width: 649px)" srcSet={image} />
      //   <img className={`imageDiv imageDiv${num} ${customClass}`} src={image} alt={altText} css={css`
      //           object-position: ${backgroundPosition};
      //         `} />
      // </picture>
  );
}

export default Image;
