import React from 'react';

import ImageTile from './imageTile';
import ImageLinkTile from './imageLinkTile';
import ImageFillerTile from './imageFillerTile';
import TextBlurb from './textBlurb';
import TextBlurbFiller from './textBlurbFiller';

/**
 * @description A switcher to render either the ImageLinkTile, ImageTile, TextBlurb, or TextBlurbFiller depending on the inputs.
 * 
 * 
 * @param {string|number} num
 * @param {Object} project
 * @param {string} customClass
 * 
 * @param {Object|boolean} image
 * @param {File} image.image
 * @param {string} image.imageUrl
 * @param {string} image.altText
 * @param {string} image.backgroundPosition
 * @param {number} image.height
 * 
 * @param {Object|boolean} link
 * @param {string} link.linkUrl
 * 
 * @param {Object|boolean} text
 * @param {string} text.copy
 * @param {string} text.title
 * @param {string} text.subTitle
 */
export default (data) => {
  const {
    customClass,
    image,
    link,
    text
  } = data;

  if (image && link) {
    return <ImageLinkTile {...data} />;
  }

  if (image && customClass === 'filler') {
    return <ImageFillerTile {...data} />;
  }
  
  if (image) {
    return <ImageTile {...data} />;
  }
  
  if (text) {
    return <TextBlurb {...data} />;
  }

  return <TextBlurbFiller {...data} />;
}
