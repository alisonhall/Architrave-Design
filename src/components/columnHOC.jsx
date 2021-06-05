/** @jsx jsx */
import React from 'react';
import { PropTypes } from 'prop-types';
import { css, jsx } from '@emotion/react';

import './column.scss';

/**
 * @description The column layout.
 * 
 * @param {Object} param
 * @param {Node} param.children
 * @param {string} param.width
 * @param {Object} param.dimensions
 */
const Column = ({ children, width, dimensions = {} }) => {
    if (width) dimensions.width = width;
    const items = React.Children.map(children,
        (child) => {
            return React.cloneElement(child, { dimensions });
        });

    return (
        <div className="column" css={css`
            ${width ? `width: ${width}` : ''};
            @media screen and (max-width: 520px) {
            width: 100%;
            }
        `}>
            {items}
        </div>
    );
}

Column.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
    dimensions: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.number
    })
};

export default Column;
