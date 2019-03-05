import React from "react"

const ImageTile = ({ dataItem: {num, textOverlay = ''} }) => (
  <div className={`image image${num} clearfix`}>
    <div className="shadowOverlay clearfix">
      <div className={`imageDiv imageDiv${num}`}></div>
    </div>
    <p className="textOverlay">{textOverlay}</p>
  </div>
)

export default ImageTile
