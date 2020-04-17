<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-content
      date="2020-04-17_01"
      title="index.vueの幅がおかしい？"
    >
      <p>
        GitHubとかサーバーにあげたりそのスクリプトを書いたりしたんですが、
        はじめてiPhoneでみるとトップページの幅がおかしいっぽいですね。。。
        そちらを修正する前になにかと思ってこちら書きました。
      </p>
      <p>
        下にスクロールすると正方形が回転するやつですが、数を増やしました。
        画面のリサイズとか考慮してません、どうなるんだろ。
        うまく動きそうな気もしますね。
      </p>
      <p>
        なんかいろいろ適当で想定してた動きと違うけどこれはこれでっていうやつですね。
      </p>
    </tc-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TcContent from '../components/tc_content.vue'

export default {
  components: {
    'tc-content': TcContent
  },
  head: {
    title: '2020-04-17_01 - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
    },
    position() {
      let h = window.innerHeight
      let y = window.window.scrollY
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
      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2

      let position = this.position()

      this.p5.stroke(216)

      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles; col++) {
          this.p5.push()
          this.p5.translate(tileWidth * (col - nHorizontalTiles * 0.5), tileWidth * row - this.p5.windowHeight * 0.5)
          this.p5.rotate(Math.PI * position.progress * -0.5)
          this.p5.square(0, 0, tileWidth)
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
</style>
