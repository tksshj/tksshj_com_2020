<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        ジンビームがなくなって、今回はアーリータイムズにした。アーリータイムズのほうが好きかも。
        味とか香りとか、そいうので違いがあると思いたいところだけど、キャップが金属じゃないから好きって部分はある多分。
      </p>
      <p>
        <a href="https://p5js.org/libraries/">p5.jsのLibraries</a>をみると、p5.soundっていうのがある。
        なんとなくtone.jsに似てると思ったら一部依存関係ありってことで、同期の部分は同じっぽい。
      </p>
      <p>
        あとp5.createloopっていうのもあって、gifファイル出力できるっぽいのもある。
        createloopっていうループを作るライブラリ経由で、gif.jsというのでgifを書き出していて、
        あれ？gif.jsこれは仕事にも使えてしまうのでは、、、と思った。仕事の時間にやろ。
      </p>
      <p>
        で、アーリータイムズで頭が回らず寝てしまったのでアニメーションはサークルにしただけ、かな？
        一番上がちょっと切れてるかも。まあいいか。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020050901.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
