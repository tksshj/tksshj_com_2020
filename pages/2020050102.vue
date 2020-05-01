<<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        <tc-button @click="playButtonClicked" v-if="!playing"><tc-icon>play_arrow</tc-icon>Play</tc-button>
        <tc-button @click="playButtonClicked" v-if="playing"><tc-icon>pause</tc-icon>Pause</tc-button>
      </p>
      <p>
        KORG Gadgetで1小節、ドラムとベースだけ作って書き出して、tone.jsで同期させて見たけど前よりは良くなった。
        FPSとかちゃんと合わせたつもりだけど、そもそも仕組み的にずれますね。
      </p>
      <p>
        テキスト隠して見て欲しいです。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import * as Tone from "tone";
import TWEEN from '@tweenjs/tween.js'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      playing: false,
      toneStarted: 0,
      player: null,
      p5App: null,
      p5: null,
      squares: [],
      r: 0,
      inc: 0
    }
  },
  methods: {
    playButtonClicked() {
      this.setupTone()
      this.playing = !this.playing
      this.inc = 0
      this.r = 0
      Tone.Transport.toggle()
    },
    setupTone() {
      if (!this.toneStated) {
        this.toneStated = true
        Tone.start()
        Tone.Transport.bpm.rampTo(128, 4)
        Tone.Transport.scheduleRepeat((time) => {
          Tone.Draw.schedule(() => {
            this.inc = (this.inc + 1) % 8
            if (this.inc == 0) {
              this.fillColor = 255
            }
          }, time)
        }, "8n", 0);
        this.player = new Tone.Player("/2020050102.wav", () => {
          this.player.loop = true
          this.player.sync().start()
        }).toMaster()
      }
    },
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
      this.p5.createCanvas(width, height, this.p5.WEBGL)

      this.p5.frameRate(32)

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth /320) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 3
      nHorizontalTiles = nHorizontalTiles + 1

      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles; col++) {
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
      this.p5.stroke(216)
      this.p5.strokeWeight(1)

      if (this.inc == 6) {
        this.p5.clear()
      }
      this.r = this.r + Math.PI * 60 / 128.0 * (this.inc == 0 || this.inc == 2 || this.inc == 3 ? -1 : 1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()
        this.p5.translate(square.x, square.y)
        this.p5.rotate(this.r)
        this.p5.translate(square.width * -0.5 * 0.9, square.width * -0.5 * 0.9)
        this.p5.square(0, 0, square.width * 0.9)
        this.p5.pop()
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
