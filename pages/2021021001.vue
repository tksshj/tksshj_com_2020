<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        線香めっちゃ好き。
      </p>
      <p>
        ずーっと前から好きな認識はあったんだけど、香りが残るのがいいのか悪いのか気分によるので、今まで避けてた。
      </p>
      <p>
        <a href="https://hibi-jp.com/concept.php">hibiっていうマッチ付きの線香</a>を発見して、ついに購入した。
        まだ数回しか使ってないけど、とてもよい。
      </p>
      <p>
        アニメーション、3Dだと座標はもちろん、カメラとかライトとか勉強することが多すぎて、全然うまくいかない。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021021001.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
