<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <p>
        最近、若い人っていうか新人っていうか、これからプログラマを職業にする人にいろいろ教える機会が多くて、まあ教えています。
      </p>
      <p>
        自分が若いときは割と素直に言うことを聞くタイプだったと思います。
        職種も仕事もいろいろだったし、役に立っています。
        でも教えるのも教わるのも難しいのでそういう時は、
      </p>
      <p>
        「おまえのできることが全部できるようになっても、おまえにしかなれねえじゃん。。。」
      </p>
      <p>
        って思ってやってきたので、みんなもそんな感じで適当に流してほしいです。
        むしろ教えている側に優しい気持ちでお願いします。。。
        まあそれは都合が良すぎるか、ごめんなさい。
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
