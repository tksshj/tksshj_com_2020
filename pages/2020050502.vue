<template>
  <tc-page play-button>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        「テキストを隠す」を「Play」にできるようにした。
        ここではPlayもしないし、Pauseもしないけど。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020050502.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
