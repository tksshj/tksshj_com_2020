<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        オレンジピールが入っているチョコレート、すごい好き。
      </p>
      <p>
        3D思ったより適当でも遊べてしまうな。遊べるけど狙い通りにはならない。ちゃんと計算しないと。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021021101.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
