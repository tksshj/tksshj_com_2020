<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        モザイク、なるほどなあ。(<a href="https://qiita.com/edo_m18/items/d166653ac0dccbc607dc">参考</a>)
      </p>
      <p>
        なんか色々できそうな感じがしてきたかも・・・？
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020051602.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
