<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        文章書くの難しい。
      </p>
      <p>
        他人が書いた文章を読んで引っかかるときが結構ある。内容じゃなくて語尾とか。
        じゃあ自分が書いた文章はどうなんだ？と思ってこのサイトを見返すと、かなり引っかかる。
      </p>
      <p>
        キャラ設定が定まっていないとかもあるけど、それ以前に文章が下手な感じがする。
        ダメなところはなんとなくわかるけど、上手く書けない。
      </p>
      <p>
        漢字の使い方、段落の分け方、改行の入れ方、そういう要素がかなりたくさんあって、
        文章って難しいなと思う。
      </p>
      <p>
        ある程度正しく伝わっているとすると、それ以上は絵とか音楽とか演奏とか、
        そういうのに似ていてゴールも正解もないような気がする。
      </p>
      <p>
        全部p5.jsにしようかなって書いた次の記事なのに、Three.jsを導入した。
        まだ<a href="https://www.oreilly.co.jp/books/9784873117706/">この本</a>の最初のコードのほぼコピペで、
        すこしずつ勉強していく、かもしれない。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021020701.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
