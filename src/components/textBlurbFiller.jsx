/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import './textBlurbFiller.scss';

/**
 * @description A blue filler section, without any image, text, or link
 * 
 * @param {Object} param
 * @param {string} param.customClass
 */
const TextBlurbFiller = ({
  customClass = ''
}) => (
  <section
    className={`textBlurbFiller ${customClass}`}
  />
)

export default TextBlurbFiller
