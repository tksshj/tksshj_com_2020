<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        東京が好きみたいな自覚がここ数年強くなっていて、なんか自分的には意外というか、そうなるのか結局みたいな感じがする。
      </p>
      <p>
        北海道から出てきたけど、東京そのものには憧れとかもなかったし、狭いところとか汚い部分とか嫌いだったのに。
      </p>
      <p>
        過ごした時間の長さの影響がでかいのか？？？
      </p>
      <p>
        あと東京が好きって言う人が結構いたので、その人の東京みたいなものを聞いて、なんか心の奥底で熟成された？みたいなのかも。
      </p>
      <p>
        東京好き。
      </p>
      <p>
        アニメーションはすごい適当。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021020301.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
