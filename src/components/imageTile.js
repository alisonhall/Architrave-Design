/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

const ImageTile = ({
  dataItem: {
    num = '0',
    textOverlay = '',
    image,
    altText = '',
    backgroundPosition = '50% 40%',
    width = '100px',
    height = '100px'
  } = {}
}) => (
  <div className={`image image${num} clearfix`} css={css`
    width: ${width};
    height: ${height};
  `}>
    <div className="shadowOverlay clearfix">
      <picture>
        <source media="(min-width: 650px)" srcset={image} />
        <source media="(max-width: 649px)" srcset={image} />
        <img className={`imageDiv imageDiv${num}`} src={image} alt={altText} css={css`
          object-position: ${backgroundPosition};
        `} />
      </picture>
    </div>
    <p className="textOverlay">{textOverlay}</p>
  </div>
)

export default ImageTile
