/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

/**
 * @description A blue filler section, without any image, text, or link
 * 
 * @param {Object} param
 * @param {Object} param.styles
 * @param {string} param.styles.width
 * @param {string} param.styles.height
 * @param {string} param.styles.float
 * @param {string} param.customClass
 */
const TextBlurbFiller = ({
  styles: {
    width = 0,
    height = 0,
    float = 'none'
  } = {},
  customClass = ''
}) => (
  <section
    className={`textBlurbFiller ${customClass}`}
    css={css`
      width: ${width};
      height: ${height};
      float: ${float};
    `}
  />
)

export default TextBlurbFiller
