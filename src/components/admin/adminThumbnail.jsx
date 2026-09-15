import React from 'react';
import PropTypes from 'prop-types';

const THUMBNAIL_HEIGHT = 40;

/**
 * @description A small square thumbnail for identifying a project or tile at a glance
 * in an admin list row (Projects, Tiles). Applies the same Cloudinary resize convention
 * as the real site's Image component (src/components/image.jsx), scaled down for a
 * list-row-sized crop; a non-Cloudinary URL (a local dev/test image, e.g.) is used
 * as-is. Renders nothing when there's no image to show, so a row without one just has
 * no thumbnail rather than a broken image icon.
 *
 * @param {Object} param
 * @param {string} [param.imageUrl]
 */
const AdminThumbnail = ({ imageUrl }) => {
  if (!imageUrl) return null;

  let thumbnailUrl = imageUrl;
  if (imageUrl.includes('upload') && !imageUrl.includes('h_auto') && !imageUrl.includes('w_auto')) {
    const [before, after] = imageUrl.split('upload');
    thumbnailUrl = `${before}upload/h_${THUMBNAIL_HEIGHT * 2},c_fill,f_auto,q_auto${after}`;
  }

  return <img className="adminThumbnail" src={thumbnailUrl} alt="" />;
};

AdminThumbnail.propTypes = {
  imageUrl: PropTypes.string
};

AdminThumbnail.defaultProps = {
  imageUrl: null
};

export default AdminThumbnail;
