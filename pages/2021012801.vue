<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        線を引いてみたらこんな感じになりました、アニメーション。
      </p>
      <p>
        自分らしくみたいなことが歌詞とかにめっちゃ出てくるんですけど、
        自分自身の定義？がわかってる人いるんだろうか。
        らしさって最初っから決まってなくて、それまでの行動に似ているみたいなことだと思うんですけど、
        そうすると人生の後半じゃないと自分らしくってできないと思うんですけど、どうなんでしょうか。
      </p>
      <p>
        こういうのまえも書いたっけな、まあいいか。
      </p>
      <p>
        ジン、Beefeater、いつもソーダで割ってるんですけど、サミットにトニックウォーターが売ってたので、
        今日はジントニックにしました。やっぱ甘い。リッキーがいいけどライムはちょっと準備できない気がする。
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
      points: []
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
      this.p5.frameRate(20)
      this.points.push({x: width * 0.5, y: height * 0.5, c: 200})
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      let wh = Math.max(this.p5.width, this.p5.height)
      this.p5.strokeWeight(wh * 0.1)

      if (256 < this.points.length) {
        this.points = [{x: this.p5.width * 0.5, y: this.p5.height * 0.5, c: 200}]
      }
      let lastPoint = this.points[this.points.length - 1]
      let x = Math.min(this.p5.width,
                       Math.max(0,
                                lastPoint.x + this.p5.random(this.p5.width * 0.2) * (this.p5.random(100) < 50 ? 1 : -1)))
      let y = Math.min(this.p5.height,
                       Math.max(0,
                                lastPoint.y + this.p5.random(this.p5.height * 0.2) * (this.p5.random(100) < 50 ? 1 : -1)))
      let c = 128 + this.p5.random(255 - 128)
      this.points.push({ x: x, y: y, c: c})

      for (let i = 0; i < this.points.length - 1; i++) {
        let p1 = this.points[i]
        let p2 = this.points[i + 1]
        this.p5.stroke(p1.c)
        this.p5.line(p1.x, p1.y, p2.x, p2.y)
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
