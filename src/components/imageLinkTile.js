import React from "react"
import { Link } from "gatsby"

const ImageLinkTile = ({dataItem: {linkUrl, text, num, imageUrl, backgroundPosition, width, height}}) => {
  // if (width && height && imageUrl && backgroundPosition) {
  //   return (
  //     <Link to={linkUrl} class={`image clearfix`} style={{
  //       width: width,
  //       height: height
  //     }}>
  //       <div class="shadowOverlay clearfix">
  //         <div class={`imageDiv`} style={{
  //           backgroundImage: `url('${imageUrl}')`,
  //           backgroundPosition: backgroundPosition
  //         }}></div>
  //       </div>
  //       <p class="textOverlay">{text}</p>
  //     </Link>
  //   )
  // }
  return (
    <Link to={linkUrl} class={`image image${num} clearfix`}>
      <div class="shadowOverlay clearfix">
        <div class={`imageDiv imageDiv${num}`}></div>
      </div>
      <p class="textOverlay">{text}</p>
    </Link>
  )
}

export default ImageLinkTile
