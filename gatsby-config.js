require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
      apiToken: `82462a85786f02384a31e2c2905159`,
      preview: false,
      disableLiveReload: false,
     },
    },
  ],
}
