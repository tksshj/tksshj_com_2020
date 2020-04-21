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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "msapplication-square70x70logo", content: "/site-tile-70x70.png" },
      { name: "msapplication-square150x150logo", content: "/site-tile-150x150.png" },
      { name: "msapplication-wide310x150logo", content: "/site-tile-310x150.png" },
      { name: "msapplication-square310x310logo", content: "/site-tile-310x310.png" },
      { name: "msapplication-TileColor", content: "#0078d7" }
    ],
    link: [
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=block', rel: 'stylesheet' },
      { href: '/favicons/favicon.ico', rel:'shortcut icon', type:'image/vnd.microsoft.icon' },
      { href: '/favicons/favicon.ico', rel:'icon', type: 'image/vnd.microsoft.icon' },
      { href: '/favicons/apple-touch-icon-57x57.png', rel:'apple-touch-icon', sizes: '57x57' },
      { href: '/favicons/apple-touch-icon-60x60.png', rel:'apple-touch-icon', sizes: '60x60' },
      { href: '/favicons/apple-touch-icon-72x72.png', rel:'apple-touch-icon', sizes: '72x72' },
      { href: '/favicons/apple-touch-icon-76x76.png', rel:'apple-touch-icon', sizes: '76x76' },
      { href: '/favicons/apple-touch-icon-114x114.png', rel:'apple-touch-icon', sizes: '114x114' },
      { href: '/favicons/apple-touch-icon-120x120.png', rel:'apple-touch-icon', sizes: '120x120' },
      { href: '/favicons/apple-touch-icon-144x144.png', rel:'apple-touch-icon', sizes: '144x144' },
      { href: '/favicons/apple-touch-icon-152x152.png', rel:'apple-touch-icon', sizes: '152x152' },
      { href: '/favicons/apple-touch-icon-180x180.png', rel:'apple-touch-icon', sizes: '180x180' },
      { href: '/favicons/android-chrome-36x36.png', rel:'icon', type: 'image/png', sizes: '36x36' },
      { href: '/favicons/android-chrome-48x48.png', rel:'icon', type: 'image/png', sizes: '48x48' },
      { href: '/favicons/android-chrome-72x72.png', rel:'icon', type: 'image/png', sizes: '72x72' },
      { href: '/favicons/android-chrome-96x96.png', rel:'icon', type: 'image/png', sizes: '96x96' },
      { href: '/favicons/android-chrome-128x128.png', rel:'icon', type: 'image/png', sizes: '128x128' },
      { href: '/favicons/android-chrome-144x144.png', rel:'icon', type: 'image/png', sizes: '144x144' },
      { href: '/favicons/android-chrome-152x152.png', rel:'icon', type: 'image/png', sizes: '152x152' },
      { href: '/favicons/android-chrome-192x192.png', rel:'icon', type: 'image/png', sizes: '192x192' },
      { href: '/favicons/android-chrome-256x256.png', rel:'icon', type: 'image/png', sizes: '256x256' },
      { href: '/favicons/android-chrome-384x384.png', rel:'icon', type: 'image/png', sizes: '384x384' },
      { href: '/favicons/android-chrome-512x512.png', rel:'icon', type: 'image/png', sizes: '512x512' },
      { href: '/favicons/icon-36x36.png', rel:'icon', type: 'image/png', sizes: '36x36' },
      { href: '/favicons/icon-48x48.png', rel:'icon', type: 'image/png', sizes: '48x48' },
      { href: '/favicons/icon-72x72.png', rel:'icon', type: 'image/png', sizes: '72x72' },
      { href: '/favicons/icon-96x96.png', rel:'icon', type: 'image/png', sizes: '96x96' },
      { href: '/favicons/icon-128x128.png', rel:'icon', type: 'image/png', sizes: '128x128' },
      { href: '/favicons/icon-144x144.png', rel:'icon', type: 'image/png', sizes: '144x144' },
      { href: '/favicons/icon-152x152.png', rel:'icon', type: 'image/png', sizes: '152x152' },
      { href: '/favicons/icon-160x160.png', rel:'icon', type: 'image/png', sizes: '160x160' },
      { href: '/favicons/icon-192x192.png', rel:'icon', type: 'image/png', sizes: '192x192' },
      { href: '/favicons/icon-196x196.png', rel:'icon', type: 'image/png', sizes: '196x196' },
      { href: '/favicons/icon-256x256.png', rel:'icon', type: 'image/png', sizes: '256x256' },
      { href: '/favicons/icon-384x384.png', rel:'icon', type: 'image/png', sizes: '384x384' },
      { href: '/favicons/icon-512x512.png', rel:'icon', type: 'image/png', sizes: '512x512' },
      { href: '/favicons/icon-16x16.png', rel:'icon', type: 'image/png', sizes: '16x16' },
      { href: '/favicons/icon-24x24.png', rel:'icon', type: 'image/png', sizes: '24x24' },
      { href: '/favicons/icon-32x32.png', rel:'icon', type: 'image/png', sizes: '32x32' },
      { href: '/favicons/manifest.json', rel:'manifest' }
    ]
  }
}
