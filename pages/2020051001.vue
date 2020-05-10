<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        今日は仕事を全くしないという日にして過ごしました。趣味も仕事もあんまり境目がないので久しぶりです。
      </p>
      <p>
        それでYouTubeで音楽つくるとかガジェットとかの動画を見てたんですけど、すごい。
        Ableton PushとかOP-1とか新しいものじゃないと思うんですけど、自分にとってはすごい新しくて、そしてカッコいいですね。
      </p>
      <p>
        欲しいとか触ってみたいとかの気持ちすごいあるので、購入考えようかな？
        安くないのと音楽そんなにやらないというのが引っかかりますね。んー。
      </p>
      <p class="tc-animation-description">
        五角形を書いてみたくて書いたんですけど、結構時間かかったけどなんか好きな感じじゃなかったです。
        p5.jsでできることはまだまだたくさんあるけど、やってみたいことは、あと図形が移動していくパターンをいくつかってところかな？
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
                            .to({ y: this.height }, 30 * 1000)
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
      this.p5.createCanvas(width, height, this.p5.WEBGL)

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      this.nHorizontalTiles = isPortrait ? 2 : parseInt(this.p5.windowWidth / 256)
      this.tileWidth = this.p5.windowWidth / this.nHorizontalTiles
      this.nHorizontalTiles = this.nHorizontalTiles + 2
      this.nVerticalTiles = parseInt(this.p5.windowHeight / this.tileWidth) + 4

    },
    translateTile(page, progress, row, col) {
      this.p5.translate(this.tileWidth * col, this.tileWidth * (row - 1.0))
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
    draw() {
      TWEEN.update()
      let position = this.position()
      let page = position.page
      let progress = position.progress

      /* this.p5.clear() */

      if (page % 2 == 0) {
        this.p5.background(216 + 48 * progress)
        this.p5.fill(255 - 48 * progress)
        this.p5.stroke(255 - 48 * progress)
      } else {
        this.p5.background(255 - 48 * progress)
        this.p5.fill(216 + 48 * progress)
        this.p5.stroke(216 + 48 * progress)
      }

      for (let row = 0; row < this.nVerticalTiles; row++) {
        for (let col = 0; col < this.nHorizontalTiles; col++) {

          this.p5.push()
          this.p5.translate(this.p5.windowWidth * -0.5, this.p5.windowHeight * -0.5)
          /* this.p5.translate(this.tileWidth * col, this.tileWidth * row) */
          this.translateTile(page, progress, row, col)

          this.p5.rotate(Math.PI * (page + progress))

          this.p5.beginShape()

          let x = 0
          let y = -this.tileWidth * 0.5 * 1.05

          for (let i = 0; i < 6; i++) {
            let a = (Math.PI * 2.0 / 5.0) * i
            let ax = x * Math.cos(a) - y * Math.sin(a)
            let ay = x * Math.sin(a) + y * Math.cos(a)
            this.p5.vertex(ax, ay)
          }

          this.p5.endShape()

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
