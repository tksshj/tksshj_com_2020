<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="やっすいワイン、音楽つけたい"
      description="2020-04-20_03, animation"
    >
      <p>
        今日はやっすいワインです。最近ワイン飲む側の人間になりました。
        こういう図形を動かしたりするのを、リズムに合わせてやりたくなってきたので、
        いろいろ調べています。
      </p>
      <p>
        前の2つをあわせて自動運転です。結局長い文章書かねえんですわ。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TWEEN from '@tweenjs/tween.js'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'やっすいワイン、音楽つけたい - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      y: 0,
      forward: true,
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
      this.setTween(0, false)
    },
    setTween(startY, inc) {
      const coords = { y: 0 }
      this.tween = new TWEEN.Tween(coords)
                            .to({ y: this.height }, 10 * 1000)
                            .easing(TWEEN.Easing.Sinusoidal.InOut)
                            .onUpdate(() => {
                              if (inc) {
                                this.y = coords.y
                              } else {
                                this.y = this.height - coords.y
                              }
                            })
                            .onComplete(() => {
                              this.forward = inc
                              this.setTween(coords.y, !inc)
                            })
                            .start()
    },
    position() {
      let h = window.innerHeight
      let y = this.y
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
      TWEEN.update()

      let position = this.position()
      this.p5.clear()
      this.p5.background(216)
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        /* square.x = square.x + this.p5.random(-10, 10)
         * square.y = square.y + this.p5.random(-10, 10) */
        let x = square.x + (this.forward ? 0 : this.p5.random(-10, 10))
        let y = square.y + (this.forward ? 0 : this.p5.random(-10, 10))

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
