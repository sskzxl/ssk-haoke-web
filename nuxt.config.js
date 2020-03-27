const webpack = require('webpack');

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
    ],
    script: [
      {
        src: "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js",
        ssr: false,
      }
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
    'assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vant-ui.js',
    '~plugins/http.js',
    '~plugins/utils.js',
  ],
  router: {
    middleware: 'auth'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['axios'],
  },
  axios: {
    proxy: true,
    prefix: '/api',
    credentials: true,
  },
  proxy: {
    '/api': {
      target: 'http://haoke.natapp1.cc',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
}
