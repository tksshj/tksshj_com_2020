<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        所有しているアコースティックギター、Martin OO-18の匂いがめっちゃ好き。毎日必ず嗅ぐ。木の甘い感じの匂いがする。
      </p>
      <p>
        もしかしたらケースの匂いとかがついている？かもしれないんだけど、木の匂いとして認識している。
        楽器屋さんで働いていたときから、Martinの匂いはなんか違って、すごい好きだった。
        他のアコースティックギターと比較にならないレベルだと思う。いい匂い。
        いや音もそうなんだけど、笑。
      </p>
      <p>
        最近、乾燥しているので、指板のクリーニングとかメンテナンスをするレモンオイルを買った。
        いままで使ったことがないレモンオイルにしたんだけど、この匂いも結構好き。
      </p>
      <p>
        でも、もしかしたらMartinの匂いを消すかも、、、みたいな気がして使えない。どうしよう。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021021601.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
