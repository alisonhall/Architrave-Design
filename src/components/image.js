/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

import constants from '../../static/app-constants';

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

  if (imageFolder && imageName) {
    return (
      <img
        className={`imageDiv imageDiv${num} cld-responsive ${customClass}`}
        src={`https://res.cloudinary.com/${user}/image/upload/${imageModifier}/${account}/${siteFolder}${imageFolder}${imageName}`}
        alt={altText}
        css={css`
          object-position: ${backgroundPosition};
        `}
      />
    )
  } else if (imageUrl) {
    return (
      <img
        className={`imageDiv imageDiv${num} cld-responsive ${customClass}`}
        src={imageUrl}
        alt={altText}
        css={css`
          object-position: ${backgroundPosition};
        `}
      />
    );
  } else if (image) {
    return (
      <picture>
        <source media="(min-width: 650px)" srcSet={image} />
        <source media="(max-width: 649px)" srcSet={image} />
        <img className={`imageDiv imageDiv${num} ${customClass}`} src={image} alt={altText} css={css`
                object-position: ${backgroundPosition};
              `} />
      </picture>
    )
  }
  return null;
}

export default Image;
