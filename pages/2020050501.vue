<<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        どこに向かっているのかというのはあるんですが、tone.jsでもう少し遊ばないとですね。
        ってかKORG Gadgetでなんかループみたいなの作って酔って踊って寝るっていうのが、いい生活すぎて困りますね。
      </p>
      <p class="tc-animation-description">
        アニメーション、かなり思った通りになったんですけど、だんだん難しくなってきてて、こりゃ酔えねえわ。
        ちがう酔うのはできる、あんまり進まねえわ、ってところか。
        でも考えてたのが完成したら好きな感じで満足。
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
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      tileWidth: 0,
      nHorizontalTiles: 0,
      nVerticalTiles: 0,
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

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      this.nHorizontalTiles = isPortrait ? 5 : parseInt(this.p5.windowWidth / 192)
      this.tileWidth = this.p5.windowWidth / this.nHorizontalTiles
      this.nHorizontalTiles = this.nHorizontalTiles + 2
      this.nVerticalTiles = parseInt(this.p5.windowHeight / this.tileWidth) + 2
    },
    translateTile(page, progress, row, col) {
      this.p5.translate(this.tileWidth * col, this.tileWidth * row)
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
    fillColor(page, row, col) {
      let pos = 0
      if (row % 2 == 0 && col % 2 == 0) {
        pos = 0
      } else if (row % 2 == 0 && col % 2 == 1) {
        pos = 3
      } else if (row % 2 == 1 && col % 2 == 0) {
        pos = 1
      } else {
        pos = 2
      }
      return 255 - ((pos + page * 3) % 4) * 8
    },
    draw() {
      let position = this.position()
      let page = position.page
      let progress = position.progress

      this.p5.stroke(216)
      for (let row = 0; row < this.nVerticalTiles; row++) {
        for (let col = 0; col < this.nHorizontalTiles; col++) {
          this.p5.push()
          this.p5.translate(this.p5.windowWidth * -0.5, this.p5.windowHeight * -0.5)
          this.translateTile(page, progress, row, col)
          this.p5.rotate(Math.PI * progress * (page % 2 == 0 ? 1.0 : -1.0))
          this.p5.fill(this.fillColor(page, row, col))
          this.p5.square(0, 0, this.tileWidth * (progress < 0.5 ? 1.0 - progress : progress))
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
