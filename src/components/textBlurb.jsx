import React from 'react';

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
