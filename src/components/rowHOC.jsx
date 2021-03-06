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
 */
const Row = ({ children, height, imageHeight, dimensions = {} }) => {
    if (height) dimensions.height = height;
    if (imageHeight) dimensions.height = imageHeight;
    const items = React.Children.map(children,
        (child) => {
            return React.cloneElement(child, { dimensions });
        });

    return (
        <div className="row" css={css`
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
    })
};

export default Row;
