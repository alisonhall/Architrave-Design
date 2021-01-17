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
 * @param {string} image.imageFolder
 * @param {string} image.imageName
 * @param {string} image.imageModifier
 * @param {string} image.altText
 * @param {string} image.backgroundPosition
 * 
 * @param {Object|boolean} link
 * @param {string} link.linkUrl
 * 
 * @param {Object|boolean} text
 * @param {string} text.copy
 * @param {string} text.title
 * @param {string} text.subTitle
 * 
 * @param {Object} styles
 * @param {string} styles.width
 * @param {string} styles.height
 * @param {string} styles.float
 * @param {Object} styles.marginTop
 */
export default (data) => {
  const {
    image,
    link,
    text
  } = data;

  if (image && link) {
    return <ImageLinkTile {...data} />;
  } else if (image) {
    return <ImageTile {...data} />;
  } else if (text) {
    return <TextBlurb {...data} />;
  }
  return <TextBlurbFiller {...data} />;
}
