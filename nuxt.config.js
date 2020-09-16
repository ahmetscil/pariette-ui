module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '05415966667 Esenyurt ve Merter, Çevre üniversitelere ücretsiz servis imkanı' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/fontawesome/css/all.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/animate.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/flaticon.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@700&family=Open+Sans:wght@300;400;700&family=Raleway:ital,wght@0,300;1,700;1,900&display=swap' }
    ]
  },
  script: [
  ],
  loading: { color: '#fff' },
  css: [
  ],
  plugins: [
    { src: './plugins/editor.js', mode: 'client' },
    { src: './plugins/carousel.js', mode: 'client' },
    { src: './plugins/lightbox.js', mode: 'client' },
    { src: './plugins/social-sharing.js' },
    { src: './plugins/i18n.js' },
    { src: './plugins/vuelidate.js' },
    { src: './plugins/google.js', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'bootstrap-vue/nuxt',
    '@nuxtjs/component-cache',
    ['nuxt-gmaps', {
      key: 'AIzaSyC7BVLXIeeFPSZFQQdOOKZQ0TQwDDb6nhk'
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-82842015-1'
    }]
  ],
  toast: {
    position: 'top-right',
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  axios: {
  },
  build: {
    extend (config, ctx) {
      vendor : [
        'axios'
      ]
    }
  }
}
