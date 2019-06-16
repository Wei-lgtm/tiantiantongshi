const webpack = require('webpack')

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/style.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-utils'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy:true
  },
  proxy:{
    "/api": {
      target: "http://qasapi.lumibayedu.com/",//http://94.191.80.207:8181/
      secure: true,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [/^element-ui/],
    extractCSS: {allChunks: true},
    extend(config, ctx) {
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jquery': 'jquery',
        'window.jquery': 'jquery'
      })
    ]
  }
}
