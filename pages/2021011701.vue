<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        最近、若い人っていうか新人っていうか、これからプログラマを職業にする人にいろいろ教える機会が多くて、まあ教えています。
      </p>
      <p>
        自分が若いときは割と素直に言うことを聞くタイプだったと思います。
        職種も仕事もいろいろだったし、役に立っています。
        でも教えるのも教わるのも難しいのでそういう時は、
      </p>
      <p>
        「おまえのできることが全部できるようになっても、おまえにしかなれねえじゃん。。。」
      </p>
      <p>
        って思ってやってきたので、みんなもそんな感じで適当に流してほしいです。
        むしろ教えている側に優しい気持ちでお願いします。。。
        まあそれは都合が良すぎるか、ごめんなさい。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021011701.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
