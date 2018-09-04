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
      apiToken: `98725bd27c857eed0ae1920fd192f7`,
      preview: false,
      disableLiveReload: false,
     },
    },
  ],
}
