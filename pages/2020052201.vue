<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        忙しさに比例して面白いことも増える。
        実績に比例して依頼も増える。
        すごく良いことなんだけど、ちょっと量の調整機能にバグがあるな。。。
      </p>
      <p>
        アニメーションは時間がなさすぎてWebGLできなくて、p5で書きました。
        酔っ払ってるからかもしれないけどWebGLなんか覚悟が必要っぽいですよ？
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020052201.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
