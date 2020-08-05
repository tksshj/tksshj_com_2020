<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        これは超マジメな話なんですけど、目標設定とかあるじゃないですか。
      </p>
      <p>
        僕はこれまで自分の人生っていうの？なんか漠然と生きている中で、長期と中期の目標を割としっかりと立てていたようです。
        長期が10年くらい、中期が1〜3年くらいで。
      </p>
      <p>
        具体的には、外で働いていたときに室内で働きたい、とか、トラック運転手だったけどプログラマになりたいとか、
        自分の会社をつくりたいとか、なんかそんなの。目標っていうか夢かもしれん。
        でもギリギリ実現可能っぽいものを選択しているセコさはあるな。
      </p>
      <p>
        で、最近ジジジジイになってきて、長期の目標マジわからん。
        中期はある、今の目の前にある問題を解決する的なやつ。いくつかある。けっこうある。
      </p>
      <p>
        長期がない。夢ない。夢くれ。
      </p>
      <p>
        反発的な気持ちが欲しいのか？と思うけど、ムカつくことも減ってきた。
        ムカつくジジイも友達から生まれてきて単純にムカつけない。
        ムカつくジジイに褒められたりするし、怒られなくなった。
      </p>
      <p>
        おいやべえよ、こえええよ、夢くれ、夢くれよ。
      </p>
      <p>
        10年くらいのちょうどいいやつがない、ほんとに怖い。これじゃあなんとなく生きてしまう。いや今までもそうだけども。
      </p>
      <p>
        まあいっか、なんとなく生きよう。まあいっかー。おわり。
      </p>
      <p>
        アニメーションは前のと同じ、なんかコーディングするテンションにならなかった、アイデアはなくもないけど。
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
      p5App: null,
      p5: null,
      squares: []
    }
  },
  methods: {
    setupPage() {
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
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
      this.p5.createCanvas(width, height)

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles + 2; col++) {
          this.squares.push({
            x: tileWidth * col,  // tileWidth * (col - nHorizontalTiles * 0.5),
            y: tileWidth * row,
            width: tileWidth,
            color: this.p5.random(32, 64),
            m: this.p5.random(40, 50)
          })
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        let x = square.x
        let y = square.y
        this.p5.push()

        this.p5.translate(x, y)
        let color = square.color + this.p5.random(-10, 10)
        square.color = Math.max(32, Math.min(64, color))

        let r = this.p5.frameCount / square.m
        let rx = Math.sin(r) * 100
        let ry = Math.cos(r) * 100

        for (let j = 0; j < 8; j++) {
          this.p5.fill(255 - color * 1.0 / 5 * j)
          this.p5.circle(rx, ry, square.width * (2.0 - 0.2 * j))
        }

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
</style>
