<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        最近、若い人っていうか新人っていうか、これからプログラマを職業にする人？にいろいろ教える感じの仕事が多いです。
      </p>
      <p>
        自分が若いときは割と素直に言うことを聞くタイプだったと思います。
        いやそうでもないかな？
        職種も仕事もいろいろだったし、よくわからないです。
        でも教えるのも教わるのも難しいっていうのはずっと同じですね。
      </p>
      <p>
        自分が教わっていて、あまりに理不尽っぽいときは、
      </p>
      <p>
        「おまえのできることが全部できるようになっても、おまえにしかなれねえじゃん。。。」
      </p>
      <p>
        って思ってやってきたので、みんなもそんな感じでお願いします。。。やさしく流す、って感じ？
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020080501.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
