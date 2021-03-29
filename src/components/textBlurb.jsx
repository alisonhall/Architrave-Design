import React from 'react';
import { PropTypes } from 'prop-types';
import './textBlurb.scss';

/**
 * @description A blue section with text on top.
 * 
 * @param {Object} param
 * @param {Object} param.text
 * @param {string} param.text.copy
 * @param {string} param.text.title
 * @param {string} param.text.subTitle
 * @param {string} param.customClass
 */
const TextBlurb = ({
  text: {
    copy = '',
    title = null,
    subTitle = null
  } = {},
  customClass = ''
}) => (
  <section className={`textBlurb ${customClass}`}>
    {(title || subTitle) && (
      <div className="headingSection">
        {title && (<h2 className="title">{title}</h2>)}
        {subTitle && (<h3 className="subTitle">{subTitle}</h3>)}
      </div>
    )}
    <p className="text">{copy}</p>
  </section>
);

TextBlurb.propTypes = {
  text: PropTypes.shape({
    copy: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string
  }).isRequired,
  customClass: PropTypes.string
};

export default TextBlurb;
