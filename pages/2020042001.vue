<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-content
      date="2020-04-20_01, animation, scroll"
      title="テキスト表示なんとかする？"
    >
      <p>
        当初ブログみたいな感じにしようと思ってたんですが、
        そもそも文字数が増えると画面をスクロールできないという問題があるので、
        いよいよ考えようかなと思っています。
        そんなに書きたいことあるんかな。
      </p>
      <p>
        下にスクロールすると回転するんだけどなんかやばい感じになってきましたね、、、
      </p>
    </tc-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TcContent from '../components/tc_content.vue'

export default {
  components: {
    'tc-content': TcContent
  },
  head: {
    title: 'テキスト表示なんとかする？ - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: []
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
    },
    position() {
      let h = window.innerHeight
      let y = window.scrollY
      return {
        page: Math.floor(y / h),
        progress: (y % h) / h
      }
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
      this.p5.createCanvas(width, height, this.p5.WEBGL)

      /* this.p5.frameRate(20) */

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 4 : parseInt(this.p5.windowWidth / 256)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles + 2; col++) {
          this.squares.push({
            x: tileWidth * (col - nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth,
            c: this.p5.random(32, 64)
          })
        }
      }
    },
    draw() {
      let position = this.position()
      this.p5.clear()
      this.p5.background(216)
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        /* square.x = square.x + this.p5.random(-10, 10)
         * square.y = square.y + this.p5.random(-10, 10) */
        let x = square.x + this.p5.random(-10, 10)
        let y = square.y + this.p5.random(-10, 10)

        this.p5.push()
        this.p5.translate(x, y)
        this.p5.rotate(Math.PI * position.progress)
        this.p5.translate(square.width * -0.5, square.width * -0.5)
        this.p5.square(0, 0, square.width)

        let c = square.c + this.p5.random(-10, 10)
        square.c = Math.max(32, Math.min(64, c))
        for (let j = 0; j < 5; j++) {
          this.p5.fill(255 - c * 1.0 / 5 * j)
          this.p5.square(square.width * 0.1 * j, square.width * 0.1 * j, square.width * (1.0 - 0.2 * j))
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
