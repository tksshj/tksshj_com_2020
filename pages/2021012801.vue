<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        線を引いてみたらこんな感じになった、アニメーション。
      </p>
      <p>
        自分らしくみたいなことが歌詞とかにめっちゃ出てくる。好きな曲もたくさんある。
        自分自身の定義？がわかってる人いるんだろうか。
      </p>
      <p>
        らしさって最初っから決まってなくて、それまでの行動に似ているみたいなことかなって思う。
        そうすると人生の後半じゃないと自分らしくってできないような気がする。
      </p>
      <p>
        まして誰かといると自分らしくできる、みたいなのはちょっと信じられない。
        誰かにとっての自分が自分らしさってどうなんだろ。
      </p>
      <p>
        こういうのまえも書いたっけな、まあいいか。
      </p>
      <p>
        ジン、Beefeater、いつもソーダで割ってるんだけど、
        今日はサミットにトニックウォーターが売ってたのでジントニックにした。
        やっぱ甘い。リッキーがいいけどライムはちょっと準備できない気がする。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021012801.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
