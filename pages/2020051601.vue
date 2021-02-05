<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        WebGL、<a href="https://wgld.org/d/webgl/w053.html">こちらを参考に</a>写真を白黒で表示してみたんですが、
        そもそもいい写真なんて持ってないですね。
        そしてWebGLやっぱ時間かかるし難しいので、p5.jsで簡単に遊んでるほうがテンション維持しやすいかも。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051601.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
