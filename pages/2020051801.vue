<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        WebGL？glsl？やっぱ難しい。慣れでなんとかなるやつだったらいいけど、どうなんだろう。。。
      </p>
      <p>
        右上が明るくなるようになっている？つもり。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051801.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
