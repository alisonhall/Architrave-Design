import React from 'react';
import { PropTypes } from 'prop-types';

import './item.scss';
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
 * @param {boolean} isFiller
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
const Item = (data) => {
  const {
    isFiller,
    customClass = '',
    num = '0',
    image,
    link,
    text
  } = data;

  if (image && link) {
    return <ImageLinkTile customClass={`${customClass} item image image${num}`} {...data} />;
  }

  if (image && isFiller) {
    return <ImageFillerTile customClass={`${customClass} item image image${num}`} {...data} />;
  }
  
  if (image) {
    return <ImageTile customClass={`${customClass} item image image${num}`} {...data} />;
  }
  
  if (text) {
    return <TextBlurb customClass={`${customClass} item`} {...data} />;
  }

  return <TextBlurbFiller customClass={`${customClass} item`} {...data} />;
};

Item.propTypes = {
  num: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  project: PropTypes.object,
  customClass: PropTypes.string,
  isFiller: PropTypes.bool,
  image: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      image: PropTypes.any,
      imageUrl: PropTypes.string,
      altText: PropTypes.string,
      backgroundPosition: PropTypes.string,
      height: PropTypes.number
    })
  ]),
  link: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      linkUrl: PropTypes.string
    })
  ]),
  text: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      copy: PropTypes.string,
      title: PropTypes.string,
      subTitle: PropTypes.string
    })
  ])
};

export default Item;
