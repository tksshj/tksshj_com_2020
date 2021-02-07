<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        適正だったか性格だったか人間性だったか忘れたけど、そういう診断みたいなやつをやった。
        パリピって感じの診断結果だった。
      </p>
      <p>
        16タイプに分けるみたいなやつで、質問とかが違うものを2種類やった。
        どちらもほぼ同じ診断内容で、パリピ。
      </p>
      <p>
        パリピが嫌いな理由が自分がパリピだからなのかよええええええやめてええええって感じ。
      </p>
      <p>
        ほかの人の診断内容を見ると結構当たっているので、まあパリピなのかも。
      </p>
      <p>
        このサイトをいますこしずつ改修していて、p5.jsでアニメーションしているページだけにしちゃうかも。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021020401.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
