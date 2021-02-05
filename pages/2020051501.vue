<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        p5.jsでやってることが同じに見えてきたので、そろそろ次なんですが、
        仕事で使うのもあって先にWebGLでなんかやってみることにしました。
        three.jsのほうがなんか先にやろうと思ってたんですけど、
        仕事から逃げても仕事っぽいことやってポイントが溜まっていくみたいな予定です。
      </p>
      <p>
        WebGL、そもそも何をやるにしても初期コストが高い感じなので、グラデーションだけですんごい量のソースコード書きました。
        しかもスマホとか他のブラウザでも表示できるか超不安。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051501.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
