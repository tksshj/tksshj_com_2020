<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        Emacsについて2回め。アニメーションも同じだけどフレームレートを少し落とした。
      </p>
      <p>
        今使うエディタはVSCodeがいいんだろうと思う。PlatformIOとかもVSCodeのプラグイン？で開発環境を提供していたり、便利そう。
      </p>
      <p>
        いつかEmacsから他のエディタに移行する日がやってくるのかもしれない。
      </p>
      <p>
        Emacsに不満があるとしたら自分に原因があるんだろうな、っていう感覚があるのでまだしばらく使い続けるだろうとは思う。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020080201.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
