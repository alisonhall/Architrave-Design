import React from "react"

import ImageTile from './imageTile';
import ImageLinkTile from './imageLinkTile';
import ImageFillerTile from './imageFillerTile';
import TextBlurb from './textBlurb';

export default (dataItem) => {
  if (dataItem.type === 'image-tile') {
    return (
      <ImageTile dataItem={dataItem} />
    )
  } else if (dataItem.type === 'image-link') {
    return (
      <ImageLinkTile dataItem={dataItem} />
    )
  } else if (dataItem.type === 'image-filler') {
    return (
      <ImageFillerTile dataItem={dataItem} />
    )
  } else if (dataItem.type === 'text-blurb') {
    return (
      <TextBlurb dataItem={dataItem} />
    )
  }
}
