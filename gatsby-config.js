module.exports = {
  siteMetadata: {
    title: `Architrave Design, Architect | Residential Designs`,
    description: `Architrave Design, Architect is a Residential Architect designing Homes and Additions in Etobicoke, Toronto, Mississauga, and Oakville.`,
    author: `Architrave Design, Architect`,
    keywords: `Architect, Etobicoke, The Kingsway, Toronto, Mississauga, Oakville, Design, Home, House, Renovation, Addition, Custom Home Design, Home Architect, Renovation Architect, Etobicoke Architect, Toronto Architect, Mississauga Architect, Oakville Architect`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/ArchitraveLogo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: ["src/scss"],
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Raleway\:300,400,500,600,700`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-31313410-1",
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
