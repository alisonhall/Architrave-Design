/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

function SEO({ description, lang, meta, keywords, title }) {
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

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
}

export default SEO