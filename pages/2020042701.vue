<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        もっと簡単にできるとか、効率が良いとか最新とか流行とか標準とか、
        まあそういうのはあるんだけど、そんな事より、面白そうとかワクワクするとか興味があるとか、
        そっちのほうがずっと尊い感じがしてきました。最近特に。
      </p>
      <p>
        なにかをやってみようという気持ちってすごくないですか？？？
      </p>
      <p>
        意味のあることやろうとしてしまう傾向が僕にはあって、
        なにかをやるときに意味を考えすぎたりして、結局やらないで終わってしまうとか、めっちゃ多いです。
        やらないで終わるの、つまらないしカッコ良くもないです。
        意味はやってからついてくることもたくさんあるし。
      </p>
      <p>
        周りの目？多分それは周りを意識しすぎているもう一人の自分って感じだと思うんですが、
        そういうのを無視してなんかやっていこうと思います。
      </p>
      <p>
        ワイン飲みながら文章書いている途中で寝てしまって、
        今アニメーションをつけたんですが、文章が夜っぽいですね、笑。
      </p>
      <p>
        アニメーションは割と初期のやつの正方形を円に変えて軸と色を変えました。
        もうキックとクラップの音が聞こえる気がしますね。
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
      let coords = { y: 0 }
      let t = this.p5.random(60, 80)
      let h = this.p5.random(this.height)
      this.tween = new TWEEN.Tween(coords)
                            .to({ y: h }, t * 100)
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
    },
    draw() {
      TWEEN.update()

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2

      let position = this.position()

      this.p5.stroke(216)

      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles + 2; col++) {
          this.p5.push()
          this.p5.translate(tileWidth * (col - nHorizontalTiles * 0.5), tileWidth * row - this.p5.windowHeight * 0.5)
          this.p5.rotate(Math.PI * position.progress)
          let fillColor = 255 - this.p5.frameCount / 3 % 10 * 8
          this.p5.fill(fillColor)
          this.p5.circle(-tileWidth, -tileWidth, tileWidth)
          this.p5.pop()
        }
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
