<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      ref="tcPageContent"
      title="のり弁"
      description="2020-04-23_02, animation"
    >
      <p>
        のり弁、ここ3日ほど食べてます。なんだろう、この適度な揚げ物がいいのだろうか。
        のり弁なんて買ったことなかったんですけど、ありですよこれは。
        ってそんなこと言わなくても当たり前か、笑。
      </p>
      <p>
        次でスロットを止めるっていうのもやる？か？と思ったけどどうするか。
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
    title: 'のり弁 - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      nVerticalTiles: 0,
      cols: [],
      y: 0,
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
                            .to({ y: this.height }, 20 * 1000)
                            .easing(TWEEN.Easing.Bounce.InOut)
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
        y: y,
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
      let nHorizontalTiles = isPortrait ? 4 : parseInt(this.p5.windowWidth /192) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      this.nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2

      for (let row = 0; row < this.nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles; col++) {
          this.squares.push({
            row: row,
            col: col,
            x: tileWidth * (col - nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth
          })
        }
      }
      for (let col = 0; col < nHorizontalTiles + 1; col++) {
        this.cols.push({
          speed: this.p5.random(1.0, 10.0)
        })
      }

      if (!isPortrait) {
        this.setTween(0, false)
        this.playing = true
      }
    },
    draw() {
      TWEEN.update()
      let position = this.position()
      this.p5.stroke(192)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()

        let w = square.width
        let y = w * square.row - this.p5.windowHeight * 0.5 + w * (position.page + position.progress) * this.cols[square.col].speed
        if (y < -1.0 * window.innerHeight * 0.5 - w) {
          square.row = square.row + this.nVerticalTiles
        }
        if (window.innerHeight * 0.5 < y) {
          square.row = square.row - this.nVerticalTiles
        }

        this.p5.translate(square.x, y)
        this.p5.fill(255 - Math.abs(square.row % this.nVerticalTiles) * 8 - square.col * 8)
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
.tc-play-button-row {
  padding: 8px 0 32px;
  display: flex;
  justify-content: center;
  .tc-play-button {
    width: 97.5%;
    padding: 4px 16px;
    text-align: center;
    border: solid 1px #5F5F7F;
  }
}
</style>
