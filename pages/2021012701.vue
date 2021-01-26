<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        スマホのSafariですこしスクロールしようとすると上下のツールバーが消えるの、
        画面の大きさが変わってしまうので、ちょっと対応必要なんですが地味に大変。
      </p>
      <p>
        スマホはそもそも画面の大きさが機種によって違うので、上下のスクロールは必ずできる、してしまう、
        というデザインにしていかないとってことだと思います。
      </p>
      <p>
        このサイトも下のツールバーみたいなの消そうかな。まあいいか。
      </p>
      <p>
        インドの青鬼っていうビール、すごく美味しいです。
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
      l: 0,
      nX: 0,
      nY: 0,
      rs: []
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

      this.l = Math.max(width, height) * 0.1
      console.log(this.l)

      this.p5.frameRate(30)
      this.lastColor = 255 - 255 / this.p5.random(5)

      this.nY = Math.ceil(this.p5.height / this.l)
      this.nX = Math.ceil(this.p5.width / this.l)

      this.rs = Array(this.nY * this.nX)
      for (let y = 0; y < this.nY; y++) {
        for (let x = 0; x < this.nX; x++) {
          this.rs[y * this.nX + x] = this.p5.random(this.l * 0.5)
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      this.p5.stroke(192)

      for (let y = 0; y < this.p5.height / this.l; y++) {
        for (let x = 0; x < this.p5.width / this.l; x++) {
          this.p5.rect(x * this.l,
                       y * this.l,
                       this.l,
                       this.l,
                       this.rs[this.nX * y + x])
          let r = this.rs[this.nX * y + x] + this.l * 0.5 / 30.0
          this.rs[this.nX * y + x] = r < this.l * 0.5 ? r : this.p5.random(this.l * 0.5)
        }
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
