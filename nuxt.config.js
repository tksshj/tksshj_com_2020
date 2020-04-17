export default {
  mode: 'spa',
  css: [
    '~/assets/application.scss'
  ],
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-20744647-2'
    }]
  ],
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=block', rel: 'stylesheet' }
    ]
  }
}
