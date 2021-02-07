<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        今日は仕事しない。
      </p>
      <p>
        それでYouTubeで音楽つくるとかガジェットとかの動画を見てたんだけど、すごい。
        Ableton PushとかOP-1とか新しいものじゃないと思うんだけど、自分にとってはすごい新しくて、そしてカッコいい。
      </p>
      <p>
        欲しいとか触ってみたいとかの気持ちすごいあるけど、安くないのと音楽そんなにやるのかなって感じ。
      </p>
      <p>
        五角形を書いてみたくて書いた。結構時間かかったけどなんか好きな感じにできなかった。
        そろそろThree.jsかWebGLにいくかな。
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
