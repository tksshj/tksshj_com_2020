<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        Dewar'sが1300円くらい、BEEFEATERが1000円くらい、EARLY TIMESが1600円くらい。
      </p>
      <p>
        Dewar'sはソーダ割り、BEEFEATERもソーダ割り、EARLY TIMESはストレート。
      </p>
      <p>
        ビンの音とか、キャップとか、液体の色とか。
      </p>
      <p>
        所有するという感覚は固体のイメージ、でも最近はデータっていうのも多いか。
        液体も所有しているという感覚はなくて、ビンにその感覚があるかも。
      </p>
      <p>
        所有できないけど持ってるものっていうのもあるな、友達とか。
      </p>
      <p>
        アニメーション、適当だけどまあまあ好き。
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
      squares: []
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

      let w = Math.max(width, height) * 0.1
      for (let y = 0; y < (height / w + 1); y++) {
        for (let x = 0; x < (width / w + 1); x++) {
          this.squares.push({
            x: w * x,
            y: w * y,
            w: w,
            borderWidth: this.p5.random(w),
            color: 255 - this.p5.random(64)
          })
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.strokeWeight(square.borderWidth)
        this.p5.stroke(square.color)
        this.p5.rect(square.x, square.y, square.w, square.w)

        square.borderWidth -= 2
        if (square.borderWidth <= 0) {
          square.borderWidth = this.p5.random(square.w)
        }
        square.color -= 1
        if (square.color <= 255 - 64) {
          square.color = 255 - this.p5.random(64)
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
