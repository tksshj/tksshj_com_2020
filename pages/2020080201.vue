<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        Emacsについて2回めですね、アニメーションも同じなんですけどフレームレートを少し落としています。
      </p>
      <p>
        今は最初に使うエディタはVSCodeですかね。PlatformIOとかもVSCodeのプラグイン？で開発環境を提供していたり、便利ですね。
        僕も最近は新人とかにVSCodeをおすすめしています。僕はちゃんと使ったことないんですが。
      </p>
      <p>
        いつか僕もEmacsから他のエディタに移行する日がやってくるのかもしれないですね。
        VSCodeで作業してください、みたいな仕事は今のところなさそうだけどな。来るかな。
      </p>
      <p>
        Emacsに不満があるとしたら自分に原因があるんだろうな、っていう感覚があるのでまだしばらく使い続けそうです。
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
