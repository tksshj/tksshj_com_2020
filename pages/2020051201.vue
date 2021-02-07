<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        今週やることが溢れてるので完全に現実逃避で、ツイッタにシェアさせていただきます時をなんとかした？
        今日はバランタインの安いやつ。
      </p>
      <p>
        アニメーションはなんか虫っぽくしたかったけど、ちょっとちがう、でも好き。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051201.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
