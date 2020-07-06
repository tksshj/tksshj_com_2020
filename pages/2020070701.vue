<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        普通がすごい嫌いな感じで生きてきて、普通を追い求める人生のような気がする、ことがある。
      </p>
      <p>
        普通ってなんか、まあこれでいいんじゃない？って思えるラインっぽい気がする。あまり考えなくてもよくなるライン。
        憧れる。
      </p>
      <p>
        最初はまずその普通っていうラインを求めて頑張るんだけど、
        そのラインに到達すると、急になんかテンション下がって、逆にそれを否定したくなる。
        それ以上頑張れないみたいな、ひがみかもしれない。
      </p>
      <p>
        そして普通って思ってたもののほぼ全て、結局自分から見えている範囲でしか判断できていなかったっぽい。
        まあつまり身近にあるものが、なんとなく嫌いっていう思春期みたいな発想でかなりの人生を過ごしてきたっぽい。
      </p>
      <p>
        普通がすごく嫌で進学しなかったんだけど、
        それは進学校だったからで、もし進学校じゃなかったら進学していたような気がする。
      </p>
      <p>
        建築現場や運送とかの身体を使う仕事をしてたから、ホワイトカラーになれた気がする。
      </p>
      <p>
        みんなが管理とか設計とかやっててプログラム書いてなかったから、プログラムが書けるようになった気がする。
      </p>
      <p>
        っていうことは今の状況だと環境を変えないと新しい展開が生まれないのかもしれないな。。。
      </p>
      <p>
        年齢的にはかなり難しいけどなんとかしよっと。
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
            x: tileWidth * col,
            y: tileWidth * row,
            w: tileWidth
          })
        }
      }
    },
    draw() {
      this.p5.clear()
      /* this.p5.background(216) */
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        let x = square.x
        let y = square.y

        this.p5.push()


        this.p5.translate(square.x, square.y)
        this.p5.rotate(this.p5.frameCount / 60)
        this.p5.translate(square.w * -0.5, square.w * -0.5)

        this.p5.rect(0, 0, square.w, square.w)
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
