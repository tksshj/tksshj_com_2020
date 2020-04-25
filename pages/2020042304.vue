<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="あれ・・・？"
      description="2020-04-23_03, animation"
    >
      <p>
        すんごい雰囲気でループ作ってみたんだけど全然ノリが悪い、やばいですねこれは。
        なんかもっさりしてる？？？
        やりたいことには近づいている気がするけど厳しいなこれ。
      </p>
      <p>
        <button @click="playButtonClicked">
          <i class="material-icons">play_arrow</i><div>Play</div>
        </button>
      </p>
      <p>
        ううううううん、なんかリズムが、、、
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import * as Tone from "tone";
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'あれ・・・？ - tksshj.com'
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
      /* kick: null, */
      kickEnvelope: null,
      kickSnapEnv: null,

      r: 0,
      inc: false
    }
  },
  methods: {
    playButtonClicked() {
      this.setupSynth()
      Tone.Transport.toggle()
    },
    setupSynth() {
      if (!this.toneStated) {
        this.toneStated = true
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
        let kick = new Tone.Oscillator("A2").connect(this.kickEnvelope).start()
        this.kickSnapEnv = new Tone.FrequencyEnvelope({
          "attack" : 0.005,
          "decay" : 0.01,
          "sustain" : 0,
          "baseFrequency" : "A1",
          "octaves" : 2.7
        }).connect(kick.frequency)


        let kickPart = new Tone.Part((time, event) => {
          this.kickEnvelope.triggerAttackRelease('8n')
          this.kickSnapEnv.triggerAttackRelease('8n')
        }, [
          { time: 0 },
          { time: '0:1' },
          { time: '0:2' },
          { time: '0:3' }
        ])
        kickPart.start(0)

        let hihatPart = new Tone.Part((time, event) => {
          this.r = this.p5.frameCount
          this.closedHiHat.triggerAttackRelease('8n')
        }, [
          { time: '0:0:2' },
          { time: '0:1:2' },
          { time: '0:2:2' },
          { time: '0:3:2' }
        ])
        hihatPart.start(0)

        Tone.Transport.loopEnd = '1m'
        Tone.Transport.loop = true
      }
    },

    setupPage() {
      this.height = window.innerHeight * this.nPages
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

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      this.nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 3
      nHorizontalTiles = nHorizontalTiles + 1

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
      this.p5.stroke(192)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()

        /* this.p5.fill(255.0 - 64.0 * (this.p5.frameCount - this.r) / (30.0 * 4.0)) */
        this.p5.translate(square.x, square.y)
        this.p5.rotate(Math.PI * (this.p5.frameCount - this.r) / (30.0 * 4.0))
        this.p5.translate(square.width * -0.5, square.width * -0.5)
        this.p5.square(0, 0, square.width)
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
