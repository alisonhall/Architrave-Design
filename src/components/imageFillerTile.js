import React from "react"

const ImageFillerTile = ({ dataItem: {num} }) => (
  <div class={`image image${num} clearfix imageFiller`}>
    <div class="shadowOverlay clearfix">
      <div class={`imageDiv imageDiv${num} filler`}></div>
    </div>
    <p class="textOverlay"></p>
  </div>
)

export default ImageFillerTile
