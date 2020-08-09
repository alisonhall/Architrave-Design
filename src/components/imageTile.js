/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core"

const ImageTile = ({
  dataItem: {
    num = '0',
    textOverlay,
    image,
    imageUrl,
    altText = '',
    backgroundPosition = '50% 40%',
    width = '100px',
    height = '100px',
    float = 'left',
    marginTop
  } = {}
}) => (
  <div className={`image image${num} clearfix`} css={css`
    width: ${width};
    height: ${height};
    float: ${float};
    ${marginTop ? `margin-top: ${marginTop}` : ''};
  `}>
    <div className="shadowOverlay clearfix">
      {imageUrl ? (
        <img className={`imageDiv imageDiv${num}`} src={imageUrl} alt={altText} css={css`
          object-position: ${backgroundPosition};
        `} />
      ) : (
        <picture>
          <source media="(min-width: 650px)" srcSet={image} />
          <source media="(max-width: 649px)" srcSet={image} />
          <img className={`imageDiv imageDiv${num}`} src={image} alt={altText} css={css`
            object-position: ${backgroundPosition};
          `} />
        </picture>
      )}
    </div>
    {textOverlay && <p className="textOverlay">{textOverlay}</p>}
  </div>
)

export default ImageTile
