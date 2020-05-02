<<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        <tc-button @click="playButtonClicked" v-if="!playing"><tc-icon>play_arrow</tc-icon>Play</tc-button>
        <tc-button @click="playButtonClicked" v-if="playing"><tc-icon>pause</tc-icon>Pause</tc-button>
      </p>
      <p>
        8小節を1ループ、音楽がループするところは違和感ありますね。
        アニメーションはなんか派手にするとリズムにあっているように見える？
        っていうか曲良くないですか？笑！結構ジンビームでしたね。
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
      n: 0,
      rects: []
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

            if (this.n % 2 == 0) {
              let rect = {
                color: this.p5.random(200, 255),
                x: this.p5.windowWidth * -0.5,
                y: this.p5.windowHeight * -0.5,
                w: this.p5.windowWidth,
                h: this.p5.windowHeight,
              }
              this.p5.fill(rect.color)
              this.p5.rect(rect.x, rect.y, rect.w, rect.h)
              this.rects.push(rect)
            }
            console.log(this.n)
            if (this.n == 63) {
              this.n = 0
              this.rects = []
              this.p5.clear()
            } else {
              this.n = this.n + 1
            }
          }, time)
        }, "8n", 0);
        this.player = new Tone.Player("/2020050201.mp3", () => {
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
    },
    draw() {
      this.p5.clear();
      let removeIndex = -1
      for (let i = 0; i < this.rects.length; i++) {
        let rect = this.rects[i]
        this.p5.fill(rect.color)
        this.p5.rect(rect.x, rect.y, rect.w, rect.h)
        rect.x = rect.x + rect.w * 0.05
        rect.y = rect.y + rect.h * 0.05 * (i % 2 == 0 ? -1 : 2.0)
        rect.w = rect.w * 0.9
        rect.h = rect.h * 0.9
        if (rect.w < 0.01) {
          removeIndex = i
        }
      }
      if (-1 < removeIndex) {
        this.rects.splice(0, removeIndex + 1)
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
