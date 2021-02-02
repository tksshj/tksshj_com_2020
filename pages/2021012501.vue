<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        久しぶりにp5.jsでなにか書こうと思ったら全然書けないですね。
        目的なく書き始めてるから当たり前なのかも。
      </p>
      <p>
        いろんなものが間に合わない、ゆっくりやりたいけど、もう人生全部これ。
        自分で手を動かしてないとなんかっていう貧乏性なんですかこれは。
      </p>
      <p>
        でも例えばこれだって、p5.js使ってできるよね、って思うことは簡単だけど、
        実際やってみないと満足できない。
        やればできると思ってる自分はなんかカッコ悪い気がしてしまう。
      </p>
      <p>
        なんかYouTubeの広告とかによくある、XXX会社が成功した秘密ご存知ですか！？みたいなの。
        あれに感じる、じゃあどうしてお前はやってねえんだ感。
        あんな気持ちが自分に出てしまう。
      </p>
      <p>
        あれこんなん書いてないで仕事しないと、すみません！いまからやります！
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021012501.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
