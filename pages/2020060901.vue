<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        集中力もモチベーションもなんか枯れてきている気がする。老いかなこれ。
        お酒に頼ってたりするからかな、、、
      </p>
      <p>
        いや、老いはないとは思わないけど、これはたぶん人にあってないからだろうな。ちょっとなんとかしないと。
      </p>
      <p>
        アニメーションはちょっとだけ変えたけどサボり。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020060901.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
