const webpack = require('webpack')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '天天通识',
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
    'element-ui/lib/theme-chalk/index.css',
	'~/assets/css/style.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src:'@/plugins/vue-utils', ssr:false},
    { src:'@/plugins/vue-echarts', ssr:false}
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
    proxy:true,
  },
  proxy:{
    "/api": {
      // target: "http://qasapi.lumibayedu.com/",
      target: "https://api.lumibayedu.com/",
      secure: true,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    },
    "/qasschool": {
      // target: "http://qasschoolapi.lumibayedu.com/",
      target: "https://schoolapi.lumibayedu.com/",
      secure: true,
      changeOrigin: true,
      pathRewrite: {
        "^/qasschool": "/"
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
    transpile: ['vue-echarts', 'resize-detector',/^element-ui/],
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
