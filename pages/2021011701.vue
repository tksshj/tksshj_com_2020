<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        最近、若い人っていうか新人っていうか、これからプログラマを職業にする人？にいろいろ教える感じの仕事が多い。
      </p>
      <p>
        教えるのも教わるのも難しいっていうのはずっと思う。
      </p>
      <p>
        教わる側だったときも何でもすぐできるタイプじゃなかったし、
        教える側になっても間違ってしまうときが結構多い。
      </p>
      <p>
        自分が教わる側でいろんなことができなかったりしたとき、
      </p>
      <p>
        「おまえのできることが全部できるようになっても、おまえにしかなれねえじゃん。。。」
      </p>
      <p>
        って思ってやってきたので、今自分に教わっている人はそういう感じでお願いします。。。
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
