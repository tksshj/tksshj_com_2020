<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="チャット"
      description="2020-04-22_01, animation, text"
    >
      <p>
        仕事もプライベートもいろんなやりとりをチャットでやるようになってきて、
        相手の声とか表情、態度から得ていた情報がなくなって、
        内容も用件だけが中心になって、
        これからはこういう関係がより多くなっていくのかなと思ったりします。
      </p>
      <p>
        なんとなく直接会うより関係が浅いように感じていたんですが、
        考えるとすでにケータイメールの時から、
        絵文字やスタンプ、応答速度とか、もちろん言葉使いも文章もそうですが、
        そういうのが新しく付加される情報として充分に機能していますね。
      </p>
      <p>
        そして相手がどう考えているかなんて今までもわかってなかったです！
        わかってたのは自分の考えと、自分の解釈だけでした。
      </p>
      <p>
        だからきっとこれからも、今までにあったような誰かへの気遣いや心配り、
        ちょっとした態度で元気になれたりとか、そういったものは残りそうです。
      </p>
      <p>
        よかった。
      </p>
      <p class="tc-animation-description">
        アニメーションは再生タイミングをちょっと変えてみました。
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
    title: 'チャット - tksshj.com'
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
                            .to({ y: this.height }, 10 * 1000)
                            .easing(TWEEN.Easing.Bounce.InOut) // Sinusoidal.InOut)
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
      let nHorizontalTiles = isPortrait ? 5 : parseInt(this.p5.windowWidth / 128)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles + 2; col++) {
          this.squares.push({
            row: row,
            col: col,
            x: tileWidth * (col - nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth
          })
        }
      }
    },
    draw() {
      TWEEN.update()
      let position = this.position()

      /* this.p5.clear()
       * this.p5.background(216) */

      this.p5.stroke(192)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]

        this.p5.push()
        this.p5.translate(square.x, square.y)

        let ws = (position.progress < 0.5 ? 1.0 - position.progress : position.progress)

        this.p5.translate(square.width * (ws - 1.0), square.width * (ws - 1.0))
        /* console.log(position.progress)
         * console.log(ws) */
        this.p5.square(-square.width * 0.5, -square.width * 0.5, square.width * ws)
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
.tc-animation-description {
  margin: 32px 0;
}
</style>
