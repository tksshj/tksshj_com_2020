<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        スマホのSafariですこしスクロールしようとすると上下のツールバーが消えるの、
        画面の大きさが変わってしまうので、ちょっと対応必要だけど地味に大変。
      </p>
      <p>
        スマホはそもそも画面の大きさが機種によって違うので、上下のスクロールは必ずできる、してしまう、
        というデザインにしていくのが楽なんだろうな。
      </p>
      <p>
        このサイトも下のツールバーみたいなの消そうかな。まあいいか。
      </p>
      <p>
        インドの青鬼っていうビール、すごく美味しい。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021012701.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
