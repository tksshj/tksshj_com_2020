<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        なんでもいいよって言われると困るみたいなのあると思う。
        何か制限があったほうが行動しやすいとか、思考しやすいとか。
        そういう制限とかって実はやる気のタネみたいなものなのかもしれない。
      </p>
      <p>
        締切が明日っていうの結構な制限かと思うんだけど、やる気が出てこない。なぜなのか。
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
