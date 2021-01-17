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
 * @param {string} param.imageFolder
 * @param {string} param.imageName
 * @param {string} param.imageModifier
 * @param {string} param.altText
 * @param {string} param.backgroundPosition
 */
const Image = ({
  customClass = '',
  num = 0,
  image,
  imageUrl,
  imageFolder,
  imageName,
  imageModifier = 'w_auto,c_scale,f_auto,q_auto',
  altText = '',
  backgroundPosition = '50% 40%'
}) => {
  const {
    cloudinary: {
      user,
      account,
      siteFolder
    } = {}
  } = constants;

  let imageSrc;

  /* Handle/Compile the imageSrc based on the props */
  if (imageFolder && imageName) {
    imageSrc = `https://res.cloudinary.com/${user}/image/upload/${imageModifier}/${account}/${siteFolder}${imageFolder}${imageName}`
  } else if (imageUrl) {
    let imageSrc = imageUrl;
    if (imageUrl.indexOf(account) >= 0 && imageUrl.indexOf('w_auto') === -1) {
      const imageParts = imageUrl.split(account);
      imageSrc = `${imageParts[0]}${imageModifier}/${account}${imageParts[1]}`
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
