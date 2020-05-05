<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        「テキストを隠す」を「Play」にするなんてハイセンスね！
      </p>
      <p>
        スクロールからアニメーションに変更しただけです。Playボタンだけどこの画面は音楽ないし意味がほとんどないですね。
        Pauseしないし。いやPlayもしないか、笑。
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
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      tileWidth: 0,
      nHorizontalTiles: 0,
      nVerticalTiles: 0,
      y: 0
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
      this.setTween(0, true)
    },
    setTween(startY, inc) {
      let coords = { y: 0 }
      this.tween = new TWEEN.Tween(coords)
                            .to({ y: this.height }, 10 * 1000)
                            .easing(TWEEN.Easing.Sinusoidal.InOut)
                            .onUpdate(() => {
                              if (inc) {
                                this.y = startY + coords.y
                              } else {
                                this.y = startY - coords.y
                              }
                            })
                            .onComplete(() => {
                              if (inc) {
                                this.setTween(startY + coords.y, !inc)
                              } else {
                                this.setTween(startY - coords.y, !inc)
                              }
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
      this.nHorizontalTiles = isPortrait ? 5 : parseInt(this.p5.windowWidth / 192)
      this.tileWidth = this.p5.windowWidth / this.nHorizontalTiles
      this.nHorizontalTiles = this.nHorizontalTiles + 2
      this.nVerticalTiles = parseInt(this.p5.windowHeight / this.tileWidth) + 4
    },
    translateTile(page, progress, row, col) {
      this.p5.translate(this.tileWidth * col, this.tileWidth * row)
      if (row % 2 == page % 2) {
        if (col % 2 == page % 2) {
          this.p5.translate(this.tileWidth * progress, 0)
        } else {
          this.p5.translate(0, this.tileWidth * progress)
        }
      } else {
        if (col % 2 == page % 2) {
          this.p5.translate(0, this.tileWidth * progress * -1.0)
        } else {
          this.p5.translate(this.tileWidth * progress * -1.0, 0)
        }
      }
    },
    fillColor(page, row, col) {
      let pos = 0
      if (row % 2 == 0 && col % 2 == 0) {
        pos = 0
      } else if (row % 2 == 0 && col % 2 == 1) {
        pos = 3
      } else if (row % 2 == 1 && col % 2 == 0) {
        pos = 1
      } else {
        pos = 2
      }
      return 255 - ((pos + page * 3) % 4) * 8
    },
    draw() {
      TWEEN.update()
      let position = this.position()
      let page = position.page
      let progress = position.progress

      this.p5.stroke(216)
      for (let row = 0; row < this.nVerticalTiles; row++) {
        for (let col = 0; col < this.nHorizontalTiles; col++) {
          this.p5.push()
          this.p5.translate(this.p5.windowWidth * -0.5, this.p5.windowHeight * -0.5)
          this.translateTile(page, progress, row, col)
          this.p5.rotate(Math.PI * progress * (page % 2 == 0 ? 1.0 : -1.0))
          this.p5.fill(this.fillColor(page, row, col))
          this.p5.square(0, 0, this.tileWidth * (progress < 0.5 ? 1.0 - progress : progress))
          this.p5.pop()
        }
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
    if (this.player) {
      this.player.stop()
    }
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
.tc-animation-description {
  margin: 24px 0 0;
}
</style>
