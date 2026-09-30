/** @jsx jsx */
import React from 'react';
import { PropTypes } from 'prop-types';
import { css, jsx } from '@emotion/react';
import './row.scss';

/**
 * @description The row layout
 * 
 * @param {Object} param
 * @param {Node} param.children
 * @param {number} param.height
 * @param {Object} param.dimensions
 * @param {string} param.domId - optional; set on the rendered div as `data-row-id`. Only
 * ever populated by the admin tool's editor-only row ids (see layoutHelpers.js
 * hydrateLayoutData) so it can resolve a click back to its data — real committed
 * static/layouts/*.js data has no ids, so this is always absent on the live site.
 */
const Row = ({ children, height, imageHeight, dimensions = {}, domId }) => {
    if (height) dimensions.height = height;
    if (imageHeight) dimensions.height = imageHeight;
    const items = React.Children.map(children,
        (child) => {
            return React.cloneElement(child, { dimensions });
        });

    return (
        <div className="row" data-row-id={domId} css={css`
            ${height ? `max-height: ${height}px; min-height: ${height}px` : ''};
            @media screen and (max-width: 520px) {
            max-height: none;
            min-height: 1px;
            }
        `}>
            {items}
        </div>
    );
}

Row.propTypes = {
    children: PropTypes.node.isRequired,
    height: PropTypes.number,
    dimensions: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.number
    }),
    domId: PropTypes.string
};

export default Row;
