/** @jsx jsx */
import { PropTypes } from 'prop-types';
import { css, jsx } from '@emotion/core';

import './image.scss';

/**
 * @description An image within a tile.
 * 
 * @param {Object} param
 * @param {string} param.customClass
 * @param {number} param.num
 * @param {File} param.image
 * @param {string} param.imageUrl
 * @param {string} param.altText
 * @param {string} param.backgroundPosition
 * @param {number} param.height
 */
const Image = ({
  customClass = '',
  num = 0,
  image,
  imageUrl,
  altText = '',
  backgroundPosition = '50% 40%',
  height
}) => {
  let imageSrc;
  const imageModifier = height ? `h_${Math.ceil(height * 2)},c_scale,f_auto,q_auto` : 'w_auto,c_scale,f_auto,q_auto';

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

  const imageStyle = imageSrc ? css`
        object-position: 50% 40%;
        @media screen and (min-width: 521px) {
          object-position: ${backgroundPosition};
        }
      ` : null;

  return (
    <div className="shadowOverlay clearfix">
      <img
        className={`imageDiv imageDiv${num} cld-responsive ${customClass}`}
        src={imageSrc}
        alt={altText}
        css={imageStyle}
      />
    </div>
    // <picture>
    //   <source media="(min-width: 650px)" srcSet={image} />
    //   <source media="(max-width: 649px)" srcSet={image} />
    //   <img className={`imageDiv imageDiv${num} ${customClass}`} src={image} alt={altText} css={css`
    //           object-position: ${backgroundPosition};
    //         `} />
    // </picture>
  );
};

Image.propTypes = {
  customClass: PropTypes.string,
  num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  image: PropTypes.any,
  imageUrl: PropTypes.string,
  altText: PropTypes.string,
  backgroundPosition: PropTypes.string,
  height: PropTypes.number
};

export default Image;
