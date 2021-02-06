const fs = require('fs')
const { JSDOM } = require('jsdom')
import TcPages from './components/tc_pages.js'


export default {
  ssr: false,
  css: [
    '~/assets/application.scss'
  ],
  plugins: [
    '~/plugins/components.js'
  ],
  modules: [
    ['@nuxtjs/google-analytics', { id: 'UA-20744647-2' }]
  ],
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "application-name", content: "tksshj.com" },
      { name: "msapplication-square70x70logo", content: "/site-tile-70x70.png" },
      { name: "msapplication-square150x150logo", content: "/site-tile-150x150.png" },
      { name: "msapplication-wide310x150logo", content: "/site-tile-310x150.png" },
      { name: "msapplication-square310x310logo", content: "/site-tile-310x310.png" },
      { name: "msapplication-TileColor", content: "#0078d7" }
    ],
    link: [
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=block', rel: 'stylesheet' },
      { href: "https://fonts.googleapis.com/icon?family=Material+Icons", rel: "stylesheet" },
      { href: '/favicons/favicon.ico', rel:'icon' },
      { href: '/favicons/apple-touch-icon-180x180.png', rel:'apple-touch-icon' }
    ]
  },
  hooks: {
    generate: {
      routeCreated(params) {
        /* console.log('hooks:generate:routeCreated')
         * console.log(params) */

        if (!params.route.startsWith('/202') && params.route != '/') {
          return;
        }

        let title = 'tksshj.com'
        let url = 'https://tksshj.com/'
        let ogType = 'article'
        if (params.route != '/') {
          let page = TcPages.pages.find(page => '/' + page.id == params.route)
          title = page.title + ' - tksshj.com'
          url = `https://tksshj.com/${page.id}/`
          ogType = 'website'
        }

        let text = fs.readFileSync(params.path, 'utf-8')
        let dom = new JSDOM(text)
        let document = dom.window.document
        let head = dom.window.document.head

        let metaData = [
          { property: 'og:type',  content: ogType },
          { property: 'og:image', content: 'https://tksshj.com/favicons/site-tile-310x310.png' },
          { property: 'og:url',   content: url },
          { property: 'og:title', content: title },
          { name: 'twitter:site', content: '@tksshj' },
          { name: 'twitter:card', content: 'summary' }
        ]
        for (let i = 0; i < metaData.length; i++) {
          let meta = metaData[i]
          let metaNode = document.createElement('meta')
          if (meta.name) {
            metaNode.setAttribute('name', meta.name)
          }
          if (meta.property) {
            metaNode.setAttribute('property', meta.property)
          }
          metaNode.setAttribute('content', meta.content)
          head.prepend(metaNode)
        }

        let titleNode = document.createElement('title')
        titleNode.textContent = title
        head.prepend(titleNode)

        let metaNode = document.createElement('meta')
        metaNode.setAttribute('charset', 'utf-8')
        head.prepend(metaNode)

        fs.writeFileSync(params.path, dom.serialize(), 'utf-8')
      }
    }
  }
}
