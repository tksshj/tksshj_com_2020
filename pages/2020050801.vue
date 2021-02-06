<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        なんでもいいよって言われると困るみたいなのあるじゃないですか。
        何か制限があったほうが行動しやすいとか、思考しやすいとか。
        そういう制限とかって実はやる気のタネみたいなものなのかもしれないですね。
      </p>
      <p>
        でもあれか、締切明日っていうの結構な制限かと思うんですけど、やる気出てこないですね。
        制限の種類が違うのかな。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020050801.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
