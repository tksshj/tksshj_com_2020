<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        プログラムを書くテキストエディタです。ずっと使っています。
        バッファというファイル編集などの単位があって、
        それを切り替えたり並べたりしながらプログラムを書いていくのが超やりやすいです。
      </p>
      <p>
        アニメーションはうねうねって感じが気に入ってます。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051101.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
