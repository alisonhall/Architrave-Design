/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { css, jsx } from "@emotion/core"

const ImageLinkTile = ({
  dataItem: {
    linkUrl = '/',
    text = '',
    num = '0',
    image,
    altText = '',
    backgroundPosition = '50% 40%',
    width = '100px',
    height = '100px',
    float = 'left'
  } = {}
}) => {
  if (width && height && image) {
    return (
      <Link to={linkUrl} className={`image image${num} clearfix`} css={css`
        width: ${width};
        height: ${height};
        float: ${float};
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
        <p className="textOverlay">{text}</p>
      </Link>
    )
  }
  return (
    <Link to={linkUrl} className={`image image${num} clearfix`}>
      <div className="shadowOverlay clearfix">
        <div className={`imageDiv imageDiv${num}`}></div>
      </div>
      <p className="textOverlay">{text}</p>
    </Link>
  )
}

export default ImageLinkTile
