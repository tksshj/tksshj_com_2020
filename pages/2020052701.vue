<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        ステーキ食べたい。<br>
        東京トンテキ食べたい。<br>
        焼き肉食べたい。<br>
        焼き鳥食べたい。<br>
        すき焼き食べたい。
      </p>
      <p>
        アニメーション、なんかイマイチ。回転っぽい動きが良かったかも。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020052701.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
