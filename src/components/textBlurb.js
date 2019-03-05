import React from "react"

const TextBlurb = ({ dataItem: {text, title = null, subTitle = null }}) => (
  <section class="textBlurb">
    {title && (<h2>{title}</h2>)}
    {subTitle && (<h3>{subTitle}</h3>)}
    <p>{text}</p>
  </section>
)

export default TextBlurb
