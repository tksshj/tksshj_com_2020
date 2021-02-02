<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        線を引いてみたらこんな感じになりました、アニメーション。
      </p>
      <p>
        自分らしくみたいなことが歌詞とかにめっちゃ出てくるんですけど、
        自分自身の定義？がわかってる人いるんだろうか。
      </p>
      <p>
        らしさって最初っから決まってなくて、それまでの行動に似ているみたいなことだと思うんですけど、
        そうすると人生の後半じゃないと自分らしくってできないと思うんですけど、どうなんでしょうか。
      </p>
      <p>
        こういうのまえも書いたっけな、まあいいか。
      </p>
      <p>
        ジン、Beefeater、いつもソーダで割ってるんですけど、サミットにトニックウォーターが売ってたので、
        今日はジントニックにしました。やっぱ甘い。リッキーがいいけどライムはちょっと準備できない気がする。
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
