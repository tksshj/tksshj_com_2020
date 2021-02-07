<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        「空挺ドラゴンズ」なんかよかった。登場人物がなんか全員好きだった。
        ダメな人ってあんまりいない、自分は結構悪いみかたしてしまうのかも、みたいな気がした。
      </p>
      <p>
        アニメーション、これなんか好きな感じにできそう。
        昨日もそうだけど今日も酔い過ぎてできない。
        明日の酔ってない自分がすげえの作る。
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
