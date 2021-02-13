<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        今日はiOS開発。EmacsでSwift書いている。
      </p>
      <p>
        最近他の人と作業しているときに、自分はエディタの補完機能をほとんど使わないってことに気がついた。
        いいのか悪いのかわからないけど、そういうスタイルになってしまった。
      </p>
      <p>
        自分のスタイル、オススメできないところ多い。っていうか自分のスタイルあるんだなって思った。
      </p>
      <p>
        3Dオブジェクト動かすの上手く行かないけど偶然があって今のところ面白い。
        動かしてみたいパラメータが多い。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021021302.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
