<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
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
        console.log(y)
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
        this.p5.push()

        let square = this.squares[i]
        this.p5.strokeWeight(square.borderWidth)
        this.p5.stroke(square.color)
        this.p5.translate(square.x, square.y)
        this.p5.rotate(i)
        this.p5.rect(0, 0, square.w, square.w)
        square.borderWidth -= 2
        if (square.borderWidth <= 0) {
          square.borderWidth = this.p5.random(square.w)
        }
        square.color -= 1
        if (square.color <= 255 - 64) {
          square.color = 255 - this.p5.random(64)
        }

        this.p5.pop()
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
