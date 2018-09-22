const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'WD Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'My cool web development blog'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: ['~/assets/styles/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/core-components.js', '~/plugins/date-filter.js'],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios'],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  },
  axios: {
    baseURL: 'https://nuxt-blog-3d7b5.firebaseio.com',
    credentials: false
  },
  env: {
    baseURL: 'https://nuxt-blog-3d7b5.firebaseio.com',
    fbAPIKey: 'AIzaSyCVp0fhLXmcrVEvpr6qMKMHfstJN5NScSw'
  },
  router: {
    // middleware: ['log'],
    // linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/index.vue')
      });
    }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
};
