<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="ドラムキットじゃんもうこれ！！！"
      description="2020-04-23_03, animation"
    >
      <p>
        "tone.js hi-hat"とかでググって出てきたソース、tone.jsのサイトのソースだったんですけど、
        それをコピペしてちょっとだけ数値を変更したんです！！！そしたら！！！！ああ！！！
        もうこれはドラムじゃないですか！！！！！ああ！！！あ！！！！！
      </p>
      <p>
        こんなに早くできると思ってなかったので感動しました！酔ってるのもあるけどきっと。
        スネアもいるかもなあ、まあひとまず。
      </p>
      <p>
        <tc-button @click="openHiHatButtonClicked">
          <tc-icon>play_arrow</tc-icon>Open Hi-hat
        </tc-button>
        <tc-button @click="closedHiHatButtonClicked">
          <tc-icon>play_arrow</tc-icon>Closed Hi-hat
        </tc-button>
        <tc-button @click="kickButtonClicked">
          <tc-icon>play_arrow</tc-icon>Kick
        </tc-button>
      </p>
      <p>
        アニメーションはなんかさぼりっていうか、ひとつまえのスクロールを回転させていて、なんか好きな感じにできなかった。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import * as Tone from "tone"
import TWEEN from '@tweenjs/tween.js'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'ドラムキットじゃんもうこれ！！！ - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      nVerticalTiles: 0,
      cols: [],
      y: 0,
      openHiHat: null,
      closedHiHat: null,
      kick: null,
      kickEnvelope: null,
      kickSnapEnv: null
    }
  },
  methods: {
    openHiHatButtonClicked() {
      this.setupSynth()
      this.openHiHat.triggerAttackRelease('8n')
    },
    closedHiHatButtonClicked() {
      this.setupSynth()
      this.closedHiHat.triggerAttackRelease('8n')
    },
    kickButtonClicked() {
      this.setupSynth()
      this.kickEnvelope.triggerAttackRelease('8n')
      this.kickSnapEnv.triggerAttackRelease('8n')
    },
    setupSynth() {
      if (!this.toneStated) {
        Tone.start()

        let lowPass = new Tone.Filter({
          "frequency" : 14000,
        }).toMaster()

        this.openHiHat = new Tone.NoiseSynth({
          "volume" : -10,
          "filter" : {
            "Q" : 1
          },
          "envelope" : {
            "attack" : 0.01,
            "decay" : 0.3
          },
          "filterEnvelope" : {
            "attack" : 0.01,
            "decay" : 0.03,
            "baseFrequency" : 4000,
            "octaves" : -2.5,
            "exponent" : 4,
          }
        }).connect(lowPass)

        this.closedHiHat = new Tone.NoiseSynth({
          "volume" : -10,
          "filter" : {
            "Q" : 1
          },
          "envelope" : {
            "attack" : 0.01,
            "decay" : 0.15
          },
          "filterEnvelope" : {
            "attack" : 0.01,
            "decay" : 0.03,
            "baseFrequency" : 4000,
            "octaves" : -2.5,
            "exponent" : 4,
          }
        }).connect(lowPass);

        this.kickEnvelope = new Tone.AmplitudeEnvelope({
          "attack" : 0.01,
          "decay" : 0.2,
          "sustain" : 0,
        }).toMaster();
        this.kick = new Tone.Oscillator("A2").connect(this.kickEnvelope).start()
        this.kickSnapEnv = new Tone.FrequencyEnvelope({
          "attack" : 0.005,
          "decay" : 0.01,
          "sustain" : 0,
          "baseFrequency" : "A1",
          "octaves" : 2.7
        }).connect(this.kick.frequency)
      }
    },

    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
      this.setTween(0, false)
    },
    setTween(startY, inc) {
      const coords = { y: 0 }
      this.tween = new TWEEN.Tween(coords)
                            .to({ y: this.height }, 20 * 1000)
                            .easing(TWEEN.Easing.Linear.None)
                            .onUpdate(() => {
                              if (inc) {
                                this.y = coords.y
                              } else {
                                this.y = this.height - coords.y
                              }
                            })
                            .onComplete(() => {
                              this.setTween(coords.y, !inc)
                            })
                            .start()
    },
    position() {
      let h = window.innerHeight
      let y = this.y
      return {
        y: y,
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
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      nHorizontalTiles = nHorizontalTiles + 2
      this.nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 3

      for (let row = 0; row < this.nVerticalTiles; row++) {
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
      for (let col = 0; col < nHorizontalTiles + 1; col++) {
        this.cols.push({
          speed: (col % 2 == 0 ? 1 : -1)
        })
      }
    },
    draw() {
      TWEEN.update()
      let position = this.position()
      this.p5.stroke(192)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()

        let w = square.width
        let y = w * square.row - this.p5.windowHeight * 0.5 + w * (position.page + position.progress) * this.cols[square.col].speed
        if (y < -1.0 * window.innerHeight * 0.5 - w * 2) {
          square.row = square.row + this.nVerticalTiles
        }
        if (window.innerHeight * 0.5 + w < y) {
          square.row = square.row - this.nVerticalTiles
        }
        let p = (position.progress < 0.5 ? (1.0 - position.progress) : position.progress)
        this.p5.translate(square.x, y)
        this.p5.rotate(Math.PI * (position.progress + position.page) * 0.5)
        this.p5.square(0, 0, square.width * p)
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
</style>
