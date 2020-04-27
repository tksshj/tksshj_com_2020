<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        今日は<a href="https://happyhackingkb.com/jp/">HHKBというキーボード</a>を使ってます。
        ハッピーハッキングキーボードっていう名前でHHKBなんですけど、あんまりハッピーな感じしない、いや全然しない。
        ハッキングはハッピーじゃないからそういうネーミングだろう感がすごい。しらんけど。個人的に。
      </p>
      <p>
        下にスクロールすると移動するパターンで、中心がずれていくっていうのがやりたくて、
        イメージ通りなんですけど地味ですね。
        いや、なんかちがうかも。。。
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
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
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
          })
        }
      }
    },
    draw() {
      let position = this.position()
      let move = this.squares[0].width * position.progress
      let width = position.progress < 0.5 ? this.squares[0].width - move : move

      this.p5.stroke(216)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()



        let c = square.col

        if (square.row % 2 == 0) {
          if (square.col % 2 == position.page % 2) {
            this.p5.translate(square.x + move, square.y)
            c = c - position.page
          } else {
            this.p5.translate(square.x, square.y + move)
          }
        } else {
          if (square.col % 2 == position.page % 2) {
            this.p5.translate(square.x, square.y - move)
          } else {
            this.p5.translate(square.x - move, square.y)
            c = c + position.page
          }
        }


        this.p5.fill(255 - (c % 4) * 8)
        this.p5.square(0, 0, width)
        this.p5.pop()
      }
    },
    windowResized() {
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
a {
  text-decoration: underline;
}
</style>
