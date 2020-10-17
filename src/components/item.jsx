import React from 'react';

import ImageTile from './imageTile';
import ImageLinkTile from './imageLinkTile';
import ImageFillerTile from './imageFillerTile';
import TextBlurb from './textBlurb';
import TextBlurbFiller from './textBlurbFiller';

export default (data) => {
  const {
    image,
    link,
    text
  } = data;

  if (image && link) {
    return <ImageLinkTile {...data} />;
  } else if (image) {
    return <ImageTile {...data} />;
  } else if (text) {
    return <TextBlurb {...data} />;
  }
  return <TextBlurbFiller {...data} />;
}
