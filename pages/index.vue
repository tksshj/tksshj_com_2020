<template>
  <div class="tc-page-index">
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true">
      <div class="tc-page-list">
        <a :href="page.id" v-for="page in pages">
          <section>
            <h1 class="tc-title">{{ page.title }}</h1>
            <p class="tc-description">{{ page.description }}</p>
          </section>
        </a>
      </div>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TcPageContent from '../components/tc_page_content.vue'
import TcPages from '../components/tc_pages.js'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      pages: TcPages.pages,
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

      /* this.p5.frameRate(20) */

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
            c: this.p5.random(32, 64),
            m: this.p5.random(40, 80),
            dx: this.p5.random(-4, 4),
            dy: this.p5.random(-4, 4)
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
        let c = square.c + this.p5.random(-10, 10)
        square.c = Math.max(32, Math.min(64, c))


        /* let rx = this.p5.random(-10, 10) */
        /* let rx = Math.sin(this.p5.frameCount * 0.1) * (i % 3 == 0 ? -100 : 50)
         * let ry = Math.sin(this.p5.frameCount * 0.1) * (i % 5 == 0 ? -50 : 100) */

        let f = this.p5.frameCount % parseInt(square.m)
        let r = f < (square.m / 2.0) ? f : square.m - f
        let rx = x / 4.0 + square.dx * r
        let ry = y / 4.0 + square.dy * r

        for (let j = 0; j < 8; j++) {
          this.p5.fill(255 - c * 1.0 / 5 * j)
          this.p5.circle(rx, ry, square.width * (2.0 - 0.2 * j))
        }

        this.p5.pop()

        if (this.p5.frameCount % parseInt(square.m) == 0) {
          square.dx = this.p5.random(-4, 4)
          square.dy = this.p5.random(-4, 4)
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
.tc-page-index {
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
  .tc-page-list {
    width: calc(100% - 32px);
    margin: -48px 0 0;
    .tc-title {
      padding: 24px 0 0;
      font-size: 20px;
    }
    .tc-description {
      padding: 0 0 24px;
      font-size: 14px;
    }
    .tc-article-content {
      margin: 0 0 64px;
      padding: 0 8px 24px 0;
      p {
        padding: 0 0 16px;
      }
    }
  }
}
</style>
