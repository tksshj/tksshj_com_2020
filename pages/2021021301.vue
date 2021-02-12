<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        EVISBEATS、数日前から聞いてるんだけどめっちゃ好き。
        歌詞はまだあんまり聞けてないんだけど、トラック？がすごいなんか優しいというか、好き。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021021301.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
