<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        これをやったらうまくいく、わかっていてもできない。
      </p>
      <p>
        やればできるけどやらない。
      </p>
      <p>
        人間、個体差はあるけど努力で埋められるくらいの差でけっこういろいろ変わってくる、それもわかっている。
      </p>
      <p>
        でも、できない。
      </p>
      <p>
        チートはあるけど、そんなに大きくない気がする。
      </p>
      <p>
        でも素直に努力しない。なんでだろ。
      </p>
      <p>
        アニメーション、すこし角度つけただけでめっちゃ好きな感じになった。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021013102.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
