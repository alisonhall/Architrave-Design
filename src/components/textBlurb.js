import React from "react"

const TextBlurb = ({
  dataItem: {
    text = '',
    title = null,
    subTitle = null
  } = {}
}) => (
  <section className="textBlurb">
    {title && (<h2 className="title">{title}</h2>)}
    {subTitle && (<h3 className="subTitle">{subTitle}</h3>)}
    <p className="text">{text}</p>
  </section>
)

export default TextBlurb
