<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        今週やることが溢れてるので完全に現実逃避なんですが、ツイッタにシェアさせていただきます時に、
        ちゃんとしようと思って今日はなんだっけ、バランタインの安いやつ。やべえな明日から本気出す。
        いや出さざるを得ないですごめんなさいやります。
      </p>
      <p>
        アニメーションはなんか虫っぽくしたかったんですけど、ちょっとちがいますね、でも好きです。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051201.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
