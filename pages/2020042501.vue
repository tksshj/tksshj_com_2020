<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      ref="tcPageContent"
      title="スピーカーほしいけど"
      description="2020-04-23_02, animation"
    >
      <p>
        前回リズムと画面を同期させてみて、やっぱ最初から思ったに通りに行かないよなーと思いました。
        その後テクノを聞くと、キックとかハイハットの音、すっっっっごい良い音なんですよね。
        ちょっといいスピーカーを検討したくなりました。ああここ数年ずっと検討してるやつですね。
        買い物がなんか億劫というか怖いというかなんですかねこれは。
      </p>
      <p>
        アニメーションはまえの縦スクロールのスロットみたいなやつを横にしてみました。
        あとちょっと斜め。
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
      nHorizontalTiles: 0,
      rows: [],
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
      let nHorizontalTiles = isPortrait ? 5 : parseInt(this.p5.windowWidth / 192) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      this.nHorizontalTiles = nHorizontalTiles + 4

      for (let row = 0; row < nVerticalTiles + 1; row++) {
        for (let col = -1; col < this.nHorizontalTiles; col++) {
          this.squares.push({
            row: row,
            col: col,
            x: tileWidth * (col - this.nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth,
            initialCol: col
          })
        }
      }
      for (let row = 0; row < nVerticalTiles + 1; row++) {
        this.rows.push({
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

      this.p5.rotate(Math.PI * 0.05)
      this.p5.translate(this.squares[0].width * - 0.25, this.squares[0].width * -0.25)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()

        let speed = this.rows[square.row].speed
        let x = square.col * square.width + square.width * (position.progress + position.page) * speed - this.p5.windowWidth * 0.5
        if (x < -1.0 * this.p5.windowWidth * 0.5 - square.width) {
          square.col = square.col + this.nHorizontalTiles
        }
        if (this.p5.windowWidth * 0.5 + square.width < x) {
          square.col = square.col - this.nHorizontalTiles
        }

        this.p5.translate(x, square.y - square.width)
        this.p5.fill(255 - square.initialCol * 8)
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
