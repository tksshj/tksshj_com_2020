<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        久しぶりにp5.jsでなにか書こうと思ったら全然書けないですね。
        目的なく書き始めてるから当たり前なのかも。
      </p>
      <p>
        いろんなものが間に合わない、ゆっくりやりたいけど、もう人生全部これ。
        自分で手を動かしてないとなんかっていう貧乏性なんですかこれは。
      </p>
      <p>
        でも例えばこれだって、p5.js使ってできるよね、って思うことは簡単だけど、
        実際やってみないと満足できない。
        やればできると思ってる自分はなんかカッコ悪い気がしてしまう。
      </p>
      <p>
        なんかYouTubeの広告とかによくある、XXX会社が成功した秘密ご存知ですか！？みたいなの。
        あれに感じる、じゃあどうしてお前はやってねえんだ感。
        あんな気持ちが自分に出てしまう。
      </p>
      <p>
        あれこんなん書いてないで仕事しないと、すみません！いまからやります！
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      p5App: null,
      p5: null,
      lastColor: 0
    }
  },
  methods: {
    setupPage() {
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
    },
    sketch(p5) {
      this.p5 = p5
      this.p5.setup = this.setup
      this.p5.draw = this.draw
      this.p5.windowResized = this.windowResized
    },
    setup() {
      let width = window.innerWidth
      let height = window.innerHeight
      this.p5.createCanvas(width, height)
      this.p5.frameRate(3)
      this.lastColor = 255 - 255 / this.p5.random(5)
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      this.p5.stroke(192)

      let color = 255
      let radius = this.p5.random(100)
      for (let i = 0; i < 10; i++) {
        this.p5.fill(255 - 10 * i * this.p5.random(10) * 0.1)

        this.p5.translate(this.p5.width * 0.5, this.p5.height * 0.5)
        this.p5.rotate(this.p5.PI * 0.1 / this.p5.random(100) * i)
        this.p5.translate(-this.p5.width * 0.5, -this.p5.height * 0.5)

        this.p5.rect(this.p5.width * 0.05 * i,
                     this.p5.height * 0.05 * i,
                     this.p5.width * (1.0 - 0.1 * i),
                     this.p5.height * (1.0 - 0.1 * i),
                     radius)

      }

    },
    windowResized() {
      console.log('resized')
      this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
    }
  },
  mounted() {
    this.setupPage()
  },
  beforeDestroy() {
    this.p5.remove()
  }
}
</script>

<style scoped lang="scss">
.tc-scroller {
  width: 100vw;
}
.tc-canvas-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
