<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        最近やっとYouTubeが面白いことに気が付きました。
        なんでだろう、いままで受け付けられない感じだったんですが。
        自宅作業でYouTube面白くなったらやばそうですね。やばいです。
      </p>
      <p>
        アニメーションいよいよ飽きてきましたね。
        WebGLモードだと角丸が効かないっぽいです。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051401.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
