<template>
  <tc-page play-button @play-button-clicked="playButtonClicked">
    <template slot="animation">
      <tc-animation :playing="playing" />
    </template>
    <template slot="main">
      <p>
        昨日の夜の曲がなんかいい雰囲気すぎてアニメーションが追いつかねえ。
        いや待て、ここでこの曲の感じで、「今日は雨ですね、、、」とかの文章にして・・・？お？それで、
        アニメーションは・・・って考えると・・・ってそんな情緒みたいなん持ってねえよ、、、
      </p>
      <p>
        なんか写真とか動画とかを少し劣化加工したようなものが使いたいかもしれないですね。
        壮大な趣味になってきました。そもそもまだカラーを使ってないですね、全部モノトーン。
      </p>
      <p>
        アニメーション、好きな感じにするのすごい難しい、もう少しやりたいけど時間切れ。
        あと音楽やっぱりこの方法だとループするところが気になりますね。
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
