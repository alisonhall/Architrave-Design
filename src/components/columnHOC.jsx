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
 * @param {string} param.domId - optional; set on the rendered div as `data-column-id`.
 * Only ever populated by the admin tool's editor-only column ids (see
 * layoutHelpers.js hydrateLayoutData) so it can resolve a click back to its data — real
 * committed static/layouts/*.js data has no ids, so this is always absent on the live
 * site.
 */
const Column = ({ children, width, dimensions = {}, domId }) => {
    if (width) dimensions.width = width;
    const items = React.Children.map(children,
        (child) => {
            return React.cloneElement(child, { dimensions });
        });

    return (
        <div className="column" data-column-id={domId} css={css`
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
    }),
    domId: PropTypes.string
};

export default Column;
