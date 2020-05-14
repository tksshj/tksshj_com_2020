<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        最近やっとYouTubeが面白いことに気が付きました。
        なんでだろう、いままで受け付けられない感じだったんですが。
        自宅作業でYouTube面白くなったらやばそうですね。やばいです。
      </p>
      <p>
        アニメーションいよいよ飽きてきましたね。
        WebGLモードだと角丸が効かないっぽいです。
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
      nPages: 4,
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
                            .easing(TWEEN.Easing.Linear.None)
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
      this.p5.createCanvas(width, height) //, this.p5.WEBGL)

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      this.nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256)
      this.tileWidth = this.p5.windowWidth / this.nHorizontalTiles
      this.nHorizontalTiles = this.nHorizontalTiles + 2
      this.nVerticalTiles = parseInt(this.p5.windowHeight / this.tileWidth) + 4

      this.p5.frameRate(20)
      this.p5.rectMode(this.p5.CENTER)

    },
    translateTile(page, progress, row, col) {
      this.p5.translate(this.tileWidth * (col - 1), this.tileWidth * (row - 2))
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
      return 255 - ((pos + page) % 4) * 8
    },
    draw() {
      TWEEN.update()
      let position = this.position()
      let page = position.page
      let progress = position.progress


      /* this.p5.clear() */
      /* this.p5.noStroke() */
      this.p5.stroke(216)

      /* this.p5.rotate(Math.PI * (page + progress) * 0.05) */
      for (let row = 0; row < this.nVerticalTiles; row++) {
        for (let col = 0; col < this.nHorizontalTiles; col++) {
          this.p5.push()
          this.p5.rectMode(this.p5.CENTER)
          /* this.p5.translate(this.p5.windowWidth * -0.5, this.p5.windowHeight * -0.5) */
          this.translateTile(page, progress, row, col)
          /* this.p5.rotate(Math.PI * (page + progress)) */

          let w = this.tileWidth
          /* if ((row + col) % 2 == 0) { */
            w = this.tileWidth * (progress > 0.5 ? progress : (1.0 - progress))
          /* } */

          this.p5.fill(this.fillColor(page, row, col))
          this.p5.square(0, //this.tileWidth * this.p5.random(0.95, 1.05),
                         0, //this.tileWidth * this.p5.random(0.95, 1.05),
                         w,
                         w,
                         this.tileWidth * (page % 2 == 0 ? progress : 1.0 - progress))

          /* this.tileWidth * progress) */
          this.p5.pop()
        }
      }

      this.p5.square(30, 20, 55, 20, 15, 10, 5);
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
