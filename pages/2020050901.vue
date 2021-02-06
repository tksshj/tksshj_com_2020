<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        ジンビームがなくなって、今回はアーリータイムズにしたんですけど、アーリータイムズのほうが好きかもしれないですね。
        味とか香りとか、そいうので違いがあると思いたいところですが、キャップが金属じゃないから好きって部分はある気がしますね。。。
      </p>
      <p>
        <a href="https://p5js.org/libraries/">p5.jsのLibraries</a>をみると、p5.soundっていうのがありますね。
        なんとなくtone.jsに似てると思ったら一部依存関係ありってことで、同期の部分は同じっぽいですね。
        他の部分も似てるっぽいのは、そもそもWeb Audioがそういうものっていうのもありそうです。
        同期のところだけすこしソース見てみたほうが良さそうですね。
      </p>
      <p>
        あとp5.createloopっていうのもあって、gifファイル出力できるっぽいのもありました。
        使ってみたんですがcreateloopっていうループを作るライブラリ経由で、gif.jsというのでgifを書き出していて、
        ループはいらないので、gif.jsを使ってみるかな？というところでした。
        あれ？gif.jsこれは仕事にも使えてしまうのでは、、、
        スマホだとダウンロードできないっぽいかな？いや仕事の時間にやろ。
      </p>
      <p>
        で、アーリータイムズで頭が回らず寝てしまったのでアニメーションはサークルにしただけ、かな？
        一番上がちょっと切れてますね、まあいいか。
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
