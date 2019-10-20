/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

const ImageFillerTile = ({
  dataItem:{
    num = '0',
    image,
    altText = '',
    backgroundPosition = '50% 40%',
    width = '100px',
    height = '100px',
    float = 'left'
  } = {}
}) => (
  <div className={`image image${num} clearfix imageFiller`} css={css`
    width: ${width};
    height: ${height};
    float: ${float};
  `}>
    <div className="shadowOverlay clearfix">
      <picture>
        <source media="(min-width: 650px)" srcset={image} />
        <source media="(max-width: 649px)" srcset={image} />
        <img className={`imageDiv imageDiv${num} filler`} src={image} alt={altText} css={css`
          object-position: ${backgroundPosition};
        `} />
      </picture>
    </div>
    <p className="textOverlay"></p>
  </div>
)

export default ImageFillerTile
