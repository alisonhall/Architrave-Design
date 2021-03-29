import React from 'react';
import { PropTypes } from 'prop-types';
import './textBlurbFiller.scss';

/**
 * @description A blue filler section, without any image, text, or link
 * 
 * @param {Object} param
 * @param {string} param.customClass
 */
const TextBlurbFiller = ({
  customClass = ''
}) => (
  <section
    className={`textBlurbFiller ${customClass}`}
  />
);

TextBlurbFiller.propTypes = {
  customClass: PropTypes.string
};

export default TextBlurbFiller;
