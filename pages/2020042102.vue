<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="ミニマルテクノ"
      description="2020-04-21_02, animation"
    >
      <p>
        最近Spotifyのミニマルテクノのプレイリストをかけて仕事しています。
        自分のなかで年に数回ブームが来ます。アーティストが誰かとか、なにも詳しくなっていかないです。
      </p>
      <p>
        それで規則正しい、カクカクした動きにしようと思ったんですが、なんかいまいち好きな感じになりませんでした。。。
        んー色かな？回転の軸の気もする。カクカク、リトライしよ。
      </p>
      <p>
        音やりたいけど今日はもう時間がなさそう。
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
    title: 'ミニマルテクノ - tksshj.com'
  },
  data() {
    return {
      nPages: 3,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      y: 0,
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
                            .easing(TWEEN.Easing.Linear.None) //Sinusoidal.InOut)
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
            direction: parseInt(this.p5.random(0, 3))
          })
        }
      }
    },
    draw() {
      TWEEN.update()

      /* let changeScaleRatio = (this.p5.frameCount % 20 == 0) */

      let position = this.position()
      let pos = parseInt(position.progress * 15.0)
      /* this.p5.clear() */
      /* this.p5.background(216) */
      this.p5.stroke(192)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()
        this.p5.translate(square.x, square.y)

        /* this.p5.fill(216) */

        let move = square.width / 15.0 * pos


        this.p5.rotate(move)

        switch (i) {// square.direction) {
          case 0:
            this.p5.translate(move, move)
            break
          case 1:
            this.p5.translate(move, 0)
            break
          case 2:
            this.p5.translate(0,  move)
            break
          case 3:
            this.p5.translate(-move, 0)
            break
        }

        this.p5.fill(255 - (i % 7) * 8)
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
