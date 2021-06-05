import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

/**
 * @description All of the SEO data for a page.
 * 
 * @param {Object} param
 * @param {string} param.description
 * @param {string} param.lang
 * @param {string} param.meta
 * @param {Array|string} param.keywords
 * @param {string} param.title
 */
function Seo({ description, lang, meta, keywords, title }) {
  const site = {
    siteMetadata: {
      title: `Architrave Design, Architect | Residential Designs`,
      description: `Architrave Design, Architect is a Residential Architect designing Homes and Additions in Etobicoke, Toronto, Mississauga, and Oakville.`,
      author: `Architrave Design, Architect`,
      keywords: `Architect, Etobicoke, The Kingsway, Toronto, Mississauga, Oakville, Design, Home, House, Renovation, Addition, Custom Home Design, Home Architect, Renovation Architect, Etobicoke Architect, Toronto Architect, Mississauga Architect, Oakville Architect`
    }
  }
  const metaDescription = description || site.siteMetadata.description
  const titleTemplate = title ? `%s | ${site.siteMetadata.title}` : `${site.siteMetadata.title}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || site.siteMetadata.title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
}

export default Seo
