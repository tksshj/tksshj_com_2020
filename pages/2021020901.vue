<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        作業開始するまでに時間がかかる。
        作業を開始しても集中力が持たないので、すぐに中断してしまう。
      </p>
      <p>
        原因はなんとなくわかっていて、まあ飽きた。
        あとは意味みたいなものを感じる力が鈍くなってきているというか、目標がそこにないというか、
        いろんなものを手にしてしまったつもりだからなんだろうと思う。
      </p>
      <p>
        それなりに苦労してプログラム書いても、みんなもう驚かないし。
        期待値キープするのも大変なんだけど、できて当然でもあるか。
      </p>
      <p>
        このサイト、すこしずつ更新してる。完全に誰にも何も言われない作業で、やる必要もない。
        でもだからこそ自分のためにやっているモノという位置づけになる。
        プログラムを書くけど仕事じゃない。ここめっちゃ大事。
      </p>
      <p>
        10分だけちょっと仕事じゃないことする、途中で終わってもいいし、とりあえずなんか書こ、みたいな。
      </p>
      <p>
        最近はその感情を利用して、ベッドから立ち上がってデスクに向かうところまで行っている。すげえな。えらいな。
      </p>
      <p>
        アニメーション、3Dだと影とかがあって、好きな感じの色にするの難しすぎる。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021020901.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
