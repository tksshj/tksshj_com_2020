<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        「空挺ドラゴンズ」なんかよかった。登場人物がなんか全員好きだった。
        ダメな人ってあんまりいないよ？自分の見る角度ちゃんとしてる？みたいな。
      </p>
      <p>
        アニメーション、これなんか好きな感じにできそうなんですが、昨日もそうなんですが今日も酔い過ぎてできません。
        明日の酔ってない自分がすげえの作りますよ、これは作りますね。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020052301.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
