<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        適正だったか性格だったか人間性だったか忘れたんですが、そういう診断みたいなやつをやったんですけど、
        パリピって感じの診断結果でした。
      </p>
      <p>
        16タイプに分けるみたいなやつで、質問とかが違うものを2種類やったのですが、どちらもパリピ。
      </p>
      <p>
        パリピが嫌いな理由がわかりましたなぜなら自分がパリピだからですええええええそうなのかよって感じでした。
      </p>
      <p>
        このサイトをいますこしずつ改修しています、p5.jsでアニメーションしているページだけにしちゃうかも。
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
