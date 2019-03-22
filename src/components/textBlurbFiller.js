/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

const TextBlurbFiller = ({
  dataItem: {
    width = 0,
    height = 0
  } = {}
}) => (
  <section className="textBlurbFiller" css={css`
    width: ${width};
    height: ${height};
  `}>
  </section>
)

export default TextBlurbFiller
