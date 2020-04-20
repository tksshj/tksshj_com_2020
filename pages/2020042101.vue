<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="ノイズ？ハイハット？"
      description="2020-04-21_01, animation"
    >
      <p>
        無事iPhoneでも音がでたので、次はバスドラかハイハットの音を出してえなァ！
        シンセ全然わからないんですが、とりあえずノイズっていうやつでなんかできたように聞こえるんだけどどうなんでしょうか、、、
      </p>
      <div class="tc-play-button-row">
        <div @click="play" class="tc-play-button">ハイハット？</div>
      </div>
      <p>
        関係なくもないけどボタンのデザイン気に入らないです。
        アニメーションはなんかほんとに適当にソースいじってたらできたので説明する能力を持たない。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TWEEN from '@tweenjs/tween.js'
import * as Tone from "tone";
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'ノイズ？ハイハット？ - tksshj.com'
  },
  data() {
    return {
      nPages: 3,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      y: 0,
      forward: true,
      toneStated: false
    }
  },
  methods: {
    play() {
      if (!this.toneStated) {
        Tone.start()
      }
      let noise = new Tone.NoiseSynth().toMaster()
      noise.triggerAttackRelease('8n')
    },
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

      /* this.p5.frameRate(10) */

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
            scale: 1.0,
            scaleRatio: this.p5.random(-0.1, 0.1)
          })
        }
      }
    },
    draw() {
      TWEEN.update()

      /* let changeScaleRatio = (this.p5.frameCount % 20 == 0) */

      let position = this.position()
      this.p5.clear()
      this.p5.background(216)
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]

        square.scale = square.scale + square.scaleRatio
        if (square.scale < 0.1) {
          square.scaleRatio = this.p5.random(0.01, 0.1)
        } else if (1.0 < square.scale) {
          square.scaleRatio = this.p5.random(-0.1, -0.01)
        }

        this.p5.push()
        this.p5.stroke(216)
        this.p5.translate(square.x, square.y)

        this.p5.push()
        this.p5.rotate(square.scale)


        this.p5.fill(255)
        this.p5.translate(square.width * -0.5, square.width * -0.5)
        this.p5.square(0, 0, square.width)

        this.p5.scale(square.scale)
        this.p5.translate(square.width * -0.5, square.width * -0.5)
        this.p5.fill(216)
        this.p5.square(0, 0, square.width)
        this.p5.pop()

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
