import React from 'react';
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
)

export default TextBlurb
