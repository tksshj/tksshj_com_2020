<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        今日はやすみ！仕事しない！
      </p>
      <p>
        それでYouTubeで音楽つくるとかガジェットとかの動画を見てたんですけど、すごい。
        Ableton PushとかOP-1とか新しいものじゃないと思うんですけど、自分にとってはすごい新しくて、そしてカッコいいですね。
      </p>
      <p>
        欲しいとか触ってみたいとかの気持ちすごいあるので、購入考えようかな？
        安くないのと音楽そんなにやらないというのが引っかかりますね。んー。
      </p>
      <p class="tc-animation-description">
        五角形を書いてみたくて書いたんですけど、結構時間かかったけどなんか好きな感じじゃなかったです。
        そろそろthree.jsかWebGLにいくかな？
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051001.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
