<template>
  <tc-page play-button @play-button-clicked="playButtonClicked">
    <template slot="animation">
      <tc-animation :playing="playing" />
    </template>
    <template slot="main">
      <p>
        昨日の夜の作った曲がなんかいい雰囲気すぎてアニメーションが追いつかねえ。
        アニメーション、好きな感じにするのすごい難しい、もう少しやりたいけど時間切れ。
        あと音楽やっぱりこの方法だとループするところが気になる。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020050601.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  },
  data() {
    return {
      playing: false
    }
  },
  methods: {
    playButtonClicked(playing) {
      this.playing = playing
    }
  }
}
</script>
