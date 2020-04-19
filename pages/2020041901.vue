<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-content
      date="2020-04-19_01, animation"
      title="ハンドソープ、LOHACO"
    >
      <p>
        ハンドソープが上北沢からなくなっていて、
        LOHACOで購入したものが届きました。
        トイレットペーパーもティッシュもまだ売ってないことが多いので、
        この先LOHACOをよく使うようになるかもしれないですね。
        次はウェットティッシュが必要になりそうなんですが、面倒な感じになりましたね。
      </p>
      <p>
        アニメーションは<a href="./2020041801">これ</a>を運転しています。運転。
        30秒に1回ピタッとなる予定だったんですが、やっぱ小数で計算してるとずれていきますね。
      </p>
    </tc-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TWEEN from '@tweenjs/tween.js'
import TcContent from '../components/tc_content.vue'

export default {
  components: {
    'tc-content': TcContent
  },
  head: {
    title: 'ハンドソープ、LOHACO - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      y: 0
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
                            .to({ y: this.height }, 30 * 1000)
                            .easing(TWEEN.Easing.Sinusoidal.InOut)
                            .onUpdate(() => {
                              if (inc) {
                                this.y = coords.y
                              } else {
                                this.y = this.height - coords.y
                              }
                            })
                            .onComplete(() => {
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

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles + 2; col++) {
          this.squares.push({
            x: tileWidth * (col - nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth,
            angle: parseInt(this.p5.random(5, 30)) / (this.nPages - 1)
          })
        }
      }
    },
    draw() {
      TWEEN.update()
      let position = this.position()
      /* this.p5.clear()
       * this.p5.background(216) */
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]

        let r = square.angle * Math.PI * 2.0 * (position.progress + position.page)

        this.p5.push()
        this.p5.translate(square.x, square.y)
        this.p5.rotate(r)
        this.p5.translate(square.width * -0.5, square.width * -0.5)
        this.p5.square(0, 0, square.width)
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
a {
  text-decoration: underline;
}
</style>
