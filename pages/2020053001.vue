<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        同じところをぐるぐる回っているって気がしたら、それはおそらく螺旋構造になっていて、
        上ではなく下へ向かっているので気をつけましょう。しらんけど。
      </p>
      <p>
        アニメーション、回転のほうがやっぱいいかも。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020053001.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
