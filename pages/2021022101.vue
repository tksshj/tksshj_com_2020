<template>
  <tc-page :alpha="0.9">
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        深夜徘徊する。めっちゃする。夜が好きで、歩くのが好き。
      </p>
      <p>
        東京、いつどこを歩いても、誰ともすれ違わないってことはあまりない。
        深夜だったら数は少ないけど、電話している人、タバコ吸ってる人、帰宅途中なのか歩いている人、結構いろんな人がいる。
      </p>
      <p>
        日曜日の深夜1時から3時くらいの時間、東京でも誰ともすれ違わずに歩ける時間。
        その時間に深夜徘徊するのが好き。毎週日曜深夜、東京・世田谷を徘徊する。
      </p>
      <p>
        自粛期間になって、その時間じゃなくても誰もいないことが増えた。
        平日の23時くらいでも、もうクルマも走ってないこともある。世田谷。
        飲食店が20時っていう制限のせいで、ほんとに夜から人がいなくなった。
      </p>
      <p>
        誰もいない深夜の東京は好きだけど、この状況でそうなっていてもあんまりって感じ。ないものねだりなのかもしれない。
      </p>
      <p>
        アニメーションは適当、Three.jsのMatrixなんかapplyしていく感じじゃないっぽくて慣れないかも。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021022101.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
