import React from 'react';

import constants from './app-constants';
import Item from '../src/components/item';

const { portfolio } = constants;

export const buildProjectTile = (project, num = 1, overrideOptions = {}) => {
  const {
    mainImageUrl,
    type,
    fileName,
    projectName
  } = project;
  const {
    backgroundPosition
  } = overrideOptions;
  return (
    <Item
      num={num}
      project={project}
      image={{
        imageUrl: mainImageUrl
      }}
      link={{
        linkUrl: `/${portfolio}/${type}/${fileName}`,
        backgroundPosition
      }}
      text={{
        copy: projectName
      }}
    />
  );
}
